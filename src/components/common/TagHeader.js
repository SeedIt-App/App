import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage , StatusBar} from 'react-native';

class TagHeader extends React.PureComponent {

  /* goToNotification = () => {
    this.props.navigation.navigate('Notifications');
  }*/

  goToNewsfeed = () => {
    this.props.navigation.navigate('Newsfeed');
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  render() {
    const { props } = this;
    const { user, token } = this.props;
    return (
      <View>
      <View>
          <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.10)"
            animated
            barStyle="light-content"
          />
        </View> 
        <View className="f-row bg-header p5">
          <View className="w-1-1 f-row f-both h65 mt15">
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
            { (this.props.token !== null) &&
                (<Touchable
                  className="pull-right"
                  onPress={() => this.props.createPostRequest()}
                >
                  <Image
                    className="mini1_thumb"
                    source={require('../images/icons/plus.png')}
                  />
                </Touchable>)
            }

            {/*{ (this.props.token !== null) &&
                (<Touchable
                  className="pull-right mh35"
                    onPress={this.goToNotification}
                  >
                  <Image
                    className="mini1_thumb"
                    source={require('../images/icons/alerts.png')}
                  />
                </Touchable>
              )
            }*/}
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

export default connect(mapStateToProps, { ...AuthActions, ...UserActions })(TagHeader);
