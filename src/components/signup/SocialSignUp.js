import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Spinner,
  Colors,
  KeyboardAvoidingView,
} from '../common';
import Toast from 'react-native-root-toast';
import { google } from 'react-native-simple-auth';
import { AsyncStorage } from "react-native"
import { setAuthHeaders } from './../../api';
import { AuthActions } from '../../actions';

class SocialSignUp extends React.PureComponent {

  constructor(props) {
    super(props);
    console.log(this.props)
      this.goggleLogin = this.goggleLogin.bind(this);
  }

  gotToBack = () => this.props.navigation.navigate('Newsfeed');
  goToSignUp = () => this.props.navigation.navigate('SignUp');
  goToLogin = () => this.props.navigation.navigate('Login');

  componentWillReceiveProps(nextProps) {
    if (nextProps.signupErrorStatus ) {
      Toast.show(nextProps.signupErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
    if (nextProps.signupRequestStatus == 'SUCCESS') {
      Toast.show('Signed Up successfully by Gmail', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      this.props.navigation.navigate('Newsfeed');
    }
  }

  gotoInformation = () => {
    Toast.show('Work in progress!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };


  goggleLogin = () => {
    console.log('starting user loging with google');
    google({
      appId: '799673784369-1rm7ekellvreork3e9358oh58tbck0kh.apps.googleusercontent.com',
      callback: 'com.seedit:/oauth2redirect'
    }).then((res) => {
      setAuthHeaders(res.credentials.access_token);
        AsyncStorage.setItem('res', JSON.stringify(res));

      /*const userData = {
        firstName: res.user.given_name || '',
        lastName: res.user.family_name || '',
        userName: res.user.name || '',
        email: res.user.email || '',
        password: res.user.pwd || '',
        phone: res.user.phoneNo || '',
        gender: res.user.gender || '',
        birthDate: '',
        picture : res.user.picture || ''
      };
      console.log(this.state)
      this.props.signup(userData);*/
      this.gotToBack()
    })
    .catch((error) => {
      console.log(error, 'googleError')
    })
  }

  /* facebookLogin = () => {
    facebook({
        appId: '1805069292902129',
        callback: 'https://developers.facebook.com/apps/1805069292902129/fb-login/'
     }).then((info) => {
      console.log(info, 'facebooks****************************')
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      console.log(error, 'facebooke***************************')
      // error.code
      // error.description
    });
  }*/

  render() {
    const {props } = this;
    const { signupRequestStatus, signupErrorStatus } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require('../images/background_images/Seed_IT.png')}
          >
            <View className="h-1-1 space-around flex">
              <View className="f-center mt20">
                <Text className="dashHeading complementary bold">Join Us</Text>
                <Text className="normal mt10 complementary">
                  Don't worry, we won't share your info.
                </Text>
              </View>
              <View className="f-center marginTop20">
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={this.gotoInformation}>
                    <Text className="bold darkGrey">Sign Up with Facebook</Text>
                  </Touchable>
                </View>
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={this.gotoInformation}>
                    <Text className="bold darkGrey">Sign Up with Twitter</Text>
                  </Touchable>
                </View>
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={this.goggleLogin.bind(this)}>
                    <Text className="bold darkGrey">Sign Up with Gmail</Text>
                  </Touchable>
                </View>
                <Text className="white bold">or</Text>
                <View className=" f-row textField m10 f-both">
                  <Touchable onPress={this.goToSignUp}>
                    <Text className="bold darkGrey">Sign Up with Email</Text>
                  </Touchable>
                </View>
              </View>
              <View className="f-center j-end f-both f-row mv20">
                <Touchable className="m20" onPress={this.goToLogin}>
                  <Text className="complementary bold  m10">Login</Text>
                </Touchable>
                <Touchable className="m20" onPress={this.gotToBack}>
                  <Text className="complementary  m10">Cancel</Text>
                </Touchable>
              </View>
            </View>
          </BackgroundImage>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
function mapStateToProps(state) {
  const { signupErrorStatus, signupRequestStatus } = state.signup;
  return {
    signupErrorStatus,
    signupRequestStatus,
  };
}
export default connect(mapStateToProps, { ...AuthActions })(SocialSignUp);
