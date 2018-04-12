import React from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  Touchable,
  Text,
  Colors,
  KeyboardAvoidingView,
  Header,
  Footer,
  ScrollView
} from "../common";
import { TextInput } from "react-native";

class EditProfile extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      address: '',
      bio: '',
      badges : [],
      fullName : ''
    };
  }

  goToChangePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  }

  componentDidMount() {
    this.setState({
      userName: '',
      address: '',
      bio: '',
      badges : [],
      fullName : this.state.firstName
    });
  }

  
  render() {
    const { props } = this;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header back title="EditProfile" navigation={this.props.navigation} />
            <ScrollView>
              <View className="f-column">
                <View className="f-center mt15">
                  <Image
                    className="big_thumb"
                    source={require("../images/avatars/Abbott.png")}
                  />
                </View>
                <View className="f-center mt10">
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue medium m10 bold ">Name :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16 }}
                      value={this.state.fullName}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={fullName => this.setState({ fullName })}
                    />
                  </View>
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue medium m10 bold ">Username :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16 }}
                      value={this.state.username}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={username => this.setState({ username })}
                    />
                  </View>
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue medium m10 bold ">Country :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16 }}
                      value={'United State'}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue medium m10 bold ">City,State :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16 }}
                      value={this.state.address}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={address => this.setState({ address })}
                    />
                  </View>
                  <View className="bgWhite textArea f-row j-start m5">
                    <Text className="blue medium m10 bold">Bio:</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16, }}
                      value={this.state.bio}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      multiline = {true}
                      onChangeText={bio => this.setState({ bio })}
                    />
                  </View>
                </View> 
                <View className="f-center mt10">
                  <View className="bg-transparent mh25 f-both f-row mt10 space-between">
                    <View className="f-center f-column">
                      <Text className="bold mh10 blue medium">
                        Badges
                      </Text>
                    </View>
                    <View className="f-center f-column">
                      <Image
                        className=" normal_thumb"
                        source={require("../images/avatars/Abbott.png")}
                      />
                      <Text className="mh10 darkGrey medium">
                        Cards
                      </Text>
                    </View>
                    <View className="f-center f-column">
                      <Image
                        className="normal_thumb"
                        source={require("../images/avatars/Abbott.png")}
                      />
                      <Text className=" mh10 darkGrey medium">
                        Cards1
                      </Text>
                    </View>
                    <View className="f-center f-column">
                      <Image
                        className="normal_thumb"
                        source={require("../images/avatars/Abbott.png")}
                      />
                      <Text className="mh10 darkGrey medium">
                        Cards2
                      </Text>
                    </View>
                  </View>   
                </View>
              </View>   
            </ScrollView>
            <View className="f-center j-end f-both mb15">
              <Touchable className="submitFieldPwd m20" onPress={this.goToChangePassword}>
                <Text className="complementary bold medium m10">Change Password</Text>
              </Touchable>
            </View> 
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(EditProfile);
