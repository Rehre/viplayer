const {
  app,
  BrowserWindow,
} = require('electron');

class WindowController {
  constructor() {
    this.MainWindow = null;
    this.LoadingWindow = null;

    this.MainWindowUrl = `file://${__dirname}/../../../build/view/index.html`;
    this.LoadingWindowUrl = `file://${__dirname}/../../../build/view/index.html#/loading`;

    if (process.env.NODE_ENV === 'development') {
      this.MainWindowUrl = 'http://localhost:3000/';
      this.LoadingWindowUrl = 'http://localhost:3000#/loading';
    }

    this.initialize = this.initialize.bind(this);
  }

  initialize() {
    this.MainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minHeight: 350,
      minWidth: 445,
      show: false,
      backgroundColor: 'black',
      webPreferences: {
        webSecurity: false,
      },
    });
    this.LoadingWindow = new BrowserWindow({
      width: 200,
      height: 50,
      resizable: false,
      show: false,
      modal: true,
      closable: false,
      alwaysOnTop: true,
      backgroundColor: 'white',
      parent: this.MainWindow,
      webPreferences: {
        webSecurity: false,
      },
    });

    this.MainWindow.setMenu(null);
    this.LoadingWindow.setMenu(null);

    this.MainWindow.loadURL(this.MainWindowUrl);
    this.LoadingWindow.loadURL(this.LoadingWindowUrl);

    this.MainWindow.on('closed', () => {
      this.MainWindow = null;
      this.LoadingWindow = null;

      app.quit();
    });

    this.MainWindow.on('ready-to-show', () => {
      this.MainWindow.show();
      this.MainWindow.focus();
    });

    this.LoadingWindow.on('close', (event) => {
      if (!this.LoadingWindow) return;
      event.preventDefault();

      this.LoadingWindow.hide();
    });

    if (process.env.NODE_ENV === 'development') {
      // set this according to your setup
      const reactDevTools = '/home/rehre/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.2_0';
      BrowserWindow.addDevToolsExtension(reactDevTools);

      this.MainWindow.webContents.openDevTools();
      // this.LoadingWindow.webContents.openDevTools();
    }
  }
}

const WindowInstance = new WindowController();

module.exports = WindowInstance;
