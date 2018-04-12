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
import { TextInput } from "react-native";
import { AuthActions } from "../../actions";
import Toast from "react-native-root-toast";
import idx from "idx";

class Login extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password: "",
    };
  }

  goToSocialSignUp = () => this.props.navigation.navigate("SocialSignUp");

  componentWillReceiveProps(nextProps) {
   if (this.props.loginErrorStatus) {
      Toast.show(this.props.loginErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (nextProps.loginRequestStatus === "SUCCESS") {
      Toast.show("Logged in Successfully!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  }
   
  componentDidMount() {
    this.setState({
      username : "Username",
      password : "Password",
    });
  }

  Login =() => {
    const loginValues = {
      "usernameOrEmail" : this.state.username,
      "password" : this.state.password
    }
    this.props.login(loginValues);
    if (this.props.loginRequestStatus === "SUCCESS") {
      this.props.navigation.navigate('Home')
    }
  };

  render() {
    const {
      loginRequestStatus,
      loginErrorStatus,
    } = this.props;
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
                <View className="bg-Field f-row inputField j-start m10">
                  <Image
                    className="mini_thumb m10"
                    source={require("../images/icons/User_Login.png")}
                  />
                  <View className="dividerVertrical mt10 mr10" />
                  <TextInput
                    style={{ color: "white", fontSize: 16 }}
                    value={this.state.username}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={username => this.setState({ username })}
                  />
                </View>
                <View className="bg-lightBlue f-row inputField j-start m10">
                  <Image
                    className="mini_thumb m10"
                    source={require("../images/icons/Password.png")}
                  />
                  <View className="dividerVertrical mt10 mr10" />
                  <TextInput
                    style={{ color: "white", fontSize: 16 }}
                    value={this.state.password}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })}
                  />
                  <View className="pull-right">
                    <Touchable className="showPasswordAuth" onPress={() =>{}}>
                      <Text className="darkGrey bold medium m10">Show</Text>
                    </Touchable>
                  </View> 
                </View>
                <Text className="normal white">Forgot Password ?</Text>
              </View>
              <View className="f-center  mt20 mv20">
                <Touchable className="submitField m20" onPress={this.Login}>
                  <Text className="complementary title m10"> Login</Text>
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

function mapStateToProps(state) {
  const {loginErrorStatus, loginRequestStatus} = state.login;
  return {
    loginRequestStatus,
    loginErrorStatus,
    isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
  };
}
export default connect(mapStateToProps, { ...AuthActions})(
  Login
);
