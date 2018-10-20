/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';

import PlayerControllerComponent from '../component';

const { ipcRenderer } = window.require('electron');

class PlayerController extends React.Component {
  static propTypes = {
    mediaref: PropTypes.object.isRequired,
    mediaFilePath: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      canPlay: true,
      isPlayed: false,
      currentTime: 0,
      durationLength: 0,
      isFullscreen: false,
    };

    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  componentDidMount() {
    this.eventHandlerForMediaRef();
  }

  setCurrentTime(value) {
    this.setState({ currentTime: parseInt(value, 10) }, () => {
      this.props.mediaref.current.currentTime = parseInt(value, 10);
    });
  }

  eventHandlerForMediaRef() {
    const { mediaref } = this.props;

    mediaref.current.addEventListener('loadedmetadata', () => {
      this.setState({ durationLength: mediaref.current.duration });
    });

    mediaref.current.addEventListener('timeupdate', () => {
      this.setState({ currentTime: mediaref.current.currentTime });
    });

    mediaref.current.addEventListener('ended', () => {
      this.setState({
        isPlayed: false,
        canPlay: true,
      });
    });

    ipcRenderer.on('received-in-main-window', (event, arg) => {
      if (arg.event === 'stop-playing-for-new-file') {
        // delete the subtitle track
        const trackElement = document.getElementById('track');
        trackElement.parentNode.removeChild(trackElement);
        // only toggle when the video is played
        if (this.state.isPlayed) this.togglePlayPause();
      }

      if (arg.event === 'opened-file') {
        // create new subtitle track element
        const trackElement = document.createElement('track');
        const videoElement = document.getElementById('video');
        trackElement.id = 'track';
        trackElement.label = 'Captions';
        trackElement.kind = 'captions';
        trackElement.srclang = 'subs';
        trackElement.src = arg.payload.videoCaptionPath;
        trackElement.default = true;

        videoElement.appendChild(trackElement);
      }
    });
  }

  togglePlayPause() {
    const { canPlay, isPlayed } = this.state;
    const { mediaref, mediaFilePath } = this.props;

    if (!mediaFilePath) return;

    this.setState({ canPlay: !canPlay }, () => {
      if (!this.state.isPlayed) {
        this.setState({ isPlayed: !isPlayed }, () => mediaref.current.play());
        return;
      }

      this.setState({ isPlayed: !isPlayed }, () => mediaref.current.pause());
    });
  }

  toggleFullscreen() {
    const { isFullscreen } = this.state;

    this.setState({ isFullscreen: !isFullscreen }, () => {
      ipcRenderer.send('toggle-fullscreen', !isFullscreen);
    });
  }

  render() {
    const {
      isPlayed,
      currentTime,
      durationLength,
    } = this.state;

    return (
      <PlayerControllerComponent
        isPlayed={isPlayed}
        playFunction={this.togglePlayPause}
        toggleFullscreen={this.toggleFullscreen}
        currentTime={currentTime}
        durationLength={durationLength}
        setCurrentTime={this.setCurrentTime}
      />
    );
  }
}

export default PlayerController;
