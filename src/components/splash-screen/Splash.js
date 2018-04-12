import React from "react";
import { Text, View, BackgroundImage, Image, Touchable } from "../common";

class Splash extends React.PureComponent {
  render() {
    return (
      <View className="screen">
        <BackgroundImage
          className="flex f-row expand"
          source={require("../images/background_images/Seed_IT.png")}
        >
          <View className="space-around flex">
            <View className="f-center">
              <Text className="heading complementary bold">Seed It</Text>
            </View>
            <View className="f-center">
              <Touchable className="mv15" onPress={() => {}}>
                <Image source={require("../images/logo.png")} />
              </Touchable>
            </View>
            <View className="f-center">
              <Text className="heading bold complementary">
                Turning the soil...
              </Text>
            </View>
          </View>
        </BackgroundImage>
      </View>
    );
  }
}

export default Splash;
