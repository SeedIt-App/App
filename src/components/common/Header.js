import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage } from 'react-native';

class Header extends React.PureComponent {
  componentDidMount() {
    this.props.profile();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.token === '') {
      if (nextProps.profileErrorStatus === 'jwt expired') {
        const values = {
          email: this.props.user.email,
          refreshToken: this.props.token.refreshToken,
        };
        this.props.refreshToken(values);
      }
      if (nextProps.profileErrorStatus === 'jwt malformed') {
        Toast.show('Please login to access all features', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    }
  }

  goToHome = () => {
    this.props.navigation.navigate('Home');
  };
  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  render() {
    const { props } = this;
    const {
      profileRequestStatus,
      profileErrorStatus,
      user,
      token,
    } = this.props;
    console.log(profileRequestStatus, 'profileRequestStatus');
    return (
      <View>
        <View className="f-row bg-header p5">
          <View className="w-1-1 f-row f-both h65">
            {props.back ? (
              <Touchable className="pull-left" onPress={this.goBack}>
                <Icon
                  name="keyboard-backspace"
                  color={Colors.white}
                  size={28}
                />
              </Touchable>
            ) : (
              <Touchable className="pull-left" onPress={this.goToHome}>
                <Image
                  className="medium_thumb"
                  source={require('../images/logo.png')}
                />
              </Touchable>
            )}
            <Text className="complementary title bold m10">{props.title}</Text>
              {/*{props.title === 'Newsfeed' &&
                <Touchable
                  className="pull-right"
                  onPress={this.goToSocialSignUp}
                >
                  <Text className="complementary title m10">Sign Up</Text>
                </Touchable>
              }*/}
              {props.title === 'Newsfeed' &&
                (user === '' || token === '' ||
                profileErrorStatus === 'jwt malformed' ? (
                  <Touchable
                    className="pull-right"
                    onPress={this.goToSocialSignUp}
                  >
                    <Text className="complementary title m10">Sign Up</Text>
                  </Touchable>
                ) : (
                  <Touchable className="pull-right" onPress={() => {}}>
                    <Image
                      className="mini1_thumb"
                      source={require('../images/icons/plus.png')}
                    />
                  </Touchable>
                ))}
              {props.title === 'Profile' && (
                <Touchable
                  className="pull-right"
                  onPress={() => this.props.openRequest()}
                >
                  <Image
                    className="medium_thumb"
                    source={require('../images/icons/setting.png')}
                  />
                </Touchable>
              )}

            {props.title === 'EditProfile' && (
              <Touchable
                className="pull-right"
                onPress={() => this.props.saveProfile()}
              >
                <Text className="complementary title m10">Save</Text>
              </Touchable>
            )}
          </View>
        </View>
        <View className="dividerBlack" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { profileRequestStatus, profileErrorStatus } = state.loggedUser;
  const {
    user,
    token,
    refreshTokenRequestStatus,
    refreshTokenErrorStatus,
  } = state.auth;
  console.log(state, 'HeaderState');
  return {
    profileRequestStatus,
    profileErrorStatus,
    user,
    token,
    refreshTokenErrorStatus,
    refreshTokenRequestStatus,
  };
}

export default connect(mapStateToProps, { ...AuthActions, ...UserActions })(Header);
