import React from 'react';
import PropTypes from 'prop-types';

import PlayerControllerComponent from '../component';

class PlayerController extends React.Component {
  static propTypes = {
    mediaref: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      canPlay: true,
      isPlayed: false,
      currentTime: 0,
      durationLength: 0,
    };

    this.togglePlayPause = this.togglePlayPause.bind(this);
  }

  componentDidMount() {
    this.eventHandlerForMediaRef();
  }

  eventHandlerForMediaRef() {
    const { mediaref } = this.props;

    mediaref.current.addEventListener('loadedmetadata', () => {
      this.setState({ durationLength: mediaref.current.duration });
    });

    mediaref.current.addEventListener('timeupdate', () => {
      this.setState({ currentTime: mediaref.current.currentTime });
    });
  }

  togglePlayPause() {
    const { canPlay, isPlayed } = this.state;
    const { mediaref } = this.props;

    this.setState({ canPlay: !canPlay }, () => {
      if (!this.state.canPlay) {
        this.setState({ isPlayed: !isPlayed }, () => mediaref.current.play());
        return;
      }

      this.setState({ isPlayed: !isPlayed }, () => mediaref.current.pause());
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
        currentTime={currentTime}
        durationLength={durationLength}
      />
    );
  }
}

export default PlayerController;
