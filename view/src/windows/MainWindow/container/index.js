/* eslint-env browser */
import React from 'react';

import MainWindowComponent from '../component';

const { ipcRenderer } = window.require('electron');

class MainWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: '',
    };

    this.video = React.createRef();
  }

  componentDidMount() {
    this.handlingEventFromMainProcess();
  }

  handlingEventFromMainProcess() {
    ipcRenderer.on('received-in-main-window', (event, arg) => {
      if (arg.event === 'opened-file') {
        this.setState({ videoFilePath: arg.payload.videoFilePath });
      }
    });
  }

  render() {
    const { videoFilePath, videoCaptionPath } = this.state;

    return (
      <div className="main-window-container">
        <video
          id="video"
          ref={this.video}
          src={videoFilePath}
        >
          <track
            id="track"
            label="Captions"
            kind="captions"
            srcLang="subs"
            src={videoCaptionPath}
            default
          />
        </video>
        <MainWindowComponent
          videoref={this.video}
          videoFilePath={videoFilePath}
          openDialogFunc={() => ipcRenderer.send('open-dialog', {
            event: 'open-file',
            sendToWindow: 'MainWindow',
            title: 'Open file',
            properties: ['openFile'],
          })}
        />
      </div>
    );
  }
}

export default MainWindow;
