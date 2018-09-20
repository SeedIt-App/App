import React from 'react';
import { connect } from 'react-redux';
import { View, Colors, Touchable, Icon, Text, Image } from './';
import { AuthActions, NotificationActions, UserActions } from '../../actions';
import { AsyncStorage, Platform } from 'react-native';
import Toast from 'react-native-root-toast';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: this.props.navigation.state.routeName,
    };
  }

  getToast () {
    return (
      Toast.show('Please login', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: 'white',
        textColor: 'darkGrey'
      })
    )
  }

  goToLogin = () => this.props.navigation.navigate('Login');
  goToProfile = () => this.props.navigation.navigate('Profile');
  goToNewsfeed = () => this.props.navigation.navigate('Newsfeed');

  goToTags = () => {
    if(this.props.token === null){
      this.props.navigation.navigate('Login');
      this.getToast();
    }
    else{
      this.props.navigation.navigate('Tags');
    }
  }
  goToRedwood = () => {
    if(this.props.token === null){
      this.props.navigation.navigate('Login');
      this.getToast();
    }
    else{
      this.props.navigation.navigate('Redwood');
    }
  }

  goToNotification = () => {
    if(this.props.token === null){
      this.props.navigation.navigate('Login');
      this.getToast();
    }
    else{
      this.props.navigation.navigate('Notifications');
    }
  }

  render() {
    const { props } = this;
    const { user, token, allNotification } = this.props;
    return (
      <View className="footer">
        <View className="footerBottom">
          <View className="w-1-9 f-row f-both space-between m10">
            {this.props.token === null && (
              <View className="p5">
                <Touchable onPress={this.goToLogin}>
                  <View className="f-row f-both m20">
                    <Image
                      className="mini_thumb m10"
                      source={
                        this.state.currentRoute === 'Login'
                          ? require('../images/icons/Login_active.png')
                          : require('../images/icons/User_login.png')
                      }
                      resizeMode="cover"
                    />
                  </View>
                </Touchable>
                <Text className="text">Login</Text>
              </View>
            )}
            {this.props.token !== null && (
              <View className="p5">
                <Touchable onPress={this.goToProfile}>
                  <View className="f-row f-both m20 ">
                    <Image
                      className="mini_thumb m10"
                      source={
                        this.state.currentRoute === 'Profile' ||
                        this.state.currentRoute === 'PublicProfile'
                          ? require('../images/icons/Login_active.png')
                          : require('../images/icons/User_login.png')
                      }
                      resizeMode="cover"
                    />
                  </View>
                </Touchable>
                <Text className="text">Profile</Text>
              </View>
            )}
            <View className="p5">
              <Touchable onPress={this.goToTags}>
                <View className="f-row f-both m20">
                  <Image
                    className="mini_thumb m10"
                    source={
                      this.state.currentRoute === 'Tags' ||
                      this.state.currentRoute === 'SingleTag'
                        ? require('../images/icons/Tag_Green.png')
                        : require('../images/icons/Tag_1.png')
                    }
                    resizeMode="cover"
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
                    source={
                      this.state.currentRoute === 'Newsfeed'
                        ? require('../images/icons/Home_Green.png')
                        : require('../images/icons/Home.png')
                    }
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
                    className="normal_thumb m3"
                    source={
                      this.state.currentRoute === 'Redwood'
                        ? require('../images/icons/Redwood_Tree_Green.png')
                        : require('../images/icons/Redwood_Tree.png')
                    }
                    resizeMode="cover"
                  />
                </View>
              </Touchable>
              <Text>Redwood</Text>
            </View>
            <View className="p5">
              <Touchable onPress={this.goToNotification}>
                <View className="f-row f-both m20 mt5">
                  <Image
                    className="micro1_thumb m10"
                    source={
                      this.state.currentRoute === 'Notifications'
                        ? require('../images/icons/alert_green.png')
                        : require('../images/icons/alert_Black.png')
                    }
                    resizeMode="cover"
                  />
                  {allNotification &&
                    allNotification.length > 0 && (
                      <View className="notification marginTop10 marginLeft f-both">
                        <Text className="sm_Font black bold">
                          {allNotification && allNotification.length}
                        </Text>
                      </View>
                    )}
                </View>
              </Touchable>
              <Text>Notifications</Text>
            </View>
            {/* <View className="p5">
=======
                </View>
              </Touchable>
              <Text>Notifications</Text>
            </View>
            {/* <View className="p5">
>>>>>>> 84302a33bc760403091a7fde81f87d20d6a5ebb1
            <Touchable onPress={this.goToFollow}>
              <View className="f-row f-both m20 mt5">
                <Image
                  className="mini_thumb m10"
                  source={require('../images/icons/Followed.png')}
                  resizeMode="cover"
                />
              </View>
            </Touchable>
            <Text>Followed</Text>
          </View> */}
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const token = state.auth.authToken;
  const { notifications, notificationStatus } = state.notifications;
  const allNotification = notifications && notifications.notifications;
  return {
    user,
    token,
    allNotification,
  };
}

export default connect(mapStateToProps, {
  ...AuthActions,
  ...NotificationActions,
})(Footer);
