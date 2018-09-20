import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage, StatusBar, Platform } from 'react-native';

class TagHeader extends React.PureComponent {
  goToNewsfeed = () => {
    this.props.navigation.navigate('Newsfeed');
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { props } = this;
    const { user, token } = this.props;
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <View>
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.10)"
              barStyle="light-content"
            />
          </View>
        ) : (
          <View>
            <StatusBar
              backgroundColor="rgba(0, 231, 193, 1.00)"
              barStyle="light-content"
            />
          </View>
        )}
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
            {this.props.token !== null && (
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
