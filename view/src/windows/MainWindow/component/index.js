import React from 'react';
import PropTypes from 'prop-types';

function MainWindowComponent({ videoref, videoFilePath }) {
  console.log({ videoref, videoFilePath });

  return (
    <div className="main-window">
      <h1>Hello, World!</h1>
    </div>
  );
}

MainWindowComponent.propTypes = {
  videoref: PropTypes.object.isRequired,
  videoFilePath: PropTypes.string.isRequired,
};

export default MainWindowComponent;
