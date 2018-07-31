import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Image,
  Footer,
  ScrollView,
  Switch,
  BackgroundImage,
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import idx from 'idx';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';

class CreatePost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userNameFlag: false,
      message: '',
      image: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createPostErrorStatus) {
      Toast.show(nextProps.createPostErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
    if (nextProps.createPostRequestStatus === 'SUCCESS') {
      Toast.show('Successfully posted',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
  }

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
  };

  createNewPost = () => {
    if (this.state.message !== '') {
      const body = {
        text: this.state.message,
        images: [this.state.image],
      };
      this.props.createPost(body);
    } else {
      Toast.show('Please write the text for post',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : 'black',
      });
    }
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
    const { user, createPostRequestStatus, createPostErrorStatus } = this.props;
    const { picture } = this.props.user;
    return (
      <View className="screen">
        <Header title="Create a Post" back navigation={this.props.navigation} />
        <ScrollView>
          <View>
            <View className="f-column bg-transparent space-between">
              <View className="mt10">
                <View className="f-row p5 mr20 mb25">
                  <View className="f-row f-both mr20 m20">
                    {user && picture ? (
                      <Image
                        className="med_thumb"
                        source={{ uri: idx(user, _ => _.picture) }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        className="normal_thumb"
                        source={require('../images/icons/user.png')}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View className="f-column j-start mt10 ">
                    <View className="f-row">
                      {this.state.userNameFlag ? (
                        <Text className="black bold large t-center">
                          {this.props.user
                            ? idx(this.props.user, _ => _.userName)
                            : 'User name'}
                        </Text>
                      ) : null}
                    </View>
                    <Text className="black medium t-center">
                      {this.props.user
                        ? idx(this.props.user.address, _ => _.city)
                        : 'Location'}
                    </Text>
                  </View>
                  <View className="f-column pull-right mt10 f-both m20">
                    <Text className="black medium t-center">Show Username</Text>
                    <Switch
                      value={this.state.userNameFlag}
                      onChange={this.ShowUserName}
                    />
                  </View>
                </View>
                <View className="dividerGrey " />
              </View>
              <View className="m10 ">
                <View className="f-center f-row">
                  <View>
                    <TextInput
                      style={{ color: 'black', fontSize: 16, width: 250 }}
                      value={this.state.message}
                      placeholder="Type your idea here"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      multiline
                      onChangeText={message => this.setState({ message })}
                    />
                  </View>
                </View>
                <View className="f-center f-row">
                  {this.state.image !== '' && (
                    <Image
                      className="x_large_thumb"
                      source={{ uri: this.state.image }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="dividerGrey" />
        <View className="m10 ">
          <View className="f-row f-both w-1-0 space-between">
            <View className="p5">
              <Touchable onPress={this.goToLogin}>
                <View className="f-row f-both m20">
                  <Touchable className="p5" onPress={this.openPicker}>
                    <Image
                      className="mini_thumb m10"
                      source={require('../images/icons/camera.png')}
                      resizeMode="cover"
                    />
                  </Touchable>
                </View>
              </Touchable>
            </View>
            <Touchable className="p5" onPress={this.createNewPost}>
              <Text className="text blue bold">Post</Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const { user } = state.auth;
  const { createPostRequestStatus, createPostErrorStatus } = state.post;
  return {
    token,
    user,
    createPostRequestStatus,
    createPostErrorStatus,
  };
}
export default connect(mapStateToProps, { ...AuthActions, ...PostActions })(CreatePost);
