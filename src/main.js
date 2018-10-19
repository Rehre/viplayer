const { app } = require('electron');

const WindowInstance = require('./controller/windowController');
const openFile = require('./func/openFile');
require('./controller/ipcController');

const shouldQuit = app.makeSingleInstance((argv) => {
  const { MainWindow } = WindowInstance;

  if (MainWindow) {
    if (MainWindow.isMinimized()) MainWindow.restore();
    MainWindow.focus();

    if (argv[1]) {
      openFile({
        payload: {
          videoFilePath: argv[1],
        },
        event: 'opened-file',
        sendToWindow: 'MainWindow',
      });
    }
  }
});

if (shouldQuit) {
  app.quit();
} else {
  app.on('ready', WindowInstance.initialize);
}
