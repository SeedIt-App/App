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

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPwd : '',
      newPwd : ''
    }
  }
  
  render() {
    const { props } = this;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header back title="Change Password" navigation={this.props.navigation} />
            <ScrollView>
              <View className="f-column mt20">
                <View className="f-center mt25">
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue small m10 bold ">Old Password :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16, width : 280 }}
                      value={this.state.oldPwd}
                      placeholder="Old Password"
                      placeholderTextColor='grey'
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={oldPwd => this.setState({ oldPwd })}
                    />
                    <View className="pull-right">
                      <Touchable className="showPassword" onPress={() =>{}}>
                        <Text className="blue bold medium m10">Show</Text>
                      </Touchable>
                    </View> 
                  </View>
                  <View className="bgWhite f-row editField j-start m5">
                    <Text className="blue small m10 bold">New Password :</Text>
                    <TextInput
                      style={{ color: "grey", fontSize: 16, width : 280 }}
                      value={this.state.newPwd}
                      placeholder="New Password"
                      placeholderTextColor='grey'
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={newPwd => this.setState({ newPwd })}
                    />
                    <View className="pull-right">
                      <Touchable className="showPassword" onPress={() =>{}}>
                        <Text className="blue bold medium m10">Show</Text>
                      </Touchable>
                    </View> 
                  </View>
                </View> 

                <View className="f-center j-end f-both mt25 mb15">
                  <Touchable className="submitFieldPwd m20" onPress={() =>{}}>
                    <Text className="complementary bold medium m10">Submit</Text>
                  </Touchable>
                </View> 
              </View>   
            </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(ChangePassword);
