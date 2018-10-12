/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../common/Touchable';
import PlayerController from '../specific-component/PlayerController/container';

const path = window.require('path');

function MainWindowComponent({ videoref, videoFilePath }) {
  const title = path.basename(videoFilePath);

  return (
    <div className="main-window">
      <div className="main-window__header">
        <div className="main-window__transparent-block" />
        <Touchable
          icon={faFile}
          className="main-window__file-open-button"
          onClick={() => alert('open file')}
        />
        <span className="main-window__title">{title}</span>
      </div>
      <PlayerController mediaref={videoref} />
    </div>
  );
}

MainWindowComponent.propTypes = {
  videoref: PropTypes.object.isRequired,
  videoFilePath: PropTypes.string.isRequired,
};

export default MainWindowComponent;
