import React from 'react';
import PropTypes from 'prop-types';
import {
  faPlay,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../../../common/Touchable';

function PlayerControllerComponent({ playFunction }) {
  return (
    <div className="player-controller">
      <Touchable
        icon={faPlay}
        className="player-controller__big-play-button"
        onClick={playFunction}
      />
      <div className="controller">
        <Touchable
          icon={faAngleDoubleLeft}
          className="player-controller__prev-button"
          onClick={playFunction}
        />
        <Touchable
          icon={faPlay}
          className="player-controller__play-button"
          onClick={playFunction}
        />
        <Touchable
          icon={faAngleDoubleRight}
          className="player-controller__next-button"
          onClick={playFunction}
        />
      </div>
    </div>
  );
}

PlayerControllerComponent.propTypes = {
  playFunction: PropTypes.func.isRequired,
};

export default PlayerControllerComponent;
