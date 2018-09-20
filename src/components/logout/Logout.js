import React from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '../../actions';
import { Spinner } from '../common';

class Logout extends React.PureComponent {
  componentDidMount() {
    this.props.logout();
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Newsfeed' }],
    });
  }
  render() {
    return <Spinner />;
  }
}

export default connect(null, { ...AuthActions })(Logout);
