const { ipcMain } = require('electron');

const WindowInstance = require('./windowController');

const openDialog = require('../func/openDialog');
const toggleWindow = require('../func/toggleWindow');
const openFile = require('../func/openFile');

ipcMain.on('get-clicked-file', () => {
  if (!process.argv[1] || process.argv[1] === '.' || process.argv[1] === '-r process') return;

  openFile({
    payload: {
      videoFilePath: process.argv[1],
    },
    event: 'opened-file',
    sendToWindow: 'MainWindow',
  });
});

ipcMain.on('open-dialog', (event, arg) => {
  openDialog(arg);
});

ipcMain.on('toggle-window', (event, arg) => {
  toggleWindow(arg.window, arg.option);
});

ipcMain.on('toggle-fullscreen', (event, arg) => {
  WindowInstance.MainWindow.setFullScreen(arg);
});
