import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  NewsFeedHeader,
  Image,
  Footer,
  ScrollView,
  Spinner,
  Colors,
} from '../common';
import { AuthActions, NewsFeedActions, PostActions } from '../../actions';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';

class NewsFeed extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };

    this.updateWaterToPost = this.updateWaterToPost.bind(this) 

  }

  componentDidMount() {
    this.props.userNewsFeed();
    this.props.guestUserNewsFeed();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.guestUserNewsFeedErrorStatus) {
      Toast.show(nextProps.guestUserNewsFeedErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if (nextProps.userNewsFeedErrorStatus) {
      Toast.show(nextProps.userNewsFeedErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if (this.props.token === '') {
      if (nextProps.userNewsFeedErrorStatus === 'jwt expired') {
        Toast.show('Please login to get your newsFeed', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        this.props.navigation.navigate('Login');
      }
    }
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  updateWaterToPost = (value) => {
    const body = {
        postId: value._id
      };
    this.props.updateWaterPost(body);
  };

  render() {
    const {
      user,
      getAllNewsFeed,
      userNewsFeedRequestStatus,
      userNewsFeedErrorStatus,
      guestUserNewsFeedErrorStatus,
      guestUserNewsFeedRequestStatus
    } = this.props;
    return (
      <View className="screen">
        <NewsFeedHeader
          title="NewsFeed"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View class="p5">
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                {userNewsFeedRequestStatus === 'REQUESTING' 
                || guestUserNewsFeedRequestStatus === 'REQUESTING' &&
                  <View className="p15 mt30">
                    <Spinner large />
                  </View> }
                {userNewsFeedRequestStatus === 'SUCCESS' 
                || guestUserNewsFeedRequestStatus === 'SUCCESS' ||
                  getAllNewsFeed && getAllNewsFeed.length > 0 ? (
                  getAllNewsFeed.map((value, i) => (
                    <View className="f-row p5 mr20">
                      <View className="f-row f-both m20">
                        <Image
                          className="med_thumb m10"
                          source={require('../images/avatars/Abbott.png')}
                          resizeMode="cover"
                        />
                      </View>
                      <View className="f-column j-start w-2-1 mt10">
                        <Text className="black bold large t-left">{value.postedBy.userName}</Text>
                        <View className="f-row">
                          <Text className="black large t-left ">{value.text}</Text>
                          {this.state.user &&
                            this.state.user.role === 'admin' && (
                              <Image
                                className="micro_thumb m5"
                                source={require('../images/icons/delete.jpg')}
                                resizeMode="cover"
                              />
                            )}
                        </View>
                      </View>
                      <View className="f-row pull-right f-both m20">
                         <Touchable className="p5" key={i} onPress={this.updateWaterToPost.bind(this, value)}>
                          <Image
                            className="normal_thumb m10"
                            source={require('../images/icons/drop.jpg')}
                            resizeMode="cover"
                          />
                        </Touchable>  
                      </View>
                      <View className="dividerGrey" />
                      <View className="dividerGrey" />
                    </View>
                  ))  
                ) : (
                    null
                )}
                <View className="dividerGrey" />
                <View className="dividerGrey" />
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
    userNewsFeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
    guestUserNewsFeed,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
  } = state.newsFeed;
  let getAllNewsFeed = null;
  if (userNewsFeed && userNewsFeed.records.length > 0 && token) {
    getAllNewsFeed = userNewsFeed.records;
  } else if (guestUserNewsFeed && guestUserNewsFeed.records.length > 0) {
    getAllNewsFeed = guestUserNewsFeed.records;
  }
  return {
    token,
    user,
    getAllNewsFeed,
    userNewsFeedRequestStatus,
    userNewsFeedErrorStatus,
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...NewsFeedActions,
  ...PostActions,
})(NewsFeed);
