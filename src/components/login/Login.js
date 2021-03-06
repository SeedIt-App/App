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
  ScrollView,
  Prompt,
  RootToast,
} from '../common';
import { TextInput } from 'react-native';
import { AuthActions } from '../../actions';
import Toast from 'react-native-root-toast';
import idx from 'idx';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: true,
    };
  }

  goToSocialSignUp = () => this.props.navigation.navigate('SocialSignUp');

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginErrorStatus) {
      Toast.show(nextProps.loginErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.loginRequestStatus === 'SUCCESS') {
      Toast.show('Logged in Successfully!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{ type: 'Navigation/NAVIGATE', routeName: 'SplashScreen' }],
      });
    }
    if (!this.props.isAuthorizedUser && nextProps.isAuthorizedUser) {
      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Newsfeed' }],
      });
    }
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: '',
    });
  }

  Login = () => {
    const validateEmailOrUserName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[a-zA-Z]{2,}$/;
    const loginValues = {
      usernameOrEmail: this.state.username,
      password: this.state.password,
    };
    /* if (this.state.username === '' || this.state.password == '') {
      <RootToast/>
    } */
    if (this.state.username === '' || this.state.password == '') {
      Toast.show('Fields is not allowed to be empty', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (!validateEmailOrUserName.test(this.state.username)) {
      Toast.show('Please provide valid email Or Username', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else {
      this.props.login(loginValues);
    }
  };

  toggleSwitch = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  toggleEmailPrompt = () => {
    this.setState({ emailPromptVisible: !this.state.emailPromptVisible });
  };

  forgotPassword = emailId => {
    const body = {
      email: emailId,
    };
    this.props.forgotPassword({ body });
    this.toggleEmailPrompt();
  };

  render() {
    const { loginRequestStatus, loginErrorStatus } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require('../images/background_images/Seed_IT.png')}
          >
            <View className="h-1-1 space-around flex mt20">
              <ScrollView>
                <View className="f-center">
                  <Text className="dashHeading complementary bold">
                    Seed It
                  </Text>
                  <Image
                    className="x_large_thumb mt20"
                    source={require('../images/icons/Jar.png')}
                  />
                </View>
                <View className="f-center mt20">
                  <View className="bg-Field f-row inputField j-start m10">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/User_Icon.png')}
                    />
                    <View className="dividerVertrical mt10 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.username}
                      placeholder="Username"
                      placeholderTextColor="white"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={username => this.setState({ username })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row inputField j-start m10">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Password.png')}
                    />
                    <View className="dividerVertrical mt10 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.password}
                      autoCapitalize="none"
                      placeholder="Password"
                      placeholderTextColor="white"
                      secureTextEntry={this.state.showPassword}
                      underlineColorAndroid="transparent"
                      onChangeText={password => this.setState({ password })}
                    />
                    <View className="pull-right">
                      <Touchable
                        className="showPasswordAuth"
                        onPress={this.toggleSwitch}
                      >
                        <Text className="darkGrey medium m10">Show</Text>
                      </Touchable>
                    </View>
                  </View>
                  <Touchable onPress={this.toggleEmailPrompt}>
                    <Text className="normal white">Forgot Password ?</Text>
                  </Touchable>
                </View>
                <View className="f-center mt20 mv20">
                  <Touchable className="submitField m20" onPress={this.Login}>
                    {loginRequestStatus === 'REQUESTING' ? (
                      <Spinner color="white" />
                    ) : (
                      <Text className="complementary title m10"> Login</Text>
                    )}
                  </Touchable>
                  <View className="f-row mt20">
                    <Text className="normal white mt3">New</Text>
                    <Touchable className="mv20" onPress={this.goToSocialSignUp}>
                      <Text className="normal bold white"> ? SignUp </Text>
                    </Touchable>
                  </View>
                </View>
                <Prompt
                  title="Email Id"
                  placeholder="Enter your registered email id"
                  visible={this.state.emailPromptVisible}
                  onCancel={this.toggleEmailPrompt}
                  onSubmit={this.forgotPassword}
                />
              </ScrollView>
            </View>
          </BackgroundImage>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const { loginErrorStatus, loginRequestStatus } = state.login;
  return {
    loginRequestStatus,
    loginErrorStatus,
    isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser),
  };
}
export default connect(mapStateToProps, { ...AuthActions })(Login);
