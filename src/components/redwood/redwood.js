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
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import Modal from 'react-native-modal';

class Redwood extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: 'seed',
      activeFlagBorderColor: '#3CCDFD',
      activeFlagTextColor: 'white',
      modalVisible: false,
      user: this.props.user,
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getPostsErrorStatus === 'FAILED') {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.updateWaterPostErrorStatus === 'FAILED') {
      Toast.show(nextProps.updateWaterPostErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
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

  addAndUpdateWaterToPost = section => {
    const body = {
      postId: section._id,
    };
    this.props.updateWaterPost(body);
    if (this.props.updateWaterPostRequestStatus === 'SUCCESS') {
      console.log(this.props.updateWaterToPost, 'this.props.updateWaterToPost');
      this.props.getPosts();
    }
  };

  modelVisibleToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  goToPublicProfile = user => {
    this.props.navigation.navigate('PublicProfile', {
      publicUser: user,
    });
  };

  renderTab = allPosts => {
    const { getPostsRequestStatus } = this.props;

    if (this.state.activeFlag === 'sapling') {
      return (
        <View className="bg-transparent mb20 mt10 space-between">
          <Text className="f-both darkGrey t-center bold medium">
            There is no sapling
          </Text>
        </View>
      );
    } else if (this.state.activeFlag === 'seed') {
      return (
        <View className="bg-transparent mt10  mb20 space-between">
          {allPosts &&
            allPosts.length > 0 && (
              <Accordion
                sections={allPosts}
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
            allPosts.length === 0 && (
              <View className="flex f-both p10">
                <Text className="darkGrey bold">There are no posts</Text>
              </View>
            )}
        </View>
      );
    } else if (this.state.activeFlag === 'tree') {
      return (
        <View className="bg-transparent mt10  mb20 space-between">
          <Text className="f-both darkGrey t-center bold medium">
            There is no tree
          </Text>
        </View>
      );
    } else if (this.state.activeFlag === 'redwood') {
      return (
        <View className="bg-transparent mt10  mb20 space-between">
          <Text className="f-both darkGrey t-center bold medium">
            There is no redwood
          </Text>
        </View>
      );
    }
  };

  renderHeader = (section, i) => (
    <NativeView>
      <View className="f-row p5 mr20">
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
        <View className="f-column j-start mt10 w-2-1">
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
                  <Text className="lgBlue bold medium t-left">
                    {' '}
                    #{value.tag}
                  </Text>
                ))}
            </View>
          </View>
          <View className="f-row flex w-1-2">
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
              <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                {' '}
                {section.waters.length}
              </Text>
            </View>
          ) : (
            <View className="f-row">
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
              <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                {' '}
                {section.waters.length}
              </Text>
            </View>
          )}
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
          title="Levels"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                <View className="f-row p5">
                  <View className="f-row bgWhite w-1-1 space-between">
                    <View className="mh10 p5 mt5 f-both">
                      <Touchable
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 2,
                          borderBottomColor:
                            this.state.activeFlag === 'seed'
                              ? this.state.activeFlagBorderColor
                              : 'transparent',
                        }}
                        onPress={() => {
                          this.setState({ activeFlag: 'seed' });
                        }}
                      >
                        <View className="f-both">
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/seed.png')}
                            resizeMode="cover"
                          />
                          <Text className="darkGrey medium">Seed</Text>
                        </View>
                      </Touchable>
                    </View>
                    <View className="mh10 p5 mt5 f-both">
                      <Touchable
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 2,
                          borderBottomColor:
                            this.state.activeFlag === 'sapling'
                              ? this.state.activeFlagBorderColor
                              : 'transparent',
                        }}
                        onPress={() => {
                          this.setState({
                            activeFlag: 'sapling',
                          });
                        }}
                      >
                        <View className="f-both">
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/sapling.jpg')}
                            resizeMode="cover"
                          />
                          <Text className="darkGrey medium">Sapling</Text>
                        </View>
                      </Touchable>
                    </View>
                    <View className="mh10 p5 f-both">
                      <Touchable
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 2,
                          borderBottomColor:
                            this.state.activeFlag === 'tree'
                              ? this.state.activeFlagBorderColor
                              : 'transparent',
                        }}
                        onPress={() => {
                          this.setState({
                            activeFlag: 'tree',
                          });
                        }}
                      >
                        <View className="mh10 f-both p5">
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/Tree_red.jpg')}
                            resizeMode="cover"
                          />
                          <Text className="darkGrey medium">Tree</Text>
                        </View>
                      </Touchable>
                    </View>
                    <View className="mh10 p5 mt5 f-both">
                      <Touchable
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 2,
                          borderBottomColor:
                            this.state.activeFlag === 'redwood'
                              ? this.state.activeFlagBorderColor
                              : 'transparent',
                        }}
                        onPress={() => {
                          this.setState({
                            activeFlag: 'redwood',
                          });
                        }}
                      >
                        <View className="f-both">
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/tree.png')}
                            resizeMode="cover"
                          />
                          <Text className="darkGrey medium">Redwood</Text>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                </View>
                <ScrollView>{this.renderTab(localPost)}</ScrollView>
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
  const {
    getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
  } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts;
  return {
    token,
    user,
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...PostActions,
})(Redwood);
