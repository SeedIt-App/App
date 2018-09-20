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
} from '../common';
import { TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { AuthActions } from '../../actions';
import Toast from 'react-native-root-toast';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phoneNo: '',
      pwd: '',
      gender: ['male', 'female', 'other'],
      confirmPwd: '',
      selectedGender: '',
      showPassword: true,
      showCPassword: true,
    };
  }

  gotToBack = () => this.props.navigation.navigate('SocialSignUp');

  gotToLogin = () => this.props.navigation.navigate('Login');

  componentDidMount() {
    this.setState({
      date: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phoneNo: '',
      pwd: '',
      confirmPwd: '',
    });
  }
  componentWillReceiveProps(nextProps) {
    let messages = null;
    if (
      nextProps.errorData &&
      nextProps.errorData.message === 'Validation Error'
    ) {
      nextProps.errorData.errors.forEach((e) => {
        messages = e.field.split('.$').pop();
      });
      Toast.show(messages, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.signupRequestStatus === 'SUCCESS') {
      Toast.show('Signed Up successfully', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
      this.props.navigation.navigate('Login');
    }
  }

  selectGender = g => {
    this.setState({ selectedGender: g });
    console.log(this.state.selectedGender);
  };

  SignUp = () => {
    const validateUserName = /^[a-zA-Z]{4,16}$/;
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;
    const validateText = /^[a-zA-Z]\D{2,20}$/;
    const validatePhNumber = /^[0-9]{0,10}$/;
    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const userData = {
      firstName: this.state.firstname || 'aa',
      lastName: this.state.lastname || 'aaa',
      userName: this.state.username || 'aaaa',
      email: this.state.email || 'aa@gmail.com',
      password: this.state.pwd || 'Welcome@123',
      phone: this.state.phoneNo || '8956857452',
      gender: this.state.selectedGender || 'female',
      birthDate: this.state.date || '07-20-1998',
    };
    if (
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.username === '' ||
      this.state.email === '' ||
      this.state.pwd === '' ||
      this.state.phoneNo === '' ||
      this.state.selectedGender === ''
    ) {
      Toast.show('Fields is not allowed to be empty', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (
      !validateText.test(parseInt(this.state.firstname)) &&
        !validateText.test(this.state.lastname)
    ) {
      Toast.show('Please provide valid name', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (!validateUserName.test(this.state.username)) {
      Toast.show(
        'Please provide valid username with minimun 4 and maximum 16 characters',
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor : '#f6ffff',
          shadow: false,
          textColor: '#585858',
        },
      );
    } else if (!validatePassword.test(this.state.pwd)) {
      Toast.show(
        'Password should have minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor : '#f6ffff',
          shadow: false,
          textColor: '#585858',
        },
      );
    } else if (this.state.pwd !== this.state.confirmPwd) {
      Toast.show('Please provide valid password and confirm password', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (!validateEmail.test(this.state.email)) {
      Toast.show('Please provide valid email format', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (!validatePhNumber.test(this.state.phoneNo)) {
      Toast.show('Please provide valid phone number', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else {
      this.props.signup(userData);
    }
  };

  toggleSwitchP = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  toggleSwitchCp = () => {
    this.setState({ showCPassword: !this.state.showCPassword });
  };

  render() {
    const { signupRequestStatus, errorData, signupErrorStatus } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require('../images/background_images/Seed_IT.png')}
          >
            <View className="h-1-1 space-around flex">
              <View className="f-center mt20 mb20">
                <Text className="dashHeading complementary bold">Join</Text>
              </View>
              <ScrollView>
                <View className="f-center">
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <View className="m10 f-both">
                      <Text className="bold xx_large white mr10">F</Text>
                    </View>
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.firstname}
                      autoCapitalize="none"
                      placeholder="First Name"
                      placeholderTextColor="white"
                      underlineColorAndroid="transparent"
                      onChangeText={firstname => this.setState({ firstname })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <View className="m10 f-both">
                      <Text className="bold xx_large white mr10">L</Text>
                    </View>
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.lastname}
                      autoCapitalize="none"
                      placeholder="Last Name"
                      placeholderTextColor="white"
                      underlineColorAndroid="transparent"
                      onChangeText={lastname => this.setState({ lastname })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10 "
                      source={require('../images/icons/User_login.png')}
                    />
                    <View className="dividerVertrical mt12 mr10" />
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
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Mail.png')}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.email}
                      autoCapitalize="none"
                      placeholder="Email"
                      placeholderTextColor="white"
                      underlineColorAndroid="transparent"
                      onChangeText={email => this.setState({ email })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Phone.png')}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.phoneNo}
                      autoCapitalize="none"
                      placeholder="Phone Number"
                      placeholderTextColor="white"
                      underlineColorAndroid="transparent"
                      onChangeText={phoneNo => this.setState({ phoneNo })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Password.png')}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.pwd}
                      autoCapitalize="none"
                      placeholder="Password"
                      placeholderTextColor="white"
                      secureTextEntry={this.state.showPassword}
                      underlineColorAndroid="transparent"
                      onChangeText={pwd => this.setState({ pwd })}
                    />
                    <View className="pull-right">
                      <Touchable
                        className="showPasswordAuth"
                        onPress={this.toggleSwitchP}
                      >
                        <Text className="darkGrey medium m10">Show</Text>
                      </Touchable>
                    </View>
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Password.png')}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: 'white', fontSize: 16, width: 280 }}
                      value={this.state.confirmPwd}
                      autoCapitalize="none"
                      placeholder="Confirm Password"
                      placeholderTextColor="white"
                      secureTextEntry={this.state.showCPassword}
                      underlineColorAndroid="transparent"
                      onChangeText={confirmPwd => this.setState({ confirmPwd })}
                    />
                    <View className="pull-right">
                      <Touchable
                        className="showPasswordAuth"
                        onPress={this.toggleSwitchCp}
                      >
                        <Text className="darkGrey medium m10">Show</Text>
                      </Touchable>
                    </View>
                  </View>
                  <View className="f-center j-end f-both mv20">
                    <View className=" f-both">
                      <Text className="complementary bold">Gender</Text>
                      <View className="whiteCENTERBorder" />
                    </View>
                    <View className="f-row">
                      {this.state.gender.map((g, i) =>
                          (this.state.selectedGender === g ? (
                            <View className="f-row h38 mt5">
                              <Touchable
                                key={i}
                                className="showSelectedGender"
                                onPress={this.selectGender.bind(this, g)}
                              >
                                <Text className="complementary bold m10">
                                  {g}
                                </Text>
                              </Touchable>
                            </View>
                          ) : (
                            <View className="f-row h38">
                              <Touchable
                                key={i}
                                onPress={this.selectGender.bind(this, g)}
                              >
                                <Text className="complementary m10">{g}</Text>
                              </Touchable>
                            </View>
                          )))}
                    </View>
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/Cake.png')}
                    />
                    <View className="dividerVertrical mt7 mr10" />
                    <DatePicker
                      style={{ width: 200 }}
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                        },
                        dateText: {
                          marginLeft: -10,
                          fontSize: 16,
                          color: 'white',
                          textAlign: 'left',
                        },
                        placeholderText: {
                          fontSize: 16,
                          color: 'white',
                          textAlign: 'left',
                        },
                      }}
                      date={this.state.date}
                      mode="date"
                      placeholder="Birthday (MM/DD/YYYY)"
                      format="MM-DD-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={date => {
                        this.setState({ date });
                      }}
                    />
                  </View>
                </View>
              </ScrollView>

              <View className="f-center mt20 mv20">
                <Touchable className="submitField m20" onPress={this.SignUp}>
                  <Text className="complementary title m10">Sign Up</Text>
                </Touchable>
              </View>
              <View className="f-center j-end f-both f-row mv20">
                <Touchable className="m20" onPress={this.gotToLogin}>
                  <Text className="complementary bold m10">Login</Text>
                </Touchable>
                <Touchable className="m20" onPress={this.gotToBack}>
                  <Text className="complementary m10">Cancel</Text>
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
  const { signupErrorStatus, signupRequestStatus, errorData } = state.signup;
  return {
    signupErrorStatus,
    signupRequestStatus,
    errorData,
  };
}
export default connect(mapStateToProps, { ...AuthActions })(SignUp);
