import React from "react";
import { connect } from "react-redux";
import { View, Colors, Touchable, Icon, Text, Image } from "./";

class Header extends React.PureComponent {
  goToSocialSignUp = () => this.props.navigation.navigate("SignUp");

  render() {
    const { props } = this;
    return (
      <View>
        <View className="f-row bg-header p5">
          <View className="w-1-1 f-row f-both h65">
            <Touchable className="pull-left" onPress={() => {}}>
              <Image
                className="medium_thumb"
                source={require("../images/logo.png")}
              />
            </Touchable>
            <Touchable className="pull-right" onPress={this.goToSocialSignUp}>
              <Text className="complementary title m10">Sign Up</Text>
            </Touchable>
            <Text className="complementary title bold m10">{props.title}</Text>
          </View>
        </View>
        <View className="dividerBlack" />
      </View>
    );
  }
}

export default connect()(Header);
