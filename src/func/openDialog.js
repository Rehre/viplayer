const { dialog } = require('electron');

const WindowInstance = require('../controller/windowController');
const openFile = require('./openFile');

function openDialog(arg) {
  const parentWindow = WindowInstance.MainWindow;

  const item = dialog.showOpenDialog(parentWindow, {
    title: arg.title,
    properties: arg.properties,
  });

  if (!item) return;

  if (arg.event === 'open-file') {
    openFile({
      payload: {
        videoFilePath: item[0],
      },
      event: 'opened-file',
      sendToWindow: arg.sendToWindow,
    });
  }
}

module.exports = openDialog;
