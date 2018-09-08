import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage , StatusBar, Platform} from 'react-native';

class Header extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  
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
    }
  }

  goToNewsfeed = () => {
    this.props.navigation.navigate('Newsfeed');
  };
  goToNotification = () => {
    this.props.navigation.navigate('Notifications');
  }

  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  render() {
    const { props } = this;
    const { user, token } = this.props;
    return (
      <View>
      {Platform.OS === 'ios' ? 
        <View>
          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.10)"
            barStyle="dark-content"
            hidden={false} 
          />
        </View>   : 
        <View>
          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.10)"
            barStyle="dark-content"
          />
        </View>  
      }
        
        <View style={{marginTop : Platform.OS === 'android' ? 15 : null}}>
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
               
                {(props.title === 'NewsFeed' ||
                  props.title === 'Tags' ||
                  props.title === 'Followed' ||
                  props.title === 'Levels') &&
                  (token !== '') && (
                    <Touchable
                      className="pull-right"
                      onPress={() => this.props.createPostRequest()}
                    >
                      <Image
                        className="mini1_thumb"
                        source={require('../images/icons/plus.png')}
                      />
                    </Touchable>
                  )}
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
        </View>
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
  return {
    user,
    token,
    refreshTokenErrorStatus,
    refreshTokenRequestStatus,
  };
}

export default connect(mapStateToProps, { ...AuthActions, ...UserActions })(Header);
