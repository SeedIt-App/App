import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import {
  View,
  Image,
  Touchable,
  Text,
  Colors,
  KeyboardAvoidingView,
  Header,
  Footer,
  Spinner,
  ScrollView,
} from '../common';
import { AsyncStorage } from 'react-native';
import {
  AuthActions,
  UserActions,
  FollowActions,
  PostActions,
} from '../../actions';
import Toast from 'react-native-root-toast';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: 'posted',
      activeFlagBorderColor: 'white',
      activeFlagTextColor: '#3CCDFD',
      allLikePost: [],
      goggleData: null,
    };
  }

  componentDidMount() {
    this.props.profile();
    const Id = this.props.user && this.props.user._id;
    this.props.getPosts(Id);
    this.props.getAllFollowers();
    this.props.getAllUserFollowings();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.goggleData === null) {
      if (nextProps.token === null || '') {
        Toast.show('Please login', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: '#f6ffff',
          shadow: false,
          textColor: '#585858',
        });
        this.props.navigation.navigate('Login');
      }
    }
    if (nextProps.profileErrorStatus === 'FAILED') {
      Toast.show(nextProps.profileErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.getPostsErrorStatus === 'FAILED') {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
  }

  goToEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };

  goToPublicProfile = user => {
    this.props.navigation.navigate('PublicProfile', {
      publicUser: user,
    });
  };

  addAndUpdateWaterToPost = section => {
    const body = {
      postId: section._id,
    };
    this.props.updateWaterPost(body);
    if (this.props.updateWaterPostRequestStatus === 'SUCCESS') {
      const Id = this.props.user._id;
      this.props.getPosts(Id);
    }
  };

  renderTab = () => {
    const {
      allFollowers,
      allfollowings,
      allPosts,
      getPostsErrorStatus,
      getAllFollowersRequestStatus,
      getAllFollowersErrorStatus,
      getAllUserFollowingsRequestStatus,
      getAllUserFollowingsErrorStatus,
      getPostsRequestStatus,
      getSingleUserRequestStatus,
      allLikePost,
      user,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
    } = this.props;

    const localPost = [];
    allPosts &&
      allPosts.forEach(post => {
        const tagedPost = Object.assign({ isLike: true }, post);
        tagedPost.isLike = tagedPost.waters.indexOf(user._id) > -1;
        localPost.push(tagedPost);
      });

    if (this.state.activeFlag === 'liked') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allLikePost &&
            allLikePost.length > 0 &&
            allLikePost.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row  m20">
                  {p.postedBy.picture ? (
                    <Image
                      className="med_thumb m10"
                      source={{ uri: p.postedBy.picture }}
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
                <View className="f-column w-2-1">
                  <Text className="darkGrey bold large t-left">
                    {p.postedBy.userName}
                  </Text>
                  <View>
                    <Text className="lightGrey medium t-left">{p.text}</Text>
                  </View>
                </View>
              </View>
            ))}
          {allLikePost &&
            allLikePost.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
          {!allLikePost && (
            <View>
              <Text className="f-both lightGrey t-center bold medium">
                There is no liked posts
              </Text>
            </View>
          )}
        </View>
      );
    } else if (this.state.activeFlag === 'posted') {
      return (
        <View className="bg-transparent mt10 space-between">
          {localPost &&
            localPost.length > 0 &&
            localPost.map((p, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {p.postedBy.picture ? (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, p.postedBy)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={{ uri: p.postedBy.picture }}
                        resizeMode="cover"
                      />
                    </Touchable>
                  ) : (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, p.postedBy)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="cover"
                      />
                    </Touchable>
                  )}
                </View>
                <View className="f-column w-2-1 p5">
                  <Text className="darkGrey bold large t-left">
                    {p.postedBy.userName}
                  </Text>
                  <View>
                    <Text className="lightGrey medium t-left">{p.text}</Text>
                  </View>
                </View>
                <View className="f-row pull-right f-both m20">
                  {p.waters && p.waters.length > 0 ? (
                    <View className="f-row">
                      <View className="f-row">
                        <Touchable
                          className="touchableMin"
                          key={i}
                          onPress={this.addAndUpdateWaterToPost.bind(this, p)}
                        >
                          <View>
                            <Image
                              className="mini_thumb m15 "
                              source={
                                p.isLike
                                  ? require('../images/icons/Drop-Blue.png')
                                  : require('../images/icons/Drop-grey.png')
                              }
                              resizeMode="cover"
                            />
                          </View>
                        </Touchable>
                      </View>
                      <Text className=" mt15 marginLeft20 darkgrey bold medium t-center">
                        {' '}
                        {p.waters.length}
                      </Text>
                    </View>
                  ) : (
                    <View className="f-row">
                      <View className="f-row">
                        <Touchable
                          className="touchableMin"
                          key={i}
                          onPress={this.addAndUpdateWaterToPost.bind(this, p)}
                        >
                          <View>
                            <Image
                              className="mini_thumb m15"
                              source={
                                p.isLike
                                  ? require('../images/icons/Drop-Blue.png')
                                  : require('../images/icons/Drop-grey.png')
                              }
                              resizeMode="cover"
                            />
                          </View>
                        </Touchable>
                      </View>
                      <Text className=" mt15 marginLeft20 darkgrey bold medium t-center">
                        {' '}
                        {p.waters.length}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          {localPost &&
            localPost.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
          {!localPost && (
            <View>
              <Text className="f-both lightGrey t-center bold medium">
                There is no posts
              </Text>
            </View>
          )}
        </View>
      );
    } else if (this.state.activeFlag === 'followers') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allFollowers &&
            allFollowers.length > 0 &&
            allFollowers.map((user, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {user.picture ? (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, user)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={{ uri: user.picture }}
                        resizeMode="cover"
                      />
                    </Touchable>
                  ) : (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, user)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="cover"
                      />
                    </Touchable>
                  )}
                </View>
                <View className="f-column">
                  <Text className="darkGrey bold large t-left">
                    {user.userName}
                  </Text>
                  <Text className="lightGrey medium t-left">{user.email}</Text>
                </View>
              </View>
            ))}
          {allFollowers &&
            allFollowers.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
          {!allFollowers && (
            <View>
              <Text className="f-both lightGrey t-center bold medium">
                There is no followers
              </Text>
            </View>
          )}
        </View>
      );
    } else if (this.state.activeFlag === 'following') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allfollowings &&
            allfollowings.length > 0 &&
            allfollowings.map((user, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {user.picture ? (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, user)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={{ uri: user.picture }}
                        resizeMode="cover"
                      />
                    </Touchable>
                  ) : (
                    <Touchable
                      className="p5"
                      key={i}
                      onPress={this.goToPublicProfile.bind(this, user)}
                    >
                      <Image
                        className="med_thumb m10"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="cover"
                      />
                    </Touchable>
                  )}
                </View>
                <View className="f-column">
                  <Touchable
                    className="p5"
                    key={i}
                    onPress={this.goToPublicProfile.bind(this, user)}
                  >
                    <View className="f-column ">
                      <Text className="darkGrey bold large t-left">
                        {user.userName}
                      </Text>
                      <Text className="lightGrey medium t-left">
                        {user.email}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            ))}

          {allfollowings &&
            allfollowings.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
          {!allfollowings && (
            <View>
              <Text className="f-both lightGrey t-center bold medium">
                There is no followings
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  render() {
    const {
      profileRequestStatus,
      profileErrorStatus,
      getPostsErrorStatus,
      luser,
      user,
      token,
      allFollowers,
      allfollowings,
      getAllFollowersRequestStatus,
      getAllFollowersErrorStatus,
      getAllUserFollowingsRequestStatus,
      getAllUserFollowingsErrorStatus,
      getSingleUser,
      getSingleUserRequestStatus,
      getSingleUserErrorStatus,
      allLikePost,
      allPosts,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
    } = this.props;
    console.log(this.props);
    let fullAddress = '';

    if (this.props.luser && this.props.luser.address) {
      fullAddress = `${this.props.luser.address.city} ${
        this.props.luser.address.state
      } \n ${this.props.luser.address.country}`;
    }
    if (
      this.props.luser &&
      this.props.luser.address &&
      this.props.luser.address.zip
    ) {
      fullAddress = `${this.props.luser.address.city} ${
        this.props.luser.address.state
      }${this.props.luser.address.country} ${this.props.luser.address.zip}`;
    }

    const localPost = [];
    allPosts &&
      allPosts.forEach(post => {
        const tagedPost = Object.assign({ isLike: true }, post);
        tagedPost.isLike = tagedPost.waters.indexOf(user._id) > -1;
        localPost.push(tagedPost);
      });

    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header
            title="Profile"
            navigation={this.props.navigation}
            openRequest={this.goToEditProfile}
          />
          <View className="f-column">
            <View className="bg-transparent f-row mt10 space-between">
              <View className="mh15 f-row">
                <View>
                  {luser && luser.picture ? (
                    <Image
                      className="big_thumb"
                      source={{ uri: luser && luser.picture }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      className="big_thumb"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View className="mh25">
                  <Text className="darkGrey bold medium">
                    {luser &&
                      luser.firstName &&
                      `${luser.firstName}${' '}${luser.lastName}`}
                  </Text>
                  <Text className="lightGrey medium">
                    {luser && luser.userName && luser.userName}
                  </Text>
                  <Text className="lightGrey medium">
                    {luser && luser.address && fullAddress
                      ? fullAddress
                      : 'Address'}
                  </Text>
                </View>
              </View>
            </View>
            <View className="bg-transparent f-row mt10 space-between">
              <View className="mh25 mt10">
                <Text className="lightGrey medium">
                  {(luser && luser.bio) || 'Bio'}
                </Text>
              </View>
            </View>
            <View className="f-center mt10 f-column">
              <View className="bg-transparent mh25 f-both f-row mt10 space-between">
                <View className="f-center f-column">
                  <View className="badgeView" />
                  <Text className="mh10 darkGrey medium">Moderator</Text>
                </View>
                <View className=" f-center f-column">
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
          <View className="f-row mt10 p5">
            <View className="f-row h50 bg-header w-1-1 space-between">
              <View className="mh10 f-both p5">
                <Touchable
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.activeFlag === 'posted'
                        ? this.state.activeFlagBorderColor
                        : 'transparent',
                  }}
                  onPress={() => {
                    this.setState({ activeFlag: 'posted' });
                  }}
                >
                  <View>
                    <Text className="white medium">Posted</Text>
                  </View>
                </Touchable>
              </View>
              <View className="mh10 f-both p5">
                <Touchable
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.activeFlag === 'liked'
                        ? this.state.activeFlagBorderColor
                        : 'transparent',
                  }}
                  onPress={() => {
                    this.setState({
                      activeFlag: 'liked',
                    });
                  }}
                >
                  <View>
                    <Text className="white medium">Liked</Text>
                  </View>
                </Touchable>
              </View>
              <View className="mh10 f-both p5">
                <Touchable
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.activeFlag === 'followers'
                        ? this.state.activeFlagBorderColor
                        : 'transparent',
                  }}
                  onPress={() => {
                    this.setState({
                      activeFlag: 'followers',
                    });
                  }}
                >
                  <View>
                    <Text className="white medium">Followers</Text>
                  </View>
                </Touchable>
              </View>
              <View className="mh10 f-both p5">
                <Touchable
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.activeFlag === 'following'
                        ? this.state.activeFlagBorderColor
                        : 'transparent',
                  }}
                  onPress={() => {
                    this.setState({
                      activeFlag: 'following',
                    });
                  }}
                >
                  <View>
                    <Text className="white medium">Following</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          <ScrollView>{this.renderTab()}</ScrollView>
          <Footer navigation={this.props.navigation} />
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
    singleUser,
    getSingleUserRequestStatus,
    getSingleUserErrorStatus,
  } = state.loggedUser;
  const {
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
  } = state.post;

  const { user } = state.auth;
  const token = state.auth.authToken;
  const allLikePost = [];
  const {
    followers,
    followings,
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
    getAllUserFollowingsRequestStatus,
    getAllUserFollowingsErrorStatus,
  } = state.follow;
  const allFollowers = followers && followers.followers;
  const allfollowings = followings && followings.followings;
  const {
    getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
  } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts;

  allPosts &&
    user &&
    allPosts.length > 0 &&
    allPosts.forEach(p => {
      if (p.waters.length > 0) {
        p.waters.forEach(water => {
          if (water === user._id) {
            allLikePost.push(p);
          }
        });
      }
    });

  return {
    profileRequestStatus,
    profileErrorStatus,
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
    getAllUserFollowingsRequestStatus,
    getAllUserFollowingsErrorStatus,
    getPostsRequestStatus,
    getPostsErrorStatus,
    singleUser,
    getSingleUserRequestStatus,
    getSingleUserErrorStatus,
    luser,
    user,
    token,
    allPosts,
    allFollowers,
    allfollowings,
    allLikePost,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
  };
}

export default connect(mapStateToProps, {
  ...AuthActions,
  ...UserActions,
  ...FollowActions,
  ...PostActions,
})(Profile);
