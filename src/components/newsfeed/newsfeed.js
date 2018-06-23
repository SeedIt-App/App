import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Image,
  Footer,
  ScrollView
} from '../common';
import { AuthActions, NewsFeedActions,PostActions} from '../../actions';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';

class NewsFeed extends React.PureComponent {
  constructor(props){
    super(props)

    this.state = {
      user : this.props.user
    }
  }

  componentDidMount() {
    this.props.userNewsFeed();
    this.props.guestUserNewsFeed();
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllFollowersErrorStatus) {
      Toast.show(nextProps.getAllFollowersErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if (nextProps.getPostsErrorStatus) {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  }
  
  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  goToAddComment = () => {
    this.props.navigation.navigate('CreateComment');
  };

  renderHeader = section => (
    <NativeView>
      <View className="f-row p5 mr20">
        <View className="f-row f-both m20">
          <Image
            className="med_thumb m10"
            source={require('../images/avatars/Abbott.png')}
            resizeMode="cover"
          />
        </View>
        <View className="f-column j-start mt10">
          <View className="f-row">
            <Text className="black bold large t-center">
              {section.text}
            </Text>
            {this.state.user &&
              this.state.user.role === 'admin' && (
                <Image
                  className="micro_thumb m5"
                  source={require('../images/icons/delete.jpg')}
                  resizeMode="cover"
                />
              )
            }
          </View>
        </View>
        <View className="f-row pull-right f-both m20">
          <Image
            className="normal_thumb m10"
            source={require('../images/icons/drop.jpg')}
            resizeMode="cover"
          />
        </View>
        <View className="dividerGrey" />
        <View className="dividerGrey" />
      </View>  
    </NativeView>
  );

  renderContent = section => (
    <View >
      <View className="f-row p5 mr20">
        <View className=" f-row space-between w-1-1">
          <View>
            <Image
              className="micro1_thumb m10"
              source={require('../images/icons/share.png')}
              resizeMode="cover"
            />
          </View>
          <View>
            <Touchable className="p5" onPress={this.goToAddComment}>
              <Image
                className="micro m10"
                source={require('../images/icons/cm.png')}
                resizeMode="cover"
              />
            </Touchable>  
          </View> 
          <View>
            <Image
              className="normal_thumb m10 mb25"
              source={require('../images/icons/drop_grey.png')}
              resizeMode="cover"
            />
          </View>  
        </View>
      </View>
    </View>
  );

  render() {
    const { user ,getAllNewsFeed, allPosts, 
      getAllFollowersErrorStatus, 
      getAllFollowersRequestStatus } = this.props;
      const { props } = this;
    return (
      <View className="screen">
        <Header title="NewsFeed" navigation={this.props.navigation} 
          createPostRequest={this.goToCreatePost}
          />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
              {getAllNewsFeed && getAllNewsFeed.length  > 0 ? 
                <Accordion
                  sections={allPosts}
                  renderHeader={this.renderHeader}
                  renderContent={this.renderContent}
                  underlayColor="transparent"
                /> 
              : <View>
                <Text className="black bold large t-center">
                  There is no newsFeed !!
                </Text>
              </View>
              }
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
  const { userNewsFeed ,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
    guestUserNewsFeed,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus } = state.newsFeed;
  const { getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts; 
  let getAllNewsFeed = null;
  if(userNewsFeed && userNewsFeed.length > 0 && token){
    getAllNewsFeed = userNewsFeed.records
  }
  else if(guestUserNewsFeed && guestUserNewsFeed.length > 0){
    getAllNewsFeed = guestUserNewsFeed.records
  }
  return {
    token,
    user,
    getAllNewsFeed,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus
  };
}
export default connect(mapStateToProps, { ...AuthActions,...NewsFeedActions, ...PostActions })(NewsFeed);
