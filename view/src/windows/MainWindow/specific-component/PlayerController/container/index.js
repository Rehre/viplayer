import React from 'react';
import PropTypes from 'prop-types';

class PlayerController extends React.Component {
  static propTypes = {
    videoref: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }
}

export default PlayerController;
