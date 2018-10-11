import React from 'react';

import MainWindowComponent from '../component';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: '',
    };

    this.video = React.createRef();
  }

  render() {
    const { videoFilePath } = this.state;

    return (
      <div className="main-window-container">
        <video ref={this.video}>
          <track kind="captions" />
        </video>
        <MainWindowComponent videoref={this.video} videoFilePath={videoFilePath} />
      </div>
    );
  }
}

export default MainWindow;
