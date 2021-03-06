/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../common/Touchable';
import PlayerController from '../specific-component/PlayerController/container';

const path = window.require('path');

class MainWindowComponent extends React.Component {
  static propTypes = {
    videoref: PropTypes.object.isRequired,
    videoFilePath: PropTypes.string.isRequired,
    openDialogFunc: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.mainWindow = React.createRef();
    this.hideFunc = null;
  }

  componentDidMount() {
    this.mainWindow.current.addEventListener('mousemove', () => {
      clearTimeout(this.hideFunc);
      this.mainWindow.current.style.cursor = 'default';

      this.mainWindow.current.classList.remove('main-window-hide');
      this.mainWindow.current.classList.add('main-window-show');

      document.getElementById('video').classList.add('video-sub-up');

      this.hideFunc = setTimeout(() => {
        this.mainWindow.current.style.cursor = 'none';
        this.mainWindow.current.classList.remove('main-window-show');
        this.mainWindow.current.classList.add('main-window-hide');
        document.getElementById('video').classList.remove('video-sub-up');
      }, 2000);
    });
  }

  render() {
    const {
      videoFilePath,
      videoref,
      openDialogFunc,
    } = this.props;

    const title = path.basename(videoFilePath);

    return (
      <div className="main-window main-window-hide" ref={this.mainWindow}>
        <div className="main-window__header">
          <div className="main-window__transparent-block" />
          <Touchable
            icon={faFile}
            className="main-window__file-open-button"
            onClick={openDialogFunc}
          />
          <span className="main-window__title">{title}</span>
        </div>
        <PlayerController mediaFilePath={videoFilePath} mediaref={videoref} />
      </div>
    );
  }
}

export default MainWindowComponent;
