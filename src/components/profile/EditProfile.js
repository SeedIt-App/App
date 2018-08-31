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
import { TextInput , AsyncStorage} from 'react-native';
import { UserActions } from '../../actions';
import Toast from 'react-native-root-toast';
import idx from 'idx';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';

class EditProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      address: '',
      city: '',
      states: '',
      bio: '',
      badges: [],
      fullName: '',
      country: '',
      fullAddress: '',
      image: '',
      flag : false,
    };
  }

  goToChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editProfileErrorStatus === 'FAILED') {
      Toast.show(nextProps.editProfileErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
    if (nextProps.editProfileRequestStatus === 'SUCCESS') {
      Toast.show('Profile updated successfully!',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
  }

  componentDidMount() {
    if (
      this.props.luser &&
      this.props.luser.address &&
      (this.props.luser.address.city || this.props.luser.address.state)
    ) {
      this.setState({
        fullAddress:
          `${this.props.luser.address.city
          } ${
            this.props.luser.address.state}` || '',
      });
    }
    if (this.props.luser) {
      this.setState({
        userName: this.props.luser.userName  || '',
        country:
          (this.props.luser.address && this.props.luser.address.country) || '',
        bio: this.props.luser.bio || '',
        badges: this.props.luser.badges || [],
        fullName:
          `${this.props.luser.firstName} ${this.props.luser.lastName}` || '',
      });
    }

  }

  editProfile = () => {
      const nameArr = this.state.fullName;
      const addressArr = this.state.fullAddress;

      const firstName = nameArr
        .split(' ')
        .slice(0, -1)
        .join(' ');
      const lastName = nameArr
        .split(' ')
        .slice(-1)
        .join(' ');
      const city = addressArr
        .split(' ')
        .slice(0, -1)
        .join(' ');
      const states = addressArr
        .split(' ')
        .slice(-1)
        .join(' ');

      const values = {
        id: this.props.luser._id,
        firstName: firstName || this.props.luser.firstName,
        lastName: lastName || this.props.luser.lastName,
        userName: this.state.userName || this.props.luser.userName,
        bio: this.state.bio || this.props.luser.bio,
        address: {
          city,
          state: states,
          country: this.state.country,
        },
        picture : this.state.image
      };
      this.props.editProfile(values);
  };

  openPicker = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100, 0)
          .then(({ uri, path }) => {
            const source = { uri };
            this.uploadProfileImage(source.uri);
          })
          .catch(err => {
            console.log(err);
            return Alert.alert(
              'Unable to resize the photo',
              'Check the console for full the error message',
            );
          });
      }
    });
  };

  uploadProfileImage = imgPath => {
    const body = new FormData();
    body.append('file', { uri: imgPath });
    const fileToUpload = imgPath;
    const fileName = fileToUpload.split('/').pop();
    axios
      .get(`/s3?fileName=${fileName}&fileType='image/jpeg'`)
      .then(response => {
        const { signedRequest, url } = response.data;
        console.log({ signedRequest, url, fileName });
        RNFetchBlob.fetch(
          'PUT',
          signedRequest,
          {
            'Content-Type': 'image/jpeg',
          },
          RNFetchBlob.wrap(fileToUpload),
        )
          .then(response => {
            const fileToUpload = url;
            this.setState({ image: fileToUpload });
          })
          .catch(err => {
            // error handling ..
            console.log(err);
          });
      });
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
            title="Edit Profile"
            navigation={this.props.navigation}
            saveProfile={this.editProfile}
          />
          <ScrollView>
            <View className="f-column p5">
              <View className="f-center mt15">
                <Touchable className=" mb20" onPress={this.openPicker}>
                  { this.state.image ||( luser && luser.picture) ? (
                    <Image
                      className="big_thumb"
                      source={{ uri: ( (this.state.image)  || (luser && luser.picture)  )}}
                      resizeMode="cover"
                    />
                  ) : (
                      <Image
                        className="big_thumb"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="stretch"
                      />
                  )}
                </Touchable>
              </View>
              <View className="f-center mt10">
                <View className="bgWhite f-row w-2-1 editField j-start m5">
                  <Text className="blue medium m10 bold ">Name :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.fullName}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={fullName => this.setState({ fullName })}
                  />
                </View>
                <View className="bgWhite f-row w-2-1 editField j-start m5">
                  <Text className="blue medium m10 bold ">Username :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.userName}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={userName => this.setState({ userName })}
                  />
                </View>
                <View className="bgWhite f-row w-2-1 editField j-start m5">
                  <Text className="blue medium m10 bold ">Country :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.country}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={country => this.setState({ country })}
                  />
                </View>
                <View className="bgWhite f-row w-2-1 editField j-start m5">
                  <Text className="blue medium m10 bold ">City, State :</Text>
                  <TextInput
                    style={{ color: 'grey', fontSize: 16 }}
                    value={this.state.fullAddress}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={fullAddress => this.setState({ fullAddress })}
                  />
                </View>
                <View className="bgWhite w-2-1 textArea f-row j-start m5">
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

  return {
    profileRequestStatus,
    profileErrorStatus,
    luser,
    editProfileErrorStatus,
    editProfileRequestStatus,
  };
}

export default connect(mapStateToProps, { ...UserActions })(EditProfile);
