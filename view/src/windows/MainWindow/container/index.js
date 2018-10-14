/* eslint-env browser */
import React from 'react';

import MainWindowComponent from '../component';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: 'file:///media/rehre/Data/Animes/SAO_S3_Alicization/02.mkv',
    };

    this.video = React.createRef();
  }

  render() {
    const { videoFilePath } = this.state;

    return (
      <div className="main-window-container">
        <video id="video" ref={this.video} src={videoFilePath} />
        <MainWindowComponent videoref={this.video} videoFilePath={videoFilePath} />
      </div>
    );
  }
}

export default MainWindow;
