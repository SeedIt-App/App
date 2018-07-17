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

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: 'posted',
      activeFlagBorderColor: 'white',
      activeFlagTextColor: '#3CCDFD',
      allLikePost : []
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.profileErrorStatus === 'jwt expired' 
      || nextProps.profileErrorStatus === 'jwt malformed') {
      Toast.show('Please login to get your profile', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      this.props.navigation.navigate('Login');
    }
    else {
      Toast.show(nextProps.profileErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if (nextProps.getPostsErrorStatus === 'jwt expired' 
      || nextProps.getPostsErrorStatus === 'jwt malformed') {
      Toast.show('Please login to get your profile', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      this.props.navigation.navigate('Login');
    }
    else {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if(nextProps.getPostsRequestStatus ==='SUCCESS'){
     if(nextProps.allPosts && nextProps.allPosts.length > 0){
        nextProps.allPosts.forEach(p => {
          if(p.waters.length > 0){
            this.state.allLikePost.push(p.waters);
            if(this.state.allLikePost.length > 0){
              this.state.allLikePost.forEach(p => {
                this.props.getSingleUser(p)
              })
            }
          }
        });
      } 
    }
  }

  componentDidMount() {
    this.props.profile();
    this.props.getPosts();
    this.props.getAllFollowers();
    this.props.getAllUserFollowings();
  }

  goToEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };

  goToPublicProfile = (user) => {
    this.props.navigation.navigate('PublicProfile', {
      publicUser: user
    });
  }

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
      singleUser,
      getSingleUserRequestStatus,
    } = this.props;

    if (this.state.activeFlag === 'liked') {
      return (
        <View className="bg-transparent mt10 space-between">
          {singleUser &&
            singleUser.map((user , i ) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  <Image
                    className="med_thumb m10"
                    source={require('../images/avatars/Abbott.png')}
                    resizeMode="cover"
                  />
                </View>
                <View className="f-column mt10">
                  <Touchable className="p5" key={i} onPress={this.goToPublicProfile.bind(this, user)}>
                    <View className="f-both">
                      <Text className="black large t-left">
                        {user.userName} {"\n"} {user.email}
                      </Text>
                    </View>
                  </Touchable>  
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
            {
              singleUser === null && 
             ( <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no liked posts
                </Text>
              </View> )   
            }
        </View>
      );
    } else if (this.state.activeFlag === 'posted') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length > 0 && 
            allPosts.map(p => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  <Image
                    className="med_thumb m10"
                    source={require('../images/avatars/Abbott.png')}
                    resizeMode="cover"
                  />
                </View>
                <View className="f-column w-2-1 mt10">
                  <View className="f-both">
                    <Text className="black large t-left">
                      {p.text} 
                    </Text>
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
             {allPosts && allPosts.length === 0 && 
             ( <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no followers
                </Text>
              </View> )   
            }
        </View>
      );
    } else if (this.state.activeFlag === 'followers') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allFollowers && allFollowers.length > 0 &&
            allFollowers.map((user, i) => (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  <Image
                    className="med_thumb m10"
                    source={require('../images/avatars/Abbott.png')}
                    resizeMode="cover"
                  />
                </View>
                <View className="f-column  mt10">
                  <Touchable className="p5" key={i} onPress={this.goToPublicProfile.bind(this, user)}>
                    <View className="f-both">
                      <Text className="black large t-left">
                        {user.userName} {"\n"} {user.email}
                      </Text>
                    </View>
                  </Touchable> 
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
            {allFollowers && allFollowers.length === 0 && 
             ( <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no followers
                </Text>
              </View> )   
            }
        </View>
      );
    } else if (this.state.activeFlag === 'following') {
      return (
        <View className="bg-transparent mt10 space-between">
          {allfollowings && allfollowings.length > 0 &&
            allfollowings.map((user, i )=> (
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  <Image
                    className="med_thumb m10"
                    source={require('../images/avatars/Abbott.png')}
                    resizeMode="cover"
                  />
                </View>
                <View className="f-column mt10">
                  <Touchable className="p5" key={i} onPress={this.goToPublicProfile.bind(this, user)}>
                    <View className="f-both">
                      <Text className="black large t-left">
                        {user.userName} {"\n"} {user.email}
                      </Text>
                    </View>
                  </Touchable>  
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
            {allfollowings && allfollowings.length === 0 && 
             ( <View>
                <Text className="f-both darkGrey t-center bold medium">
                  There is no followers
                </Text>
              </View> )   
            }
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
    } = this.props;
    console.log(this.props);
    let fullAddress = '';

    if (this.props.luser && this.props.luser.address) {
      fullAddress =
        `${idx(this.props.luser.address, _ => _.city)
        }${'' + ' '}${this.props.luser.address.state}` +
        `${'' + '\n '}${this.props.luser.address.country}` +
        `${'' + ' '}${this.props.luser.address.zip}` +
        '';
    }

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
                  <Image
                    className="med_thumb_view"
                    source={require('../images/icons/user.png')}
                  />
                </View>
                <View className="mh25">
                  <Text className="darkGrey bold medium">
                    {(luser &&
                      luser.firstName &&
                      `${luser.firstName} ${luser.lastName}`) ||
                      'Full Name'}
                  </Text>
                  <Text className="darkGrey medium">
                    {(luser && luser.userName && luser.userName) || 'UserName'}
                  </Text>
                  <Text className="darkGrey medium">
                    {luser && luser.address && fullAddress === 'undefined'
                      ? 'Address'
                      : 'Address'}
                  </Text>
                </View>
              </View>
            </View>
            <View className="bg-transparent f-row mt10 space-between">
              <View className="mh25 mt10">
                <Text className="darkGrey medium">
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
            <View className="f-row bg-header w-1-1 space-between">
              <View className="mh10 p5">
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
              <View className="mh10 p5">
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
              <View className="mh10 p5">
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
              <View className="mh10 p5">
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
  const { profileRequestStatus, profileErrorStatus, luser,
    singleUser, getSingleUserRequestStatus, getSingleUserErrorStatus } = state.loggedUser;
  const { user } = state.auth;
  const token = state.auth.authToken;

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
  };
}

export default connect(mapStateToProps, {
  ...AuthActions,
  ...UserActions,
  ...FollowActions,
  ...PostActions,
})(Profile);
