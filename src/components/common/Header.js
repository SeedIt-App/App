import React from "react";
import { connect } from "react-redux";
import { View, Colors, Touchable, Icon, Text, Image } from "./";
import { AuthActions } from "../../actions";

class Header extends React.PureComponent {

  goBack = () => {
    this.props.navigation.goBack();
  };

  goToSocialSignUp = () => this.props.navigation.navigate("SocialSignUp");

  render() {
    const { props } = this;
    const { token } = this.props;
    return (
      <View>
        <View className="f-row bg-header p5">
          <View className="w-1-1 f-row f-both h65">
            {props.back ? (
              <Touchable className="pull-left" onPress={this.goBack}>
                <Icon name="keyboard-backspace" color={Colors.white} size={28} />
              </Touchable>
              ) : (
              <Touchable className="pull-left" onPress={() => {}}>
                <Image
                  className="medium_thumb"
                  source={require("../images/logo.png")}
                />
              </Touchable>
            )}
            <Text className="complementary title bold m10">{props.title}</Text>
            {
              props.title === 'Newsfeed' && (
                this.props.token ? 
                (<Touchable className="pull-right" onPress={() => {}}>
                  <Image
                    className="mini1_thumb"
                    source={require('../images/icons/plus.png')}
                  />
                </Touchable>)
                :
                ( <Touchable className="pull-right" onPress={this.goToSocialSignUp}>
                  <Text className="complementary title m10">Sign Up</Text>
                </Touchable>)
              )}
            {
              props.title === 'Profile' && 
              (
              <Touchable className="pull-right" onPress={() => this.props.openRequest()}>                  
                <Image
                  className="medium_thumb"
                  source={require("../images/icons/setting.png")}
                />
              </Touchable>
            )}

            {
              props.title === 'EditProfile' && 
              (
              <Touchable className="pull-right" onPress={() => {}}>                  
                <Text className="complementary title m10">Save</Text>
              </Touchable>
            )}
            
          </View>
        </View>
        <View className="dividerBlack" />
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
  Header
);

