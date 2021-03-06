const { app } = require('electron');
const fs = require('fs');
const MatroskaSubtitles = require('matroska-subtitles');
const path = require('path');

const sendToWindow = require('./sendToWindow');
const toggleWindow = require('./toggleWindow');

function openFile(properties) {
  sendToWindow({
    payload: {
      videoFIlePath: `file://${properties.payload.videoFilePath}`,
    },
    event: 'stop-playing-for-new-file',
  }, properties.sendToWindow);
  toggleWindow('LoadingWindow', 'show');

  const userDataPath = app.getPath('userData');
  const applicationPath = path.join(userDataPath, 'ViPlayer');
  const cachePath = path.join(applicationPath, 'cache');
  const subtitlesCachePath = path.join(cachePath, 'subtitles');

  if (!fs.existsSync(applicationPath)) {
    fs.mkdirSync(applicationPath);
  }

  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }

  if (!fs.existsSync(subtitlesCachePath)) {
    fs.mkdirSync(subtitlesCachePath);
  }

  const subtitleName = path.basename(properties.payload.videoFilePath);
  const subtitlePath = path.join(subtitlesCachePath, `${properties.payload.videoFilePath.substr(0, properties.payload.videoFilePath.lastIndexOf('/')).replace(/\\|\//g, 'r')}${subtitleName.substr(0, subtitleName.lastIndexOf('.'))}.vtt`);

  if (fs.existsSync(subtitlePath)) {
    properties.payload.videoCaptionPath = `file://${subtitlePath}`;
    properties.payload.videoFilePath = `file://${properties.payload.videoFilePath}`;

    sendToWindow({
      payload: properties.payload,
      event: properties.event,
    }, properties.sendToWindow);

    setTimeout(() => toggleWindow('LoadingWindow', 'hide'), 100);

    return;
  }

  if (path.extname(properties.payload.videoFilePath) !== '.mkv') {
    properties.payload.videoCaptionPath = '';
    properties.payload.videoFilePath = `file://${properties.payload.videoFilePath}`;

    sendToWindow({
      payload: properties.payload,
      event: properties.event,
    }, properties.sendToWindow);

    setTimeout(() => toggleWindow('LoadingWindow', 'hide'), 100);

    return;
  }

  function convertTime(time) {
    const ms = time % 1000;
    time = (time - ms) / 1000;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    return `${'00'.substr(hours.toString().length)}${hours}:${'00'.substr(minutes.toString().length)}${minutes}:${'00'.substr(seconds.toString().length)}${seconds}.${'000'.substr(ms.toString().length)}${ms}`;
  }

  const parser = new MatroskaSubtitles();
  let trackRecord = 1;
  let subsRecord = 'WEBVTT\n';

  parser.on('subtitle', (subtitle) => {
    const { duration, time } = subtitle;
    let { text } = subtitle;
    text = text.replace(/\{.*?\}|\\N/g, '');
    const track = trackRecord++;

    subsRecord += `\n${track}\n${convertTime(time)} --> ${convertTime(time + duration)}\n${text}\n`;
  });

  parser.on('finish', () => {
    fs.writeFileSync(subtitlePath, subsRecord);

    properties.payload.videoCaptionPath = `file://${subtitlePath}`;
    properties.payload.videoFilePath = `file://${properties.payload.videoFilePath}`;

    sendToWindow({
      payload: properties.payload,
      event: properties.event,
    }, properties.sendToWindow);

    setTimeout(() => toggleWindow('LoadingWindow', 'hide'), 100);
  });

  fs.createReadStream(properties.payload.videoFilePath).pipe(parser);
}

module.exports = openFile;
