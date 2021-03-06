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
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import { TextInput, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import idx from 'idx';

class CreateComment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userNameFlag: false,
      message: '',
      currentPostData: this.props.navigation.state.params.postData,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addNewCommentToPostErrorStatus) {
      Toast.show('text length must be at least 8 characters long', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.addNewCommentToPostRequestStatus === 'SUCCESS') {
      Toast.show('Comment added to the post', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Newsfeed' }],
      });
    }
  }

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
  };

  addToComment = () => {
    const validateText = /^[a-zA-Z0-9_ !@#$%^&*'()/,.?":{}|<>]{8,}$/;
    let body;
    if (this.state.message === '') {
      Toast.show('Please write the text for comment', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else if (!validateText.test(this.state.message)) {
      Toast.show('Comment length must be at least 8 characters long', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    } else {
      if (this.state.images === '') {
        body = {
          postId: this.state.currentPostData._id,
          text: this.state.message,
        };
      } else {
        body = {
          postId: this.state.currentPostData._id,
          text: this.state.message,
          images: [this.state.image],
        };
      }
      this.props.addNewCommentToPost(body);
    }
  };

  openPicker = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
      } else {
        ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100, 0)
          .then(({ uri, path }) => {
            let source = uri;
            if (Platform.OS == 'ios') {
              source = source.replace('file://', '');
            }
            this.uploadProfileImage(source);
          })
          .catch(err => Alert.alert(
            'Unable to resize the photo',
            'Check the console for full the error message',
          ));
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
          });
      });
  };

  render() {
    const {
      user,
      addNewCommentToPostRequestStatus,
      addNewCommentToPostErrorStatus,
    } = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header
          title="Add a Comment"
          back
          navigation={this.props.navigation}
          commentRequest={this.addToComment}
        />
        <ScrollView>
          <View>
            <View className="f-column bg-transparent  space-between">
              <View className="mt10">
                <View className="f-row p5 mr20 mb25">
                  <View className="f-row f-both m20 mr20">
                    {this.props.user && this.props.user.picture ? (
                      <Image
                        className="large_thumb"
                        source={{ uri: idx(this.props.user, _ => _.picture) }}
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
                        <View>
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
                            <Text className="lightGrey medium  t-left">
                              {this.props.user &&
                              this.props.user.address &&
                              this.props.user.address.city
                                ? this.props.user.address.city
                                : 'Add a location'}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View className="f-column pull-right mt10 f-both m20">
                    <Text className="lightGrey medium t-center">
                      Show Username
                    </Text>
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
                    <Text className="darkGrey bold large t-center mb20">
                      {this.state.currentPostData.text}
                    </Text>
                    {/* {this.state.currentPostData &&
                      this.state.currentPostData.comments &&
                      this.state.currentPostData.comments.length > 0 &&
                      this.state.currentPostData.comments.map(value => (
                        <Text className="darkGrey bold medium t-left">
                          {value.text}
                          {'\n'} {' - '}
                          {value.commentBy.userName}
                        </Text>
                      ))} */}
                    <TextInput
                      style={{ color: '#585858', fontSize: 16, width: 250 }}
                      value={this.state.message}
                      placeholder="Type your comment here"
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
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const { user } = state.auth;
  const {
    addNewCommentToPostRequestStatus,
    addNewCommentToPostErrorStatus,
  } = state.post;
  return {
    token,
    user,
    addNewCommentToPostRequestStatus,
    addNewCommentToPostErrorStatus,
  };
}
export default connect(mapStateToProps, { ...AuthActions, ...PostActions })(CreateComment);
