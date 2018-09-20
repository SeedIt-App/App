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
  Spinner,
} from '../common';
import { TextInput } from 'react-native';
import { UserActions } from '../../actions';
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
    if (nextProps.editProfileErrorStatus) {
      Toast.show(nextProps.editProfileErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: 'darkGrey',
      });
    }
    if (nextProps.editProfileRequestStatus === 'SUCCESS') {
      Toast.show('Password changed successfully!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
      /* this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Newsfeed' }],
      }); */
    }
  }

  changePassword = () => {
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+=@$#!^%*?&()/.~_-])[A-Za-z\d+=@$6^!~./%*#?&()_-]{6,}$/;
    const body = {
      password: this.state.newPwd,
    };
    if (this.state.oldPwd === '' || this.state.newPwd == '') {
      Toast.show('Fields is not allowed to be empty', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: 'darkGrey',
      });
    } else if (!validatePassword.test(this.state.newPwd)) {
      Toast.show(
        'Password must be minimum 6 characters and contains a combination of uppercase and number!',
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: '#f6ffff',
          shadow: false,
          textColor: 'darkGrey',
        },
      );
    } else {
      this.props.editProfile(body);
      if (this.props.editProfileRequestStatus === 'SUCCESS') {
        this.props.getStatus();
      }
    }
  };

  toggleSwitchOPwd = () => {
    this.setState({ showOldPassword: !this.state.showOldPassword });
  };

  toggleSwitchopNPwd = () => {
    this.setState({ showNewPassword: !this.state.showNewPassword });
  };

  getStatus() {
    return (
      <View>
        {this.props.editProfileRequestStatus === 'SUCCESS' ? (
          <View className="mt5">
            <Text className="blue small m10 bold">New Password Saved</Text>
          </View>
        ) : (
          <View className="f-center j-end f-both mt25 mb15">
            <Touchable
              className="submitFieldPwd m20"
              onPress={this.changePassword}
            >
              <Text className="complementary bold medium m10">Submit</Text>
            </Touchable>
          </View>
        )}
        {this.props.editProfileRequestStatus === 'REQUESTING' && (
          <View className="p15 mt30">
            <Spinner large />
          </View>
        )}
      </View>
    );
  }

  render() {
    const { props } = this;
    const {
      user,
      editProfileErrorStatus,
      editProfileRequestStatus,
    } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header title="Change Password" navigation={this.props.navigation} />
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
                    <Touchable
                      className="showPassword"
                      onPress={this.toggleSwitchOPwd}
                    >
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
                    <Touchable
                      className="showPassword"
                      onPress={this.toggleSwitchopNPwd}
                    >
                      <Text className="blue bold medium m10">Show</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
              {this.getStatus()}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;

  const { editProfileErrorStatus, editProfileRequestStatus } = state.loggedUser;

  return {
    user,
    editProfileErrorStatus,
    editProfileRequestStatus,
  };
}

export default connect(mapStateToProps, {
  ...UserActions,
})(ChangePassword);
