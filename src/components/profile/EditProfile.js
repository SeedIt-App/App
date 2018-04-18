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
  BackgroundImage,
} from '../common';
import { TextInput } from 'react-native';
import { UserActions } from '../../actions';
import Toast from 'react-native-root-toast';
import idx from 'idx';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
// import axios from 'axios';

const ip_addr = 'https://seedit-api.herokuapp.com/';

class EditProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      address: '',
      city: '',
      state: '',
      bio: '',
      badges: [],
      fullName: '',
      country: '',
      fullAddress: '',
      profileImageUrl: '',
      image: '',
    };
  }

  goToChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.editProfileErrorStatus) {
      Toast.show(this.props.editProfileErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
    if (nextProps.editProfileRequestStatus === 'SUCCESS') {
      Toast.show('Profile updated successfully!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  }

  componentDidMount() {
    if (this.props.luser) {
      this.setState({
        userName: this.props.luser.userName || '',
        fullAddress:
          this.props.luser.address.city ||
          `${'' + ' '}${this.props.luser.address.state}` ||
          'state',
        country: this.props.luser.address.country || '',
        bio: this.props.luser.bio || '',
        badges: this.props.luser.badges || '',
        fullName:
          this.props.luser.firstName ||
          `${'' + ' '}${this.props.luser.lastName}` ||
          '',
      });
    }
  }

  /* openPicker = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else { //never trigger this branch of statement in my case
        console.log(response.data);
        const source = { uri: response.uri, isStatic: true };
        console.log(response.uri);
        this.setState({
          image: source,
        });
        console.log(response.uri, "response.uri")
        this.uploadImages(response.uri)
      }
    });
  };
*/
  /* uploadImages =(imgPath)=> {
    let body = new FormData();
      body.append('file', {uri: imgPath, name: 'photo.png',type: 'image/png'});
      body.append('user_id', 1);
      body.append('Content-Type', 'image/png');

      fetch('https://seedit-api.herokuapp.com/api/v1/' + 'file/upload', {
        method : 'POST',
        body: body
      }).then((response) => {
        return response.json() })
        .then((responseJson) => {
          if(responseJson.status ===  'success'){
            console.log(responseJson, 'responseJson')
            let responseData = responseJson.upload.path
            let user_id = responseJson.upload.id
            this.setState({
              image: ip_addr+responseData.split("/var/www/html/")[1],
              img_Id : user_id
            });
            console.log(this.state.img_Id, 'this.state.image')
          }
        })

    .catch((error) => {
      console.log(error, 'error')
    })
  }
*/
  editProfile = () => {
    const nameArr = this.state.fullName;
    const addressArr = this.state.fullAddress;
    this.setState({
      firstName: nameArr
        .split(' ')
        .slice(0, -1)
        .join(' '),
      lastName: nameArr
        .split(' ')
        .slice(-1)
        .join(' '),
      city: addressArr
        .split(' ')
        .slice(0, -1)
        .join(' '),
      state: addressArr
        .split(' ')
        .slice(-1)
        .join(' '),
    });

    const values = {
      firstName: this.state.firstName || this.props.luser.firstName,
      lastName: this.state.lastName || this.props.luser.lastName,
      userName: this.state.userName || this.props.luser.userName,
      bio: this.state.bio || this.props.luser.bio,
      address: {
        city: this.state.city || this.props.luser.address.city,
        state: this.state.state || this.props.luser.address.state,
        country: this.state.country || this.props.luser.address.country,
      },
    };
    this.props.editProfile(values);
  };

  render() {
    const {
      editProfileRequestStatus,
      editProfileErrorStatus,
      luser,
    } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header
            back
            title="EditProfile"
            navigation={this.props.navigation}
            saveProfile={this.editProfile}
          />
          <ScrollView>
            <View className="f-column">
              <View className="f-center mt15">
                <Touchable className=" mb20">
                  {this.state.image ? (
                    <Image
                      className="big_thumb"
                      source={{ uri: this.state.image }}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Image
                      className="big_thumb"
                      source={require('../images/avatars/Abbott.png')}
                      resizeMode="stretch"
                    />
                  )}
                </Touchable>
              </View>
              <View className="f-center mt10">
                <View className="bgWhite f-row editField j-start m5">
                  <Text className="blue medium m10 bold ">Name :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.fullName}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={fullName => this.setState({ fullName })}
                  />
                </View>
                <View className="bgWhite f-row editField j-start m5">
                  <Text className="blue medium m10 bold ">Username :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.userName}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={userName => this.setState({ userName })}
                  />
                </View>
                <View className="bgWhite f-row editField j-start m5">
                  <Text className="blue medium m10 bold ">Country :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.country}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={country => this.setState({ country })}
                  />
                </View>
                <View className="bgWhite f-row editField j-start m5">
                  <Text className="blue medium m10 bold ">City,State :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={
                      this.state.fullAddress &&
                      this.state.fullAddress === 'undefined'
                        ? ''
                        : ''
                    }
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={fullAddress => this.setState({ fullAddress })}
                  />
                </View>
                <View className="bgWhite textArea f-row j-start m5">
                  <Text className="blue medium m10 bold">Bio:</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.bio}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    multiline
                    onChangeText={bio => this.setState({ bio })}
                  />
                </View>
              </View>
              <View className="f-center mt10">
                <View className="bg-transparent mh25 f-both f-row mt10 space-between">
                  <View className="f-center f-column">
                    <Text className="bold mh10 blue medium">Badges</Text>
                  </View>
                  <View className="f-center f-column">
                    <View className="badgeView" />
                    <Text className="mh10 darkGrey medium">Modrator</Text>
                  </View>
                  <View className="f-center f-column">
                    <View className="badgeView" />
                    <Text className=" mh10 darkGrey medium">Badge</Text>
                  </View>
                  <View className="f-center f-column">
                    <View className="badgeView" />
                    <Text className="mh10 darkGrey medium">Advocate</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="f-center j-end f-both mb15">
            <Touchable
              className="submitFieldPwd m20"
              onPress={this.goToChangePassword}
            >
              <Text className="complementary bold medium m10">
                Change Password
              </Text>
            </Touchable>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const {
    profileRequestStatus,
    profileErrorStatus,
    luser,
    editProfileErrorStatus,
    editProfileRequestStatus,
  } = state.loggedUser;
  console.log(state, 'EditProfile');
  return {
    profileRequestStatus,
    profileErrorStatus,
    luser,
    editProfileErrorStatus,
    editProfileRequestStatus,
  };
}

export default connect(mapStateToProps, { ...UserActions })(EditProfile);
