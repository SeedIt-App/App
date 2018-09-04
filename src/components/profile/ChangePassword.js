import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Touchable,
  Text,
  Colors,
  KeyboardAvoidingView,
  Header,
  Footer,
  ScrollView,
} from '../common';
import { TextInput } from 'react-native';
import { AuthActions } from '../../actions';
import Toast from 'react-native-root-toast';

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPwd: '',
      newPwd: '',
      showOldPassword: true,
      showNewPassword: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPasswordErrorStatus) {
      Toast.show(nextProps.resetPasswordErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'darkGrey',
      });
    }
  }

  changePassword = () => {
    let validatePassword  = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
    const body = {
      resetToken: this.props.user.resetToken,
      newPassword: this.state.newPwd
    }
    if (this.state.oldPwd === '' || this.state.newPwd == '') {
      Toast.show('Fields is not allowed to be empty',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'darkGrey',
      });
    }
    else {
      if(!validatePassword.test(this.state.newPwd)){
        Toast.show('Please provide valid new password',{
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor : '#bcf2c8',
          textColor : 'darkGrey',
        });
      }
      else{
        this.props.resetPassword(body)
      }
    }
  }

  toggleSwitchOPwd = () => {
    this.setState({ showOldPassword: !this.state.showOldPassword });
  };

  toggleSwitchopNPwd = () => {
    this.setState({ showNewPassword: !this.state.showNewPassword });
  };

  render() {
    const { props } = this;
    const { user,resetPasswordRequestStatus } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header
            back
            title="Change Password"
            navigation={this.props.navigation}
          />
          <ScrollView>
            <View className="f-column mt20">
              <View className="f-center mt25">
                <View className="bgWhite f-row w-1-0 changePwdEditField j-start m5">
                  <Text className="blue small m10 bold ">Old Password :</Text>
                  <TextInput
                    style={{ color: '#585858', fontSize: 16, width: 280 }}
                    value={this.state.oldPwd}
                    placeholder="Old Password"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    secureTextEntry={this.state.showOldPassword}
                    underlineColorAndroid="transparent"
                    onChangeText={oldPwd => this.setState({ oldPwd })}
                  />
                  <View className="pull-right">
                    <Touchable className="showPassword" 
                        onPress={this.toggleSwitchOPwd}>
                      <Text className="blue bold medium m10">Show</Text>
                    </Touchable>
                  </View>
                </View>
                <View className="bgWhite f-row w-1-0 changePwdEditField j-start m5">
                  <Text className="blue small m10 bold">New Password :</Text>
                  <TextInput
                    style={{ color: '#585858', fontSize: 16, width: 280 }}
                    value={this.state.newPwd}
                    placeholder="New Password"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    secureTextEntry={this.state.showNewPassword}
                    underlineColorAndroid="transparent"
                    onChangeText={newPwd => this.setState({ newPwd })}
                  />
                  <View className="pull-right">
                    <Touchable className="showPassword" 
                        onPress={this.toggleSwitchopNPwd}>
                      <Text className="blue bold medium m10">Show</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
              <View className="mt5">
                <Text className="lightGrey t-center bold small m5">Tip : Use atleast 6 characters and one number</Text>
              </View>
              <View className="f-center j-end f-both mt25 mb15">
                <Touchable className="submitFieldPwd m20" onPress={this.changePassword}>
                  <Text className="complementary bold medium m10">Submit</Text>
                </Touchable>
              </View>
              {
                resetPasswordRequestStatus === 'SUCCESS' &&
                (<View className="mt5">
                  <Text className="blue small m10 bold">New Password Saved</Text>
                </View>)
              }
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const { user  } = state.auth;
  return {
    user,
    resetPasswordRequestStatus : state.auth.resetPasswordRequestStatus,
    resetPasswordErrorStatus : state.auth.resetPasswordErrorStatus,
  };
}

export default connect(mapStateToProps, {
  ...AuthActions
})(ChangePassword);

