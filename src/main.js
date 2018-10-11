const { app } = require('electron');

const WindowInstance = require('./controller/windowController');

const shouldQuit = app.makeSingleInstance(() => {
  const { MainWindow } = WindowInstance;

  if (MainWindow) {
    if (MainWindow.isMinimized()) MainWindow.restore();
    MainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
} else {
  app.on('ready', WindowInstance.initialize);
}
