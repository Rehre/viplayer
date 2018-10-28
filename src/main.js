const { app } = require('electron');

const WindowInstance = require('./controller/windowController');
const openFile = require('./func/openFile');
require('./controller/ipcController');

let waitedVideoFilePath = '';

const shouldQuit = app.makeSingleInstance((argv) => {
  const { MainWindow } = WindowInstance;

  if (MainWindow) {
    if (MainWindow.isMinimized()) MainWindow.restore();
    MainWindow.focus();

    if (argv[1] && waitedVideoFilePath !== argv[1]) {
      if (process.argv[1] === '.' || process.argv[1] === '-r process') return;

      [, waitedVideoFilePath] = argv;

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
