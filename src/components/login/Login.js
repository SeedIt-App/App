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
  KeyboardAvoidingView
} from "../common";
import LoginForm from "./LoginForm";
import { TextInput } from "react-native";

class Login extends React.PureComponent {
  goToSocialSignUp = () => this.props.navigation.navigate("SocialSignUp");

  login = () => {
    console.log("login");
  };

  render() {
    const { props } = this;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require("../images/background_images/Seed_IT.png")}
          >
            <View className="h-2-1 space-around flex">
              <View className="f-center">
                <Text className="dashHeading complementary bold">Seed It</Text>
                <Image
                  className="x_large_thumb mt20"
                  source={require("../images/icons/Jar.png")}
                />
              </View>
              <View className="f-center mt20">
                <View className="bg-lightBlue f-row inputField j-start m10">
                  <Image
                    className="mini_thumb m10"
                    source={require("../images/icons/User_Login.png")}
                  />
                  <View className="dividerVertrical mt10 mr10" />
                  <TextInput
                    placeholder="Username"
                    style={{ color: "white", fontSize: 16 }}
                    value={"Username"}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View className="bg-lightBlue f-row inputField j-start m10">
                  <Image
                    className="mini_thumb m10"
                    source={require("../images/icons/Password.png")}
                  />
                  <View className="dividerVertrical mt10 mr10" />
                  <TextInput
                    placeholder="Password"
                    style={{ color: "white", fontSize: 16 }}
                    value={"Password"}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <Text className="normal white">Forgot Password ?</Text>
              </View>
              <View className="f-center  mt20 mv20">
                <Touchable className="submitField m20" onPress={() => {}}>
                  <Text className="complementary title m10">Login</Text>
                </Touchable>
                <View className="f-row mt10">
                  <Text className="normal white mt12">New</Text>
                  <Touchable className="mv20" onPress={this.goToSocialSignUp}>
                    <Text className="normal bold white"> ? SignUp</Text>
                  </Touchable>
                </View>
              </View>
            </View>
          </BackgroundImage>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Login);
