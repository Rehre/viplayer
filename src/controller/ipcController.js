const { ipcMain } = require('electron');

const openDialog = require('../func/openDialog');
const toggleWindow = require('../func/toggleWindow');

ipcMain.on('open-dialog', (event, arg) => {
  openDialog(arg);
});

ipcMain.on('toggle-window', (event, arg) => {
  toggleWindow(arg.window, arg.option);
});
