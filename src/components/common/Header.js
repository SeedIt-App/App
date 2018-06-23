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
      const values = {
        email: this.props.user.email,
        refreshToken: this.props.token.refreshToken,
      };
      this.props.refreshToken(values);

     /* if (nextProps.profileErrorStatus === 'jwt expired') {
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
      }*/
    }
  }

  goToNewsfeed = () => {
    this.props.navigation.navigate('Newsfeed');
  };

  

  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  render() {
    const { props } = this;
    const {
      user,
      token
    } = this.props;
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
              <Touchable className="pull-left" onPress={this.goToNewsfeed}>
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
              {(props.title === 'Newsfeed' || props.title === 'Tags' ||
                props.title ===  'Followed' || props.title ===  'Levels' ) &&
                (user === '' || token === '' ? (
                  <Touchable
                    className="pull-right"
                    onPress={this.goToSocialSignUp}
                  >
                    <Text className="complementary title m10">Sign Up</Text>
                  </Touchable>
                ) : (
                  <Touchable className="pull-right" 
                    onPress={() => this.props.createPostRequest()}
                    >
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
  const {
    user,
    token,
    refreshTokenRequestStatus,
    refreshTokenErrorStatus,
  } = state.auth;
  console.log(state, 'HeaderState');
  return {
    user,
    token,
    refreshTokenErrorStatus,
    refreshTokenRequestStatus,
  };
}

export default connect(mapStateToProps, { ...AuthActions, ...UserActions })(Header);
