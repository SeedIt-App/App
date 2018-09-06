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
  Switch,Icon,
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import { TextInput, Platform  } from 'react-native';
import Toast from 'react-native-root-toast';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import idx from 'idx';

class ViewComments extends React.PureComponent {
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
      Toast.show(nextProps.addNewCommentToPostErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goToAddComment = section => {
    console.log(section);
    this.props.navigation.navigate('CreateComment', {
      postData: section,
    });
  };

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
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
         <View>     
          <View className="f-row bg-header p5">
            <View className="w-1-1 f-row f-both h65 mt15">
              <Touchable className="pull-left" onPress={this.goBack}>
                <Icon
                  name="keyboard-backspace"
                  color='white'
                  size={28}
                />
              </Touchable>
                <Touchable
                  className="pull-right"
                  onPress={this.goToAddComment.bind(this, this.state.currentPostData)}
                >
                  <Text className="complementary bold medium m10">Add Comment</Text>
                </Touchable>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View className="f-column bg-transparent  space-between">
              <View className="m10 mt20">
                <View className="f-center f-row">
                  <View>
                    <Text className="darkGrey bold large t-center ">
                      {this.state.currentPostData.text}
                    </Text>
                    {this.state.currentPostData &&
                      this.state.currentPostData.comments &&
                      this.state.currentPostData.comments.length > 0 &&
                      this.state.currentPostData.comments.map(value => (
                        <Text className="darkGrey bold medium t-left">
                          {value.text}
                          {'\n'} {' - '}
                          {value.commentBy.userName}
                        </Text>
                      ))}
                  </View>
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
            <Touchable className="p5" onPress={this.addToComment}>
              <Text className="text blue bold">Send</Text>
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
export default connect(mapStateToProps, { ...AuthActions, ...PostActions })(ViewComments);
