/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import {
  faPlay,
  faPause,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExpand,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../../../common/Touchable';

const { ipcRenderer } = window.require('electron');

function PlayerControllerComponent({
  isPlayed,
  playFunction,
  currentTime,
  durationLength,
  setCurrentTime,
  toggleFullscreen,
  mediaFilePath,
  volume,
  changeVolume,
}) {
  function getTime() {
    const minutesOfDuration = `${Math.trunc(durationLength / 60)}`;
    const secondsOfDuration = `${Math.trunc(durationLength % 60)}`;
    const minutesOfCurrentTime = `${Math.trunc(currentTime / 60)}`;
    const secondsOfCurrentTime = `${Math.trunc(currentTime % 60)}`;

    const duration = `${'00'.substr(minutesOfDuration.length)}${minutesOfDuration}:${'00'.substr(secondsOfDuration.length)}${secondsOfDuration}`;
    const currentTimeModified = `${'00'.substr(minutesOfCurrentTime.length)}${minutesOfCurrentTime}:${'00'.substr(secondsOfCurrentTime.length)}${secondsOfCurrentTime}`;

    return `${currentTimeModified} / ${duration}`;
  }

  function getVolumeIcon(volumeValue) {
    if (!parseInt(volumeValue, 10)) return faVolumeMute;
    if (parseInt(volumeValue, 10) <= 50) return faVolumeDown;

    return faVolumeUp;
  }

  return (
    <div className="player-controller">
      <Touchable
        icon={(isPlayed) ? faPause : faPlay}
        className="player-controller__big-play-button"
        onClick={playFunction}
      />
      <div className="controller">
        <Touchable
          icon={faAngleDoubleLeft}
          className="player-controller__prev-button"
          onClick={() => ipcRenderer.send('get-next-previous-item', {
            arg: 'previous',
            mediaFilePath,
          })}
        />
        <Touchable
          icon={(isPlayed) ? faPause : faPlay}
          className="player-controller__play-button"
          onClick={playFunction}
        />
        <Touchable
          icon={faAngleDoubleRight}
          className="player-controller__next-button"
          onClick={() => ipcRenderer.send('get-next-previous-item', {
            arg: 'next',
            mediaFilePath,
          })}
        />
        <Touchable
          icon={faExpand}
          className="player-controller__fullscreen-button"
          onClick={toggleFullscreen}
        />
        <div className="player-controller__volume-range">
          <Touchable
            icon={getVolumeIcon(volume)}
            className="player-controller__volume-button"
            onClick={() => {
              if (volume > '0"') changeVolume('0');
              if (volume === '0') changeVolume('100');
            }}
          />
          <progress
            className="player-controller__input-range__progress-bar"
            value={volume}
            max="100"
          />
          <input
            type="range"
            value={volume}
            min="0"
            max="100"
            onChange={ev => changeVolume(ev.target.value)}
          />
        </div>
        <span className="player-controller__duration">
          {getTime()}
        </span>
        <div className="player-controller__input-range">
          <progress
            className="player-controller__input-range__progress-bar"
            value={currentTime}
            max={`${durationLength}`}
          />
          <input
            type="range"
            value={currentTime}
            min="0"
            max={`${durationLength}`}
            onChange={ev => setCurrentTime(ev.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

PlayerControllerComponent.propTypes = {
  isPlayed: PropTypes.bool.isRequired,
  playFunction: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  durationLength: PropTypes.number.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  mediaFilePath: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  changeVolume: PropTypes.func.isRequired,
};

export default PlayerControllerComponent;
