/* eslint-env browser */
import React from 'react';

import MainWindowComponent from '../component';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoFilePath: 'file:///media/rehre/Data/Animes/[Kusonime] Index BD 480P/Kusonime_-_To_Aru_Majutsu_no_Index_BD_Eps_08.mkv',
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
