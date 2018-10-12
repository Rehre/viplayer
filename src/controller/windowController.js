const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { client } = require('electron-connect');

class WindowController {
  constructor() {
    this.MainWindow = null;
    this.MainWindowUrl = `file://${__dirname}/../production/index.html`;

    if (isDev) {
      this.MainWindowUrl = 'http://localhost:3000/';
    }

    this.initialize = this.initialize.bind(this);
  }

  initialize() {
    this.MainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      backgroundColor: 'black',
      webPreferences: {
        webSecurity: false,
      },
    });

    this.MainWindow.setMenu(null);

    this.MainWindow.loadURL(this.MainWindowUrl);

    this.MainWindow.on('closed', () => {
      this.MainWindow = null;

      app.quit();
    });

    this.MainWindow.on('ready-to-show', () => {
      this.MainWindow.show();
      this.MainWindow.focus();
    });

    if (isDev) {
      // set this according to your setup
      const reactDevTools = '/home/rehre/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.0_0';

      BrowserWindow.addDevToolsExtension(reactDevTools);

      this.MainWindow.webContents.openDevTools();

      client.create(this.MainWindow);
    }
  }
}

const WindowInstance = new WindowController();

module.exports = WindowInstance;
