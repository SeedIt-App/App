import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, UserActions } from '../../actions';
import { AsyncStorage } from 'react-native';

class Footer extends React.PureComponent {
  /* componentDidMount() {
    this.props.profile();
  } */

  goToLogin = () => this.props.navigation.navigate('Login');
  goToProfile = () => this.props.navigation.navigate('Profile');
  goToNewsfeed = () => this.props.navigation.navigate('Newsfeed');
  goToFollow = () => this.props.navigation.navigate('Follow');
  goToTags = () => this.props.navigation.navigate('Tags');
  goToRedwood = () => this.props.navigation.navigate('Redwood');

  render() {
    const { props } = this;
    const { user, token } = this.props;

    return (
      <View className="footer">
        <View className="w-1-0 f-row f-both space-between m10">
          <View className="p5">
            <Touchable onPress={this.goToLogin}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10"
                  source={require('../images/icons/Login.png')}
                  resizeMode="cover"
                />
              </View>
            </Touchable>
            <Text className="text">Login</Text>
          </View>
          <View className="p5">
            <Touchable onPress={this.goToProfile}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10"
                  source={require('../images/icons/Login.png')}
                  resizeMode="cover"
                />
              </View>
            </Touchable>
            <Text className="text">Profile</Text>
          </View>

          <View className="p5">
            <Touchable onPress={this.goToTags}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10 black"
                  source={require('../images/icons/Tag_1.png')}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Tags</Text>
          </View>
          <View className="p5">
            <Touchable onPress={this.goToNewsfeed}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10"
                  source={require('../images/icons/Home.png')}
                  resizeMode="cover"
                />
              </View>
            </Touchable>
            <Text>Home</Text>
          </View>
          <View className="p5">
            <Touchable onPress={this.goToRedwood}>
              <View className="f-row f-both m20 mt5">
                <Image
                  className="micro1_thumb m10"
                  source={require('../images/icons/Redwood_Tree.png')}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Redwood</Text>
          </View>
          <View className="p5">
            <Touchable onPress={this.goToFollow}>
              <View className="f-row f-both m20 mt5">
                <Image
                  className="mini_thumb m10"
                  source={require('../images/icons/Followed.png')}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Followed</Text>
          </View>
        </View>
      </View>
    );
  }
}

/* function mapStateToProps(state) {
  const { profileRequestStatus, profileErrorStatus } = state.loggedUser;
  return {
    profileRequestStatus,
    profileErrorStatus,
  };
} */

export default Footer;
