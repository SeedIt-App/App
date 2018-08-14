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
import { google, facebook, twitter} from 'react-native-simple-auth';
import { AsyncStorage } from "react-native"
import { setAuthHeaders } from './../../api';
import { AuthActions } from '../../actions';

class SocialSignUp extends React.PureComponent {

  constructor(props) {
    super(props);
    console.log(this.props)
      this.goggleLogin = this.goggleLogin.bind(this);
      this.facebookLogin = this.facebookLogin.bind(this);
      this.twitterLogin = this.twitterLogin.bind(this);
  }

  goToBack = () => this.props.navigation.navigate('Newsfeed');
  goToSignUp = () => this.props.navigation.navigate('SignUp');
  goToLogin = () => this.props.navigation.navigate('Login');

  componentWillReceiveProps(nextProps) {
    if (nextProps.oauthSignupErrorStatus) {
      Toast.show(nextProps.oauthSignupErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
    if (nextProps.oauthSignupRequestStatus === 'SUCCESS') {
      Toast.show('Signed Up successfully' ,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
      this.goToBack()
    }
  }

  gotoInformation = () => {
    Toast.show('Work in progress!',{
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor : '#bcf2c8',
      textColor : 'black',
    });
  };

  goggleLogin = () => {
    console.log('starting user loging with google');
    google({
      appId : '283522117594-69esp2ajjrc1oiv7hl6a6kf6hnc537sd.apps.googleusercontent.com',
      callback: 'com.seedit:/authorize'
    }).then((res) => {
      console.log(res, 'googleResponse')
      //setAuthHeaders(res.credentials.access_token);
        const userData = {
          firstName: res.user.given_name || '',
          lastName: res.user.family_name || '',
          userName: res.user.name || '',
          email: res.user.email || '',
          provider: 'google',
          id: res.user.id || '',
          accessToken : res.credentials.access_token || '',
          gender: res.user.gender || '',
          birthDate: '',
          photo : res.user.picture || '',
          _raw: '' 
        };
        this.props.oauthSignup(userData);
    })
    .catch((error) => {
      console.log(error, 'googleError')
    })
  }

  facebookLogin = () => {
    console.log('starting user loging with facebook');
    facebook({
        appId: '2088512791387208',
        callback: 'fb2088512791387208://authorize',
        scope: 'user_birthday', // you can override the default scope here
        fields: ['email', 'first_name', 'last_name', 'picture' ,'name'  ], // you 
    }).then((res) => {
      console.log(res, 'facebooksResponse')
        //setAuthHeaders(res.credentials.access_token);
        const userData = {
          firstName: res.user.first_name || '',
          lastName: res.user.last_name || '',
          userName: res.user.name || '',
          email: res.user.email || '',
          provider: 'facebook',
          id: res.user.id || '',
          accessToken : res.credentials.access_token || '',
          gender: res.user.gender || 'other',
          birthDate: '',
          photo :  res.user.picture.data.url ||'',
          _raw: '' 
        };
        this.props.oauthSignup(userData);
    }).catch((error) => {
      console.log(error, 'facebooksError')
    });
  }

  twitterLogin = () => {
    console.log('starting user loging with twitter');
    twitter({
        appId: 'UQe2aS1KYC4ZSLbpViNVNFxOY',
        appSecret: '6K2ovfLbElUlk1tMqRYvKYrzGUKFzNlhZ3q308ZyQSGR0P9xSc',
        callback: 'com.seedit://authorize',
     }).then((res) => {
      console.log(res, 'twitterResponse')
      // setAuthHeaders(res.credentials.access_token);
      const userData = {
        firstName: res.user.name || '',
        lastName: '',
        userName: res.user.screen_name || '',
        email: res.user.name || '',
        provider: 'twitter',
        id: res.user.id_str || '',
        accessToken : res.credentials.oauth_token || '',
        gender: res.user.gender || 'other',
        birthDate: '',
        photo : res.user.profile_image_url || '',
        _raw: '' 
      };
      this.props.oauthSignup(userData);
    }).catch((error) => {
      console.log(error, 'twitterError')
    });
  }

  render() {
     const { 
     oauthSignupRequestStatus,
     oauthSignupErrorStatus} = this.props;
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
                  <Touchable className="m20" onPress={this.facebookLogin.bind(this)}>
                    <Text className="bold darkGrey">Sign Up with Facebook</Text>
                  </Touchable>
                </View>
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={this.twitterLogin.bind(this)}>
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
                <Touchable className="m20" onPress={this.goToBack}>
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
  const { oauthSignupRequestStatus, oauthSignupErrorStatus } = state.signup;
  return {
    oauthSignupRequestStatus,
    oauthSignupErrorStatus
  };
}
export default connect(mapStateToProps, { ...AuthActions })(SocialSignUp);
