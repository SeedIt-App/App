import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage } from 'react-native';

class NewsFeedHeader extends React.PureComponent {

  componentWillReceiveProps(nextProps) {
    /*if (this.props.token === '') {
      const values = {
        email: this.props.user.email,
        refreshToken: this.props.token.refreshToken,
      };
      this.props.refreshToken(values);
    }*/
  }

  goToNotification = () => {
    this.props.navigation.navigate('Notifications');
  }

  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  render() {
    const { props } = this;
    const { user, token } = this.props;
    return (
      <View>
        <View className="f-row bg-header p5">
          <View className="w-1-1 f-row f-both h65">
            
            <Touchable className="pull-left" >
              <Image
                className="medium_thumb"
                source={require('../images/logo.png')}
              />
            </Touchable>
            <Text className="complementary title bold m10">{props.title}</Text>
           
            {props.title === 'Newsfeed' &&
              token !== '' ? (
                <Touchable
                  className="pull-right mr20"
                  onPress={() => this.props.createPostRequest()}
                >
                  <Image
                    className="mini1_thumb"
                    source={require('../images/icons/plus.png')}
                  />
                </Touchable>
              ) : null
            }

            {props.title === 'Newsfeed' && 
              token === null ?
                (
                <Touchable
                  className="pull-right"
                  onPress={this.goToSocialSignUp}
                  >
                  <Text className="complementary title m10">Sign Up</Text>
                </Touchable>
                ) :
                 (<Touchable
                  className="pull-right"
                    onPress={this.goToNotification}
                  >
                  <Image
                    className="mini1_thumb"
                    source={require('../images/icons/alerts.png')}
                  />
                </Touchable>)
              }
          </View>
        </View>
        <View className="dividerBlack" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
    refreshTokenRequestStatus,
    refreshTokenErrorStatus,
  } = state.auth;
  const token = state.auth.authToken;
  console.log(state, 'HeaderState');
  return {
    user,
    token,
    refreshTokenErrorStatus,
    refreshTokenRequestStatus,
  };
}

export default connect(mapStateToProps, { ...AuthActions, ...UserActions })(NewsFeedHeader);
