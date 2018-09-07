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
import { AuthActions, PostActions , NewsFeedActions} from '../../actions';
import idx from 'idx';
import { TextInput,Platform } from 'react-native';
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
    if (nextProps.createPostErrorStatus  === 'FAILED') {
      Toast.show(nextProps.createPostErrorStatus ,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }
    if (nextProps.createPostRequestStatus === 'SUCCESS') {
      Toast.show('Successfully posted',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
      nextProps.userNewsFeed();
      if(nextProps.userNewsFeedRequestStatus === 'SUCCESS' ){
        this.props.navigation.navigate('NewsFeed')
      }
    }
  }

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
  };

  createNewPost = () => {
    let validateText = /^[a-zA-Z0-9_ ]{8,}$/;

    if (this.state.message === '') {
      Toast.show('Please write the text for post',{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }
    else if(!validateText.test(this.state.message) ){
      Toast.show("Post length must be at least 8 characters long",{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    } 
    else {
      const body = {
        text: this.state.message,
        images: [this.state.image],
      };
      this.props.createPost(body);
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
            let source =  uri;
            if (Platform.OS == 'ios') {
              source = source.replace('file://', '');
            }
            this.uploadProfileImage(source);
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
    const { user, createPostRequestStatus, createPostErrorStatus,
    userNewsFeed, userNewsFeedRequestStatus, userNewsFeedErrorStatus } = this.props;
    const { picture } = this.props.user;
    return (
      <View className="screen">
        <Header title="Create a Post" back navigation={this.props.navigation} />
        <ScrollView>
          <View>
            <View className="f-column bg-transparent space-between">
              <View className="mt10">
                <View className="f-row p5  mb25">
                  <View className="f-row f-both">
                    {user && picture ? (
                      <Image
                        className="large_thumb"
                        source={{ uri: idx(user, _ => _.picture) }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        className="large_thumb"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View className="f-column j-start mt10 ">
                    <View className="f-row">
                      {this.state.userNameFlag ? (
                        <View className="mh20">
                          <Text className="darkGrey bold large t-left">
                            {this.props.user
                              ? idx(this.props.user, _ => _.userName)
                              : 'User name'}
                          </Text>
                          <View className="f-row  mt3">
                            <Image
                              className="mt5"
                              source={require('../images/icons/location.png')}
                              resizeMode="cover"
                            />
                            <Text className="lightGrey medium ">
                              {this.props.user && this.props.user.address && this.props.user.city 
                              ? this.props.user.address.city
                              : 'Add a location'}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View className="f-column pull-right mt10 f-both m10">
                    <Text className="darkGrey medium t-center">Show Username</Text>
                    <Switch
                      value={this.state.userNameFlag}
                      onChange={this.ShowUserName}
                    />
                  </View>
                </View>
                <View className="dividerGrey" />
              </View>
              <View className="m10 mt20">
                <View className="f-center f-row">
                  <View>
                    <TextInput
                      style={{ color: '#585858', fontSize: 16, width: 250 }}
                      value={this.state.message}
                      placeholder="What's bothering you?"
                      placeholderTextColor="#585858"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      multiline
                      onChangeText={message => this.setState({ message })}
                    />
                  </View>
                </View>
                <View className="f-center f-row mt20">
                  {this.state.image !== '' && (
                    <Image
                      className="x_l_thumb"
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
        <View className="m5 ">
          <View className="f-row f-both w-1-0 space-between">
            <View className="p5">
              <Touchable onPress={this.goToLogin}>
                <View className="f-row f-both ">
                  <Touchable className="p5" onPress={this.openPicker}>
                    <Image
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
  const {
    userNewsFeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
  } = state.newsFeed;
  return {
    token,
    user,
    createPostRequestStatus,
    createPostErrorStatus,
    userNewsFeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
  };
}
export default connect(mapStateToProps, { ...AuthActions, ...PostActions, ...NewsFeedActions })(CreatePost);
