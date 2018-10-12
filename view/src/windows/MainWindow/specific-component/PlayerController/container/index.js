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
    };

    this.togglePlayPause = this.togglePlayPause.bind(this);
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
    return (
      <PlayerControllerComponent
        playFunction={this.togglePlayPause}
      />
    );
  }
}

export default PlayerController;
