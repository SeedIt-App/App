import React from "react";
import { connect } from "react-redux";
import { View, Colors, Touchable, Icon, Text, Image } from "./";
import { AuthActions } from "../../actions";

class Footer extends React.PureComponent {
  goToLogin = () => this.props.navigation.navigate("Login");
  goToProfile = () => this.props.navigation.navigate("Profile");
    goToHome = () => {this.props.navigation.navigate("Home")}


  render() {
    const { props } = this;
    const { token } = this.props;
    return (
      <View className="footer mb10">
        <View className="w-1-0 f-row f-both space-between m10">
          {
            this.props.token ? (
              <View className="p5">
                <Touchable onPress={this.goToProfile}>
                  <View className="f-row f-both m20">
                    <Image
                      className="mini_thumb m10"
                      source={require("../images/icons/Login.png")}
                      resizeMode="cover"
                    />
                  </View>
                </Touchable>
                <Text className="text">Profile</Text>
              </View>
            ): 
            (<View className="p5">
                          <Touchable onPress={this.goToLogin}>
                            <View className="f-row f-both m20">
                              <Image
                                className="mini_thumb m10"
                                source={require("../images/icons/Login.png")}
                                resizeMode="cover"
                              />
                            </View>
                          </Touchable>
                          <Text className="text">Login</Text>
                        </View>)
          }
          
          <View className="p5">
            <Touchable onPress={() => {}}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10 black"
                  source={require("../images/icons/Tag_1.png")}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Tags</Text>
          </View>
          <View className="p5">
            <Touchable onPress={this.goToHome}>
              <View className="f-row f-both m20">
                <Image
                  className="mini_thumb m10"
                  source={require("../images/icons/Home.png")}
                  resizeMode="cover"
                />
              </View>
            </Touchable>
            <Text>Home</Text>
          </View>
          <View className="p5">
            <Touchable onPress={() => {}}>
              <View className="f-row f-both m20 mt5">
                <Image
                  className="micro1_thumb m10"
                  source={require("../images/icons/Redwood_Tree.png")}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Redwood</Text>
          </View>
          <View className="p5">
            <Touchable onPress={() => {}}>
              <View className="f-row f-both m20 mt5">
                <Image
                  className="mini_thumb m10"
                  source={require("../images/icons/Followed.png")}
                  resizeMode="center"
                />
              </View>
            </Touchable>
            <Text>Followed</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth;
  return {
    token,
  };
}
export default connect(mapStateToProps, { ...AuthActions})(
  Footer
);
