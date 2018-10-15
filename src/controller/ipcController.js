const { ipcMain } = require('electron');

const openDialog = require('../func/openDialog');

ipcMain.on('open-dialog', (event, arg) => {
  openDialog(arg);
});
