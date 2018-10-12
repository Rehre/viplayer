import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Touchable({ icon, className, onClick }) {
  return (
    <div
      className={`touchable ${className}`}
      role="button"
      onClick={onClick}
      tabIndex={0}
    >
      <span><FontAwesomeIcon icon={icon} /></span>
    </div>
  );
}

Touchable.propTypes = {
  icon: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Touchable;
