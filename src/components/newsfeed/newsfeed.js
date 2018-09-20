import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Colors,
  Image,
  Footer,
  ScrollView,
  Spinner,
  Overlay,
} from '../common';
import { AuthActions, NewsFeedActions, PostActions } from '../../actions';
import { AsyncStorage, ListView, TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import Modal from 'react-native-modal';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class NewsFeed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      modalVisible: false,
      searchPosts: [],
    };
  }

  componentDidMount() {
    this.props.userNewsFeed();
    this.props.guestUserNewsFeed();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getPostsErrorStatus === 'FAILED') {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: 'darkGrey',
      });
    }
    if (nextProps.updateWaterPostErrorStatus === 'FAILED') {
      Toast.show(nextProps.updateWaterPostErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: 'darkGrey',
      });
    }
  }

  getToast () {
    return (
      Toast.show('Please login', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: 'white',
        textColor: 'darkGrey'
      })
    )
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  goToAddComment = section => {
    if (this.props.token === null) {
      this.props.navigation.navigate('Login');
      this.getToast()
    } else {
      this.props.navigation.navigate('ViewComments', {
        postData: section,
      });
    }
  };

  addAndUpdateWaterToPost = value => {
    const body = {
      postId: value._id,
    };
    this.props.updateWaterPost(body);
    if (this.props.updateWaterPostRequestStatus === 'SUCCESS') {
      console.log('addAndUpdateWaterToPost');
      this.props.userNewsFeed();
    }
  };

  goToSingleTag = value => {
    if (this.props.token === null) {
      this.props.navigation.navigate('Login');
      this.getToast()
    } else {
      this.props.navigation.navigate('SingleTag', {
        tagData: value,
      });
    }
  };

  modelVisibleToggle = () => {
    if (this.props.token === null) {
      this.props.navigation.navigate('Login');
      this.getToast()
    } else {
      this.setState({ modalVisible: !this.state.modalVisible });
    }
  };

  goToPublicProfile = user => {
    if (this.props.token === null) {
      this.props.navigation.navigate('Login');
      this.getToast()
    } else {
      this.props.navigation.navigate('PublicProfile', {
        publicUser: user,
      });
    }
  };

  searchPosts = searchedText => {
    const localgetAllUserNewsfeed = [];
    this.props.getAllUserNewsfeed &&
      this.props.getAllUserNewsfeed.length > 0 &&
      this.props.token !== null &&
      this.props.getAllUserNewsfeed.forEach(post => {
        const tagedPost = Object.assign({ isLike: true }, post);
        tagedPost.isLike = tagedPost.waters.indexOf(this.props.user._id) > -1;
        localgetAllUserNewsfeed.push(tagedPost);
      });

    const searchPosts = [];
    if (localgetAllUserNewsfeed.length > 0) {
      localgetAllUserNewsfeed &&
        localgetAllUserNewsfeed.forEach(nf => {
          if (nf.text.toLowerCase().indexOf(searchedText) != -1) {
            searchPosts.push(nf);
          } else {
            nf.tags.forEach(t => {
              if (t.tag.toLowerCase().indexOf(searchedText) != -1) {
                searchPosts.push(nf);
              }
            });
          }
        });
    } else {
      getAllGuestUserNewsfeed.forEach(nf => {
        if (nf.text.toLowerCase().indexOf(searchedText) != -1) {
          searchPosts.push(nf);
        } else {
          nf.tags.forEach(t => {
            if (t.tag.toLowerCase().indexOf(searchedText) != -1) {
              searchPosts.push(nf);
            }
          });
        }
      });
    }
    this.setState({ searchPosts });
  };

  renderAdress = (searchPosts, i) => {
    const { user } = this.props;
    return (
      <ScrollView>
        <View className="p3">
          <View className="f-column">
            <View className="bg-transparent space-between">
              <View className="f-row p5 mr10 j-start">
                <View>
                  {searchPosts.postedBy.picture ? (
                    <Image
                      className="med_thumb m10"
                      source={{ uri: searchPosts.postedBy.picture }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      className="med_thumb m10"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View className="f-column  w-2-1 ">
                  <Text className="darkGrey bold large t-left">
                    {searchPosts.postedBy.userName}
                  </Text>
                  <View className="f-column">
                    <Text className="lightGrey medium t-left">
                      {searchPosts.text}
                    </Text>
                    {this.state.user &&
                      this.state.user.role === 'admin' && (
                        <View>
                          <Image
                            className="micro_thumb m5"
                            source={require('../images/icons/delete.jpg')}
                            resizeMode="cover"
                          />
                        </View>
                      )}
                  </View>
                  <View className="f-column">
                    <View className="f-row flex w-1-2 mr30">
                      {searchPosts.tags &&
                        searchPosts.tags.length > 0 &&
                        searchPosts.tags.map((v, i) => (
                          <Text className="lgBlue bold medium t-left">
                            {' '}
                            #{v.tag}
                          </Text>
                        ))}
                    </View>
                    <View className="f-row flex w-1-2 mr30">
                      {searchPosts.images &&
                        searchPosts.images.length > 0 &&
                        searchPosts.images.map(v =>
                            v !== 'image1.png' &&
                            v !== '' && (
                              <Image
                                className="x_l_thumb m5"
                                source={{ uri: v }}
                                resizeMode="cover"
                              />
                            ))}
                    </View>
                  </View>
                </View>
                <View className="f-row pull-right f-both ">
                  {this.props.token !== null ?
                    (searchPosts.waters && searchPosts.waters.length > 0 ? (
                      <View className="f-row">
                        {
                          <View className="f-row">
                            <Image
                              className="mini_thumb m15"
                              source={
                                searchPosts.isLike
                                  ? require('../images/icons/Drop-Blue.png')
                                  : require('../images/icons/Drop-grey.png')
                              }
                              resizeMode="cover"
                            />
                          </View>
                        }
                        <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                          {' '}
                          {searchPosts.waters.length}
                        </Text>
                      </View>
                    ) : (
                      <View className="f-row">
                        {
                          <View className="f-row">
                            <Image
                              className="mini_thumb m15"
                              source={
                                searchPosts.isLike
                                  ? require('../images/icons/Drop-Blue.png')
                                  : require('../images/icons/Drop-grey.png')
                              }
                              resizeMode="cover"
                            />
                          </View>
                        }
                        <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                          {' '}
                          {searchPosts.waters.length}
                        </Text>
                      </View>
                    ))
                    :
                    (searchPosts.waters && 
                      <View className="f-row">
                        <View className="f-row">
                          <Image
                            className="mini_thumb m15"
                            source={require('../images/icons/Drop-grey.png') }
                            resizeMode="cover"
                          />
                        </View>
                        <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                          {' '}
                          {searchPosts.waters.length}
                        </Text>
                      </View>
                    )
                  }
                </View>
                <View className="dividerGrey" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
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
            {this.props.token !== null ?
              (section.waters && section.waters.length > 0 ? (
                <View className="f-row">
                  {
                    <View className="f-row">
                      <Touchable
                        className="touchableMin"
                        key={i}
                        onPress={this.addAndUpdateWaterToPost.bind(
                          this,
                          section,
                        )}
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
                        onPress={this.addAndUpdateWaterToPost.bind(
                          this,
                          section,
                        )}
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
              ))
              :
              (section.waters &&
                <View className="f-row">
                  <View className="f-row">
                    <Touchable
                      className="touchableMin"
                      onPress={this.goToLogin.bind(this)}
                      >
                      <Image
                        className="mini_thumb m15"
                        source={require('../images/icons/Drop-grey.png') }
                        resizeMode="cover"
                      />
                    </Touchable>
                  </View>
                  <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                    {' '}
                    {section.waters.length}
                  </Text>
                </View>
              )
            }
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
      token,
      getAllUserNewsfeed,
      getAllGuestUserNewsfeed,
      userNewsFeedRequestStatus,
      userNewsFeedErrorStatus,
      guestUserNewsFeedErrorStatus,
      guestUserNewsFeedRequestStatus,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
    } = this.props;

    const localPost = [];

    if (userNewsFeedRequestStatus === 'SUCCESS' && getAllUserNewsfeed.length > 0 && token !== null) {
        getAllUserNewsfeed.forEach((post) => {
          const tagedPost = Object.assign({ isLike: true }, post);
          const index = tagedPost.waters.findIndex((a) => a._id === user._id);
          tagedPost.isLike = index > -1;
          localPost.push(tagedPost);
        });
    }

    return (
      <View className="screen">
        <Header
          title="NewsFeed"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <View className="shadowBox w-1-1">
          <TextInput
            style={{
              height: 36,
              backgroundColor: Colors.white,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.white,
              textAlign: 'center',
            }}
            placeholder="Search"
            placeholderTextColor="grey"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={this.searchPosts}
          />
        </View>
        {this.state.searchPosts.length === 0 && (
          <ScrollView>
            <View>
              <View className="f-column">
                <View className="bg-transparent mt10 space-between">
                  {(userNewsFeedRequestStatus === 'SUCCESS' ||
                    guestUserNewsFeedRequestStatus === 'SUCCESS') &&
                  localPost &&
                  localPost.length > 0 ? (
                    <Accordion
                      sections={localPost}
                      renderHeader={this.renderHeader}
                      renderContent={this.renderContent}
                      underlayColor="transparent"
                    />
                  ) : (
                    <Accordion
                      sections={getAllGuestUserNewsfeed}
                      renderHeader={this.renderHeader}
                      renderContent={this.renderContent}
                      underlayColor="transparent"
                    />
                  )}
                  {(userNewsFeedRequestStatus === 'REQUESTING') && (
                    <View className="p15 mt30">
                      <Spinner large />
                    </View>
                  )}
                  {(userNewsFeedRequestStatus === 'SUCCESS' ||
                    guestUserNewsFeedRequestStatus === 'SUCCESS') &&
                    (localPost && localPost.length === 0) && (
                      <View className="flex f-both p10">
                        <Text className="darkGrey bold">
                          There are no newsfeeds.
                        </Text>
                      </View>
                    )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        <ListView
          dataSource={ds.cloneWithRows(this.state.searchPosts)}
          renderRow={this.renderAdress}
        />
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const { user } = state.auth;
  const {
    userNewsFeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
    guestUserNewsFeed,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
  } = state.newsFeed;
  let getAllUserNewsfeed = [];
  let getAllGuestUserNewsfeed = [];
  const {
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
  } = state.post;
  if (userNewsFeed && userNewsFeed.records.length > 0 && token) {
    getAllUserNewsfeed = userNewsFeed.records;
  }
  if (guestUserNewsFeed && guestUserNewsFeed.records.length > 0) {
    getAllGuestUserNewsfeed = guestUserNewsFeed.records;
  }
  return {
    token,
    user,
    getAllUserNewsfeed,
    getAllGuestUserNewsfeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...NewsFeedActions,
  ...PostActions,
})(NewsFeed);
