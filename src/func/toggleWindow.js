const WindowInstance = require('../controller/windowController');

function toggleWindow(window, option) {
  if (option === 'show') {
    WindowInstance[window].show();
  } else {
    WindowInstance[window].hide();
  }
}

module.exports = toggleWindow;
