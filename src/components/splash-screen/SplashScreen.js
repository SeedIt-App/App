/*import React from 'react';
import { connect } from 'react-redux';
import Splash from './Splash';

class SplashScreen extends React.PureComponent {
  componentDidMount() {
    let routeName = 'Home';
    if (this.props.isAuthorizedUser) {
      routeName = 'Home';
    }
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName }],
    });
  }

  render() {
    return <Splash />;
  }
}

function mapStateToProps(state) {
  const { isAuthorizedUser } = state;
  return {
    isAuthorizedUser
  };
}

export default connect(mapStateToProps, {})(SplashScreen);
*/