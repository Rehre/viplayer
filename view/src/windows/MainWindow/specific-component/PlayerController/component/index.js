import React from 'react';
import PropTypes from 'prop-types';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../../../common/Touchable';

function PlayerControllerComponent({ playFunction }) {
  return (
    <div className="player-controller">
      <Touchable
        icon={faPlay}
        className="player-controller__big-play-button"
        onClick={playFunction}
      />
    </div>
  );
}

PlayerControllerComponent.propTypes = {
  playFunction: PropTypes.func.isRequired,
};

export default PlayerControllerComponent;
