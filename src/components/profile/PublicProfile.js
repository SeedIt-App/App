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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.followAnotherUserErrorStatus) {
      Toast.show(nextProps.followAnotherUserErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }

    if (nextProps.followAnotherUserRequestStatus === 'SUCCESS') {
      Toast.show(nextProps.followAnotherUserRequestStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }
    if (nextProps.getPostsRequestStatus === 'SUCCESS') {
      if (nextProps.allPosts && nextProps.allPosts.length > 0) {
        nextProps.allPosts.forEach(p => {
          if (p.waters.length > 0) {
            this.state.allLikePost.push(p.waters);
            if (this.state.allLikePost.length > 0) {
              this.state.allLikePost.forEach(p => {
                this.props.getSingleUser(p);
              });
            }
          }
        });
      }
    }
  }

  componentDidMount() {
    const email = this.state.UserData.email || this.state.UserData.userName;
    this.props.getPosts(email);
    this.props.getAllFollowers(email);
    this.props.getAllUserFollowings(email);
  }

  followAnotherUser = id => {
    this.props.followAnotherUser(id);
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
    } = this.props;

    if (this.state.activeFlag === 'liked') {
      return (
        <View>
          {singleUser &&
            singleUser.map((user, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {user.picture ? 
                    (<Image
                      className="med_thumb m10"
                      source={{uri : user.picture}}
                      resizeMode="cover"
                    />)
                    : (<Image
                      className="med_thumb m10"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />)
                  }
                </View>
                <View className="f-column">
                  <View className="f-column ">
                    <Text className="darkGrey bold large t-left">
                      {user.userName} 
                    </Text>
                    <Text className="lightGrey medium t-left">
                      {user.email}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          {singleUser === null && (
            <View>
              <Text className="f-both darkGrey t-center bold medium">
                There is no liked posts
              </Text>
            </View>
          )}
        </View>
      );
    } else if (this.state.activeFlag === 'posted') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length > 0 && 
            allPosts.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {p.postedBy && p.postedBy.picture ? 
                    (<Image
                      className="med_thumb m10"
                      source={{uri : p.postedBy.picture}}
                      resizeMode="cover"
                    />)
                    : (<Image
                      className="med_thumb m10"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />)
                  }
                </View>
                <View className="f-column w-2-1">
                  <Text className="darkGrey bold large t-left">
                    {p && p.postedBy && p.postedBy.userName}
                  </Text>
                  <View className="f-both">
                    <Text className="lightGrey medium t-left">{p.text}</Text>
                  </View>
                </View>
                <View className="f-row pull-right f-both m20">
                  <Image
                    className="normal_thumb m10"
                    source={require('../images/icons/drop.jpg')}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          {allPosts &&
            allPosts.length === 0 && (
              <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no posts
                </Text>
              </View>
            )}
        </View>
      );
    } else if (this.state.activeFlag === 'followers') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allFollowers && allFollowers.length > 0 &&
            allFollowers.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {p && p.picture ? 
                    (<Image
                      className="med_thumb m10"
                      source={{uri : p.picture}}
                      resizeMode="cover"
                    />)
                    : (<Image
                      className="med_thumb m10"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />)
                  }
                </View>
                <View className="f-column">
                  <View className="f-column ">
                    <Text className="darkGrey bold large t-left">
                      {p.userName} 
                    </Text>
                    <Text className="lightGrey medium t-left">
                      {p.email}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          {allFollowers &&
            allFollowers.length === 0 && (
              <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no followers
                </Text>
              </View>
            )}
        </View>
      );
    } else if (this.state.activeFlag === 'following') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allfollowings && allfollowings.length > 0 &&
            allfollowings.map(f => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  {f && f.picture ? 
                    (<Image
                      className="med_thumb m10"
                      source={{uri : f.picture}}
                      resizeMode="cover"
                    />)
                    : (<Image
                      className="med_thumb m10"
                      source={require('../images/icons/Login_Black.png')}
                      resizeMode="cover"
                    />)
                  }
                </View>
                <View className="f-column">
                  <View className="f-column ">
                    <Text className="darkGrey bold large t-left">
                      {f.userName} 
                    </Text>
                    <Text className="lightGrey medium t-left">
                      {f.email}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          {allfollowings &&
            allfollowings.length === 0 && (
              <View>
                <Text className="f-both darkGrey t-center bold medium">
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
    } = this.props;
    console.log(this.props);

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
                    {(this.state.UserData &&
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
                <Touchable
                  className="p5"
                  onPress={this.followAnotherUser.bind(
                    this,
                    this.state.UserData._id,
                  )}
                >
                  <Text className="blue bold large">Follow</Text>
                </Touchable>
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

  const {
    singleUser,
    getSingleUserRequestStatus,
    getSingleUserErrorStatus,
  } = state.loggedUser;

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
  };
}

export default connect(mapStateToProps, {
  ...AuthActions,
  ...UserActions,
  ...FollowActions,
  ...PostActions,
})(PublicProfile);
