/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../common/Touchable';

const path = window.require('path');

function MainWindowComponent({ videoref, videoFilePath }) {
  console.log({ videoref });

  const title = path.basename(videoFilePath);

  return (
    <div className="main-window">
      <Touchable
        icon={faFile}
        className="main-window__file-open-button"
        onClick={() => alert('open file')}
      />
      <span className="main-window__title">{title}</span>
    </div>
  );
}

MainWindowComponent.propTypes = {
  videoref: PropTypes.object.isRequired,
  videoFilePath: PropTypes.string.isRequired,
};

export default MainWindowComponent;
