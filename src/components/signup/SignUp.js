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

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      fisrtname : "",
      lastname : "",
      username : "",
      email : "",
      phoneNo : "",
      pwd : "",
      gender : "",
      confirmPwd : "",
    };
  }

  gotToBack = () => this.props.navigation.navigate("SocialSignUp");

  gotToLogin = () => this.props.navigation.navigate("Login");

   componentDidMount() {
    this.setState({
      date :"",
      fisrtname : "First Name",
      lastname : "Last Name",
      username : "User Name",
      email : "Email",
      phoneNo : "Phone Number",
      pwd : "Password",
      gender : "Gender",
      confirmPwd : "Confirm Password",
       });
  }

  render() {
    const { props } = this;
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
                      value={this.state.fisrtname}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={fisrtname => this.setState({ fisrtname })}
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
                  </View>
                  <View className="f-center j-end f-both mv20">
                    <View className=" f-both">
                      <Text className="complementary bold">Gender</Text>
                      <View className="whiteBottomBorder" />
                    </View>
                    <View className="f-row">
                      <Touchable className="m20" onPress={() => {}}>
                        <Text className="complementary m10">Female</Text>
                      </Touchable>
                      <Touchable className="m20" onPress={() => {}}>
                        <Text className="complementary m10">Male</Text>
                      </Touchable>
                      <Touchable className="m20" onPress={() => {}}>
                        <Text className="complementary m10">Other</Text>
                      </Touchable>
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
                <Touchable className="submitField m20" onPress={() => {}}>
                  <Text className="complementary title m10">Sign Up</Text>
                </Touchable>
              </View>
              <View className="f-center j-end f-both f-row mv20">
                <Touchable className="m20" onPress={this.gotToLogin}>
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

export default connect()(SignUp);
