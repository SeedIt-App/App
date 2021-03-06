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
  Spinner,
  Overlay,
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import Modal from 'react-native-modal';

class Tags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      modalVisible: false,
    };
    this.addAndUpdateWaterToPost = this.addAndUpdateWaterToPost.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getPostsErrorStatus === 'FAILED') {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: 'white',
        textColor: 'darkGrey',
      });
    }
    if (nextProps.updateWaterPostErrorStatus === 'FAILED') {
      Toast.show(nextProps.updateWaterPostErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: 'white',
        textColor: 'darkGrey',
      });
    }
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  goToAddComment = section => {
    console.log(section);
    this.props.navigation.navigate('ViewComments', {
      postData: section,
    });
  };

  addAndUpdateWaterToPost = value => {
    const body = {
      postId: value._id,
    };
    this.props.updateWaterPost(body);
    this.props.getPosts();
  };

  goToSingleTag = value => {
    console.log(value);
    this.props.navigation.navigate('SingleTag', {
      tagData: value,
    });
  };

  modelVisibleToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  goToPublicProfile = user => {
    this.props.navigation.navigate('PublicProfile', {
      publicUser: user,
    });
  };

  renderHeader = (section, i) => (
    <NativeView>
      <View>
        <View className="f-row p5 mr10 j-start">
          <View>
            {section.postedBy.picture ? (
              <Touchable
                className="p5"
                key={i}
                onPress={this.goToPublicProfile.bind(this, section.postedBy)}
              >
                <Image
                  className="med_thumb m10"
                  source={{ uri: section.postedBy.picture }}
                  resizeMode="cover"
                />
              </Touchable>
            ) : (
              <Touchable
                className="p5"
                key={i}
                onPress={this.goToPublicProfile.bind(this, section.postedBy)}
              >
                <Image
                  className="med_thumb m10"
                  source={require('../images/icons/Login_Black.png')}
                  resizeMode="cover"
                />
              </Touchable>
            )}
          </View>
          <View className="f-column w-2-1">
            <Text className="darkGrey bold large t-left ">
              {section.postedBy.userName}
            </Text>
            <View className="f-column">
              <Text className="lightGrey medium t-left">{section.text}</Text>
            </View>
            <View className="f-column mr30">
              <View className="f-row flexWrap  ">
                {section.tags &&
                  section.tags.length > 0 &&
                  section.tags.map((value, i) => (
                    <Touchable
                      className="touchableMin"
                      key={i}
                      onPress={this.goToSingleTag.bind(this, value)}
                    >
                      <Text className="lgBlue bold medium t-left">
                        {' '}
                        #{value.tag}
                      </Text>
                    </Touchable>
                  ))}
              </View>
            </View>
            <View className="f-row flex w-1-2 mr30">
              {section.images &&
                section.images.length > 0 &&
                section.images.map(v => (
                (v !== 'image1.png' && v !== '') &&
                  <Image
                    className="x_l_thumb m5"
                    source={{ uri: v }}
                    resizeMode="cover"
                  />
                ))}
            </View>
          </View>
          <View className="f-row pull-right f-both ">
            {section.waters && section.waters.length > 0 ? (
              <View className="f-row">
                {
                  <View className="f-row">
                    <Touchable
                      className="touchableMin"
                      key={i}
                      onPress={this.addAndUpdateWaterToPost.bind(this, section)}
                    >
                      <Image
                        className="mini_thumb m15"
                        source={
                          section.isLike
                            ? require('../images/icons/Drop-Blue.png')
                            : require('../images/icons/Drop-grey.png')
                        }
                        resizeMode="cover"
                      />
                    </Touchable>
                  </View>
                }
                <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                  {' '}
                  {section.waters.length}
                </Text>
              </View>
            ) : (
              <View className="f-row">
                {
                  <View className="f-row">
                    <Touchable
                      className="touchableMin"
                      key={i}
                      onPress={this.addAndUpdateWaterToPost.bind(this, section)}
                    >
                      <Image
                        className="mini_thumb m15"
                        source={
                          section.isLike
                            ? require('../images/icons/Drop-Blue.png')
                            : require('../images/icons/Drop-grey.png')
                        }
                        resizeMode="cover"
                      />
                    </Touchable>
                  </View>
                }
                <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                  {' '}
                  {section.waters.length}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="dividerGrey" />
      </View>
    </NativeView>
  );

  renderContent = (section, i) => (
    <View className="f-row p5  f-both  w-1-1">
      <View className=" f-row f-both space-between">
        <View className="f-row mh40">
          <View>
            <Touchable onPress={this.modelVisibleToggle}>
              <View className="mb5">
                <Image
                  className="micro1_thumb m10"
                  source={require('../images/icons/share.png')}
                  resizeMode="cover"
                />
                <Modal
                  isVisible={this.state.modalVisible}
                  backdropColor="grey"
                  backdropOpacity={0.4}
                >
                  <View className="overlay f-column f-both">
                    <View className=" f-row f-both m10">
                      <Text className="lgBlue bold large_sm t-center">
                        Share on Facebook
                      </Text>
                    </View>
                    <View className="dividerGrey" />
                    <View className=" f-row f-both m10">
                      <Text className="lgBlue bold large_sm t-center">
                        Share on Twitter
                      </Text>
                    </View>
                  </View>
                  <View className="overlayCancel">
                    <View className="wh-1-1 f-row f-both m10">
                      <Touchable
                        className="p5"
                        onPress={this.modelVisibleToggle}
                      >
                        <Text className="lgBlue bold large_sm t-center">
                          Cancel
                        </Text>
                      </Touchable>
                    </View>
                  </View>
                </Modal>
              </View>
            </Touchable>
          </View>
        </View>
        <View className="f-row mb5  mh40">
          <View>
            <Touchable
              key={i}
              onPress={this.goToAddComment.bind(this, section)}
            >
              <Image
                className="micro "
                source={require('../images/icons/cm.png')}
                resizeMode="cover"
              />
            </Touchable>
          </View>
          <View className="marginTop25 ">
            {section.comments &&
              section.comments.length > 0 && (
                <Text className="mt20 lightGrey bold small t-center">
                  ({section.comments.length} )
                </Text>
              )}
          </View>
        </View>
      </View>
    </View>
  );

  render() {
    const {
      user,
      allPosts,
      getPostsRequestStatus,
      getPostsErrorStatus,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
      addAndUpdateWaterToPost,
      token,
    } = this.props;
    const { props } = this;

    const localPost = [];
    allPosts &&
      allPosts.forEach(post => {
        const tagedPost = Object.assign({ isLike: true }, post);
        tagedPost.isLike = tagedPost.waters.indexOf(user._id) > -1;
        localPost.push(tagedPost);
      });

    return (
      <View className="screen">
        <Header
          title="Tags"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                {localPost &&
                  localPost.length > 0 && (
                    <Accordion
                      sections={localPost}
                      renderHeader={this.renderHeader}
                      renderContent={this.renderContent}
                      underlayColor="transparent"
                    />
                  )}
                {getPostsRequestStatus === 'REQUESTING' && (
                  <View className="p15 mt30">
                    <Spinner large />
                  </View>
                )}
                {getPostsRequestStatus === 'SUCCESS' &&
                  localPost &&
                  localPost.length === 0 && (
                    <View className="flex f-both p10">
                      <Text className="darkGrey bold">There are no tags.</Text>
                    </View>
                  )}
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const { user } = state.auth;
  const allPosts = [];
  const {
    getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
    addAndUpdateWaterToPost,
  } = state.post;

  if (getAllPosts && getAllPosts.posts) {
    getAllPosts.posts.forEach(post => {
      if (post.tags.length > 0) {
        allPosts.push(post);
      }
    });
  }

  return {
    token,
    user,
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
    addAndUpdateWaterToPost,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...PostActions,
})(Tags);
