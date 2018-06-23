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
import Toast from "react-native-root-toast";

class SocialSignUp extends React.PureComponent {
  
  gotToBack = () => this.props.navigation.navigate("Newsfeed");
  goToSignUp = () => this.props.navigation.navigate("SignUp");
  goToLogin = () => this.props.navigation.navigate("Login");
  
  render() {
    const { props} = this;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <BackgroundImage
            className="flex f-row expand"
            source={require("../images/background_images/Seed_IT.png")}
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
                  <Touchable className="m20" onPress={() => {}}>
                    <Text className="bold darkGrey">Sign Up with Facebook</Text>
                  </Touchable>
                </View>
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={() => {}}>
                    <Text className="bold darkGrey">Sign Up with Twitter</Text>
                  </Touchable>
                </View>
                <View className=" f-row textField m10 f-both">
                  <Touchable className="m20" onPress={this.SignUpByGoogle}>
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

export default connect()(SocialSignUp);
