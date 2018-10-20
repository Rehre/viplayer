const fs = require('fs');
const path = require('path');

const openFile = require('./openFile');

function getPreviousNextItem(arg, filepath) {
  try {
    const currentPath = filepath.substring(7, filepath.lastIndexOf('/'));
    const dir = fs.readdirSync(currentPath);
    const indexOfCurrentPlayedMedia = dir.indexOf(path.basename(filepath));

    if (arg === 'next') {
      if (dir[indexOfCurrentPlayedMedia + 1]) {
        openFile({
          payload: {
            videoFilePath: path.join(currentPath, dir[indexOfCurrentPlayedMedia + 1]),
          },
          event: 'opened-file',
          sendToWindow: 'MainWindow',
        });
      }
    }

    if (arg === 'previous') {
      if (dir[indexOfCurrentPlayedMedia - 1]) {
        openFile({
          payload: {
            videoFilePath: path.join(currentPath, dir[indexOfCurrentPlayedMedia - 1]),
          },
          event: 'opened-file',
          sendToWindow: 'MainWindow',
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getPreviousNextItem;
