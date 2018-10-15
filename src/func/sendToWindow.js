const WindowInstance = require('../controller/windowController');

function sendToWindow(properties, window) {
  if (window === 'MainWindow') {
    WindowInstance.MainWindow.webContents.send('received-in-main-window', properties);
  }
}

module.exports = sendToWindow;
