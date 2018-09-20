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
  Footer,Spinner,
  ScrollView,
} from '../common';
import { TextInput } from 'react-native';
import {
  AuthActions,
  UserActions,
  FollowActions,
  PostActions,
} from '../../actions';
import Toast from 'react-native-root-toast';

class PublicProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: 'posted',
      activeFlagBorderColor: 'white',
      activeFlagTextColor: '#3CCDFD',
      UserData: this.props.navigation.state.params.publicUser,
    };
    this.followAnotherUser = this.followAnotherUser.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.followAnotherUserErrorStatus === 'FAILED') {
      Toast.show('You are already following',{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
    if (nextProps.followAnotherUserRequestStatus === 'SUCCESS') {
      Toast.show('Successfully followed the user', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor : '#f6ffff',
        shadow: false,
        textColor: '#585858',
      });
    }
  }

  componentDidMount() {
    let Id = this.state.UserData._id 
    this.props.getPosts(Id);
    email = this.state.UserData.email || this.state.UserData.userName;
    this.props.getAllFollowers(email);
    this.props.getAllUserFollowings(email);
  }

  followAnotherUser = id => {
    this.props.followAnotherUser(id);
  };

  addAndUpdateWaterToPost = section => {
    const body = {
      postId: section._id,
    };
    this.props.updateWaterPost(body);
    if(this.props.updateWaterPostRequestStatus === 'SUCCESS'){
      let Id = this.state.UserData._id 
      this.props.getPosts(Id);
    }
  };

  renderTab = () => {
    const {
      allFollowers,
      allfollowings,
      allPosts,
      getAllFollowersRequestStatus,
      getAllFollowersErrorStatus,
      getAllUserFollowingsRequestStatus,
      getAllUserFollowingsErrorStatus,
      followAnotherUserRequestStatus,
      followAnotherUserErrorStatus,
      singleUser,
      getSingleUserRequestStatus,
      getSingleUserErrorStatus,
      allLikePost,
      user,
      updateWaterPostRequestStatus
    } = this.props;

    let localPost = [];
    allPosts && user && allPosts.forEach(function(post){
      let tagedPost = Object.assign({isLike : true}, post);
       tagedPost.isLike =  tagedPost.waters.indexOf(user._id) > -1
      localPost.push(tagedPost)
    })


    if (this.state.activeFlag === 'liked') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allLikePost &&
            allLikePost.length > 0 &&
            allLikePost.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
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
                  <View >
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
          {allPosts &&
            allPosts.length > 0 &&
            allPosts.map((p, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {p.postedBy && p.postedBy.picture ? (
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
                    {p && p.postedBy && p.postedBy.userName}
                  </Text>
                  <View>
                    <Text className="lightGrey medium t-left">{p.text}</Text>
                  </View>
                </View>
                <View className="f-row pull-right f-both m20">
                  {p.waters && p.waters.length > 0 ? (
                    <View className="f-row">
                      {
                        <View className="f-row">
                          <Touchable
                            className="touchableMin"
                            key={i}
                            onPress={this.addAndUpdateWaterToPost.bind(this, p)}
                          >
                            <Image
                              className="mini_thumb m15"
                              source={
                                p.isLike
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
                        {p.waters.length}
                      </Text>
                    </View>
                  ) : (
                    <View className="f-row">
                      {
                        <View className="f-row">
                          <Touchable
                            className="touchableMin"
                            key={i}
                            onPress={this.addAndUpdateWaterToPost.bind(this, p)}
                          >
                            <Image
                              className="mini_thumb m15"
                              source={
                                p.isLike
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
                        {p.waters.length}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {allPosts && 
              allPosts.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
            {!allPosts && (
              <View>
                <Text className="f-both lightGrey t-center bold medium">
                  There is no liked posts
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
            allFollowers.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {p && p.picture ? (
                    <Image
                      className="med_thumb m10"
                      source={{ uri: p.picture }}
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
                <View className="f-column">
                  <View className="f-column ">
                    <Text className="darkGrey bold large t-left">
                      {p.userName}
                    </Text>
                    <Text className="lightGrey medium t-left">{p.email}</Text>
                  </View>
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
                  There is no liked posts
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
            allfollowings.map(f => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {f && f.picture ? (
                    <Image
                      className="med_thumb m10"
                      source={{ uri: f.picture }}
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
                <View className="f-column">
                  <View className="f-column ">
                    <Text className="darkGrey bold large t-left">
                      {f.userName}
                    </Text>
                    <Text className="lightGrey medium t-left">{f.email}</Text>
                  </View>
                </View>
              </View>
            ))}

            {allfollowings.length === 0 && (
              <View>
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              </View>
            )}
            {!allfollowings && (
              <View>
                <Text className="f-both lightGrey t-center bold medium">
                  There is no liked posts
                </Text>
              </View>
            )}
        </View>
      );
    }
  };

  render() {
    const {
      user,
      allFollowers,
      allfollowings,
      getAllFollowersRequestStatus,
      getAllFollowersErrorStatus,
      getAllUserFollowingsRequestStatus,
      getAllUserFollowingsErrorStatus,
      followAnotherUserRequestStatus,
      followAnotherUserErrorStatus,
      singleUser,
      getSingleUserRequestStatus,
      getSingleUserErrorStatus,
      allLikePost,
      allPosts,
      updateWaterPostRequestStatus,
    } = this.props;
    console.log(this.props);

    const localPost = [];
    allPosts &&
      allPosts.forEach((post) => {
        const tagedPost = Object.assign({ isLike: true }, post);
        tagedPost.isLike = tagedPost.waters.indexOf(user._id) > -1;
        localPost.push(tagedPost);
      });

    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header title="Public Profile" navigation={this.props.navigation} />
          <View className="f-column">
            <View className="bg-transparent f-row mt10 space-between">
              <View className="mh15 f-row">
                <View>
                  {this.state.UserData && this.state.UserData.picture ? (
                    <Image
                      className="big_thumb"
                      source={{ uri: this.state.UserData.picture }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      className="big_thumb"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="stretch"
                    />
                  )}
                </View>
                <View className="mh25">
                  <Text className="darkGrey bold medium">
                    {(this.state.UserData && this.state.UserData.firstName &&
                      `${this.state.UserData.firstName} ${
                        this.state.UserData.lastName
                      }`) ||
                      'Full Name'}
                  </Text>
                  <Text className="darkGrey medium">
                    {(this.state.UserData && this.state.UserData.userName) ||
                      'UserName'}
                  </Text>
                  <Text className="darkGrey medium">
                    {(this.state.UserData &&
                      this.state.UserData.address &&
                      this.state.UserData.address.city) ||
                      'Address'}
                  </Text>
                </View>
              </View>
              <View className=" mt10">
              {
                this.props.followAnotherUserRequestStatus !== 'FAILED' &&
                <Touchable
                  className="p5"
                  onPress={this.followAnotherUser(this.state.UserData._id)}
                >
                  <Text className="blue bold large">Follow</Text>
                </Touchable>
              }
              </View>
            </View>
            <View className="bg-transparent f-row mt10 space-between">
              <View className="mh25 mt10">
                <Text className="darkGrey medium">
                  {(this.state.UserData && this.state.UserData.bio) || 'Bio'}
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
            <View className="f-row bg-header h50 w-1-1 space-between">
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
                  <Text className="white medium">Posted</Text>
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
                  <Text className="white medium">Liked</Text>
                </Touchable>
              </View>
              <View className="mh10  f-both p5">
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
                  <Text className="white medium">Followers</Text>
                </Touchable>
              </View>
              <View className="mh10 f-both  p5">
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
                  <Text className="white medium">Following</Text>
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
  const { user } = state.auth;
  let allLikePost = [];
  const {
    followers,
    followings,
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
    getAllUserFollowingsRequestStatus,
    getAllUserFollowingsErrorStatus,
    followAnotherUserRequestStatus,
    followAnotherUserErrorStatus,
  } = state.follow;
  const allFollowers = followers && followers.followers;
  const allfollowings = followings && followings.followings;
  const {
    getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
  } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts;
  const {updateWaterPostRequestStatus} = state.post;
  const {
    singleUser,
    getSingleUserRequestStatus,
    getSingleUserErrorStatus,
  } = state.loggedUser;

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
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
    getAllUserFollowingsRequestStatus,
    getAllUserFollowingsErrorStatus,
    followAnotherUserRequestStatus,
    followAnotherUserErrorStatus,
    user,
    allPosts,
    allFollowers,
    allfollowings,
    singleUser,
    getSingleUserRequestStatus,
    getSingleUserErrorStatus,
    allLikePost,
    updateWaterPostRequestStatus
  };
}

export default connect(mapStateToProps, {
  ...AuthActions,
  ...UserActions,
  ...FollowActions,
  ...PostActions,
})(PublicProfile);
