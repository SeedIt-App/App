import React from "react";
import { connect } from "react-redux";
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Spinner,
  Colors,
  KeyboardAvoidingView,
  ScrollView
} from "../common";
import { TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import { AuthActions } from "../../actions";
import Toast from "react-native-root-toast";

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      firstname : "",
      lastname : "",
      username : "",
      email : "",
      phoneNo : "",
      pwd : "",
      gender : ["Male" , "Female" , "Other"],
      confirmPwd : "",
      selectedGender: "",
    };
  }

  gotToBack = () => this.props.navigation.navigate("SocialSignUp");

  gotToLogin = () => this.props.navigation.navigate("Login");

  componentDidMount() {
    this.setState({
      date :"",
      firstname : "First Name",
      lastname : "Last Name",
      username : "User Name",
      email : "Email",
      phoneNo : "Phone Number",
      pwd : "Password",
      confirmPwd : "Confirm Password",
    });
  }

  componentWillReceiveProps() {
    if (this.props.signupErrorStatus) {
      Toast.show(this.props.signupErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  }

  selectGender = () => {
    this.setState({selectedGender : 'female'})
    console.log(this.state.selectedGender)
  }

  SignUp = () => {
    const userData = {
      "firstName": this.state.firstName,
      "lastName": this.state.lastname,
      "userName": this.state.username,
      "email": this.state.email,
      "password": this.state.pwd,
      "phone": this.state.phoneNo,
      "gender": this.state.selectedGender,
      "birthDate": this.state.date,
    }
    this.props.signup(userData);
    if (this.props.signupRequestStatus == "SUCCESS") {
      Toast.show('SUCCESS', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  }

  render() {
     const {
      signupRequestStatus,
      signupErrorStatus,
    } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require("../images/background_images/Seed_IT.png")}
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
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.firstname}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={firstname => this.setState({ firstname })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <View className="m10 mr10">
                      <Text className="bold xx_large white mr10">L</Text>
                    </View>
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.lastname}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={lastname => this.setState({ lastname })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/User_Login.png")}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.username}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={username => this.setState({ username })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Mail.png")}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.email}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={email => this.setState({ email })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Phone.png")}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.phoneNo}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={phoneNo => this.setState({ phoneNo })}
                    />
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Password.png")}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.pwd}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={pwd => this.setState({ pwd })}
                    />
                    <View className="pull-right">
                      <Touchable className="showPasswordAuth" onPress={() =>{}}>
                        <Text className="darkGrey bold medium m10">Show</Text>
                      </Touchable>
                    </View> 
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Password.png")}
                    />
                    <View className="dividerVertrical mt12 mr10" />
                    <TextInput
                      style={{ color: "white", fontSize: 16 }}
                      value={this.state.confirmPwd}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={confirmPwd => this.setState({ confirmPwd })}
                    />
                    <View className="pull-right">
                      <Touchable className="showPasswordAuth" onPress={() =>{}}>
                        <Text className="darkGrey bold medium m10">Show</Text>
                      </Touchable>
                    </View> 
                  </View>
                  <View className="f-center j-end f-both mv20">
                    <View className=" f-both">
                      <Text className="complementary bold">Gender</Text>
                      <View className="whiteBottomBorder" />
                    </View>
                    <View className="f-row">
                      {this.state.gender.map(g => (
                        <View className="f-row">
                          <Touchable className="m20" onPress={this.selectGender}>
                            <Text className="complementary m10">{g}</Text>
                          </Touchable>
                        </View>  
                      ))}
                     </View>    
                  </View>
                  <View className="bg-lightBlue f-row formInputField j-start m5">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Cake.png")}
                    />
                    <View className="dividerVertrical mt7 mr10" />
                    <DatePicker
                      customStyles={{
                        dateInput: {
                          borderWidth: 0
                        },
                        dateText: {
                          marginLeft: -10,
                          fontSize: 16,
                          color: "white",
                          textAlign: "left"
                        },
                        placeholderText: {
                          marginLeft: -10,
                          fontSize: 16,
                          color: "white",
                          textAlign: "left"
                        }
                      }}
                      date={this.state.date}
                      mode="date"
                      placeholder="Birthday"
                      format="MM-DD-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={date => {
                        this.setState({ date: date });
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
  const {signupErrorStatus, signupRequestStatus} = state.signup;
  return {
    signupErrorStatus,
    signupRequestStatus,
  };
}
export default connect(mapStateToProps, { ...AuthActions})(
  SignUp
);
