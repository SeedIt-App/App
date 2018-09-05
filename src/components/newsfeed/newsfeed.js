import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Touchable, NewsFeedHeader, Image, Footer, ScrollView, Spinner, Colors} from '../common';
import { AuthActions, NewsFeedActions, PostActions } from '../../actions';
import { TextInput, ListView } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import NotificationHandler from '../notification/NotificationHandler';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class NewsFeed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      searchPosts: [],
    };
    this.updateWaterToPost = this.updateWaterToPost.bind(this);
  }

  componentDidMount() {
    this.props.userNewsFeed();
    this.props.guestUserNewsFeed();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.guestUserNewsFeedErrorStatus) {
      Toast.show(nextProps.guestUserNewsFeedErrorStatus,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor : '#bcf2c8',
        textColor : '#585858',
      });
    }
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  updateWaterToPost = value => {
    const body = {
      postId: value._id,
    };
    this.props.updateWaterPost(body);
  };

  searchPosts = searchedText => {
    const searchPosts =
      this.props.getAllNewsFeed &&
      this.props.getAllNewsFeed.filter((nf) => nf.text.toLowerCase().indexOf(searchedText.toLowerCase()) > -1);
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
                    {searchPosts.postedBy.picture ? 
                      (<Image
                        className="med_thumb m10"
                        source={{uri : searchPosts.postedBy.picture}}
                        resizeMode="cover"
                      />)
                      : (<Image
                        className="med_thumb m10"
                        source={require('../images/icons/Login_Black.png')}
                        resizeMode="cover"
                      />)
                    }
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
                          <Image
                            className="micro_thumb m5"
                            source={require('../images/icons/delete.jpg')}
                            resizeMode="cover"
                          />
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
                          searchPosts.images.map(v => (
                            (v !== 'image1.png' && v!== '') &&
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
                     {searchPosts.waters &&
                        searchPosts.waters.length > 0 &&
                        <View className="f-row">
                          <Image
                            className="normal_thumb m10"
                            source={require('../images/icons/drop.jpg')}
                            resizeMode="cover"
                          />
                        </View>  
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

  render() {
    const {
      user,
      getAllNewsFeed,
      userNewsFeedRequestStatus,
      userNewsFeedErrorStatus,
      guestUserNewsFeedErrorStatus,
      guestUserNewsFeedRequestStatus,
    } = this.props;
    return (
      <View className="screen">
        <NotificationHandler />
        <NewsFeedHeader
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
              textAlign: 'center'
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
            <View className="p3">
              <View className="f-column">
                <View className="bg-transparent space-between">
                  {userNewsFeedRequestStatus === 'SUCCESS' ||
                  guestUserNewsFeedRequestStatus === 'SUCCESS' ||
                  (getAllNewsFeed && getAllNewsFeed.length > 0) ? (
                    getAllNewsFeed.map((value, i) => (
                      <View className="f-row p5 mr10 j-start">
                        <View>
                          {value.postedBy.picture ? 
                            (<Image
                              className="med_thumb m10"
                              source={{uri : value.postedBy.picture}}
                              resizeMode="cover"
                            />)
                            : (<Image
                              className="med_thumb m10"
                              source={require('../images/icons/Login_Black.png')}
                              resizeMode="cover"
                            />)
                          }
                        </View>
                        <View className="f-column  w-2-1 ">
                          <Text className="darkGrey bold large t-left">
                            {value.postedBy.userName}
                          </Text>
                          <View className="f-column">
                            <Text className="lightGrey medium t-left">
                              {value.text}
                            </Text>
                            {this.state.user &&
                              this.state.user.role === 'admin' && (
                                <Image
                                  className="micro_thumb m5"
                                  source={require('../images/icons/delete.jpg')}
                                  resizeMode="cover"
                                />
                              )}
                          </View>

                          <View className="f-column">
                            <View className="f-row flex w-1-2 mr30">
                              {value.tags &&
                                value.tags.length > 0 &&
                                value.tags.map((v, i) => (
                                  <Text className="lgBlue bold medium t-left">
                                    {' '}
                                    #{v.tag}
                                  </Text>
                                ))}
                            </View>
                            <View className="f-row flex w-1-2 mr30">
                              {value.images &&
                                value.images.length > 0 &&
                                value.images.map(v => (
                                  (v !== 'image1.png' && v!== '') &&
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
                           {value.waters &&
                              value.waters.length > 0 &&
                              <View className="f-row">
                                <Image
                                  className="normal_thumb m10"
                                  source={require('../images/icons/drop.jpg')}
                                  resizeMode="cover"
                                />
                              </View>  
                            }
                        </View>
                        <View className="dividerGrey" />
                      </View>
                    ))
                  ) : (<View className="p15 mt30">
                        <Spinner large />
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
  let getAllNewsFeed = [];
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
