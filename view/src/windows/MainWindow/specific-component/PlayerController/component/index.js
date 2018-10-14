import React from 'react';
import PropTypes from 'prop-types';
import {
  faPlay,
  faPause,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import Touchable from '../../../../../common/Touchable';

function PlayerControllerComponent({
  isPlayed,
  playFunction,
  currentTime,
  durationLength,
}) {
  function getTime() {
    const minutesOfDuration = `${Math.trunc(durationLength / 60)}`;
    const secondsOfDuration = `${Math.trunc(durationLength % 60)}`;
    const minutesOfCurrentTime = `${Math.trunc(currentTime / 60)}`;
    const secondsOfCurrentTime = `${Math.trunc(currentTime % 60)}`;

    const duration = `${'00'.substr(minutesOfDuration.length)}${minutesOfDuration}:${'00'.substr(secondsOfDuration.length)}${secondsOfDuration}`;
    const currentTimeModified = `${'00'.substr(minutesOfCurrentTime.length)}${minutesOfCurrentTime}:${'00'.substr(secondsOfCurrentTime.length)}${secondsOfCurrentTime}`;

    return `${currentTimeModified} / ${duration}`;
  }

  return (
    <div className="player-controller">
      <Touchable
        icon={(isPlayed) ? faPause : faPlay}
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
          icon={(isPlayed) ? faPause : faPlay}
          className="player-controller__play-button"
          onClick={playFunction}
        />
        <Touchable
          icon={faAngleDoubleRight}
          className="player-controller__next-button"
          onClick={playFunction}
        />
        <span className="player-controller__duration">
          {getTime()}
        </span>
      </div>
    </div>
  );
}

PlayerControllerComponent.propTypes = {
  isPlayed: PropTypes.bool.isRequired,
  playFunction: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  durationLength: PropTypes.number.isRequired,
};

export default PlayerControllerComponent;
