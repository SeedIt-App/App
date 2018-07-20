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
import {    TextInput,
ListView } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class NewsFeed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      searchPosts: []
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

  searchPosts = (searchedText) => {
    var searchPosts =  this.props.getAllNewsFeed && this.props.getAllNewsFeed.filter(function(nf) {
      return nf.text.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({searchPosts: searchPosts});
  };

  renderAdress = (searchPosts, i) => {
     const {
      user
    } = this.props;
    return (
      <ScrollView>
        <View class="p5">
          <View className="f-column">
            <View className="bg-transparent mt10 space-between">
              <View className="f-row p5 mr20">
                <View className="f-row f-both m20">
                  <Image
                    className="med_thumb m10"
                    source={require('../images/avatars/Abbott.png')}
                    resizeMode="cover"
                  />
                </View>
                <View className="f-column j-start w-2-1 mt10">
                  <Text className="black bold large t-left">{searchPosts.postedBy.userName}</Text>
                  <View className="f-column">
                    <Text className="black large t-left">{searchPosts.text}</Text>
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
                    { 
                      searchPosts.tags && searchPosts.tags.length > 0 &&
                        searchPosts.tags.map(t => (
                          <View className="f-row flex w-1-2 mr30">
                            <Text className="lgBlue bold large t-left">{" "}#{t.tag}</Text>
                          </View>
                        ))
                    }
                    { searchPosts.images && searchPosts.images.length > 0 && searchPosts.images[0] !== 'image1.png' &&
                        searchPosts.images.map(value => (
                          <View className="f-row flex w-1-2 mr30">
                            <Image
                              className="x_l_thumb m5"
                              source={{uri : value}}
                              resizeMode="cover"
                            />
                          </View>
                        ))
                    }
                  </View>  
                </View>
                <View className="f-row pull-right f-both m20">
                   <Touchable className="p5" key={i} onPress={this.updateWaterToPost.bind(this, searchPosts)}>
                    <Image
                      className="normal_thumb m10"
                      source={require('../images/icons/drop.jpg')}
                      resizeMode="cover"
                    />
                  </Touchable>  
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

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
        <View className="shadowBox w-1-1">
          <TextInput
            style = {{
              height : 35,
              backgroundColor : Colors.white,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'center'}}
            placeholder="Search"
            placeholderTextColor="grey"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={this.searchPosts}
          />
        </View>  
          <ListView
            dataSource={ds.cloneWithRows(this.state.searchPosts)}
            renderRow={this.renderAdress} 
          />
         {this.state.searchPosts.length === 0 &&
           <ScrollView>
          <View class="p5">
          <View className="f-column">
            <View className="bg-transparent mt10 space-between">
              { userNewsFeedRequestStatus === 'REQUESTING' 
                || guestUserNewsFeedRequestStatus === 'REQUESTING' &&
                <View className="p15 mt30">
                  <Spinner large />
                </View> }
              { userNewsFeedRequestStatus === 'SUCCESS' 
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
                      <View className="f-column">
                        <Text className="black large t-left">{value.text}</Text>
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
                          { value.tags && value.tags.length > 0 &&
                            value.tags.map((v,i) => (
                              <Text className="lgBlue bold large t-left">{" "}#{v.tag}</Text>
                            ))
                          }
                        </View>
                        <View className="f-row flex w-1-2 mr30">
                          { value.images && value.images.length > 0 && value.images[0] !== 'image1.png' &&
                            value.images.map(v => (
                              <Image
                                className="x_l_thumb m5"
                                source={{uri : v}}
                                resizeMode="cover"
                              />
                            ))
                          }
                        </View>  
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
                  </View>
                ))  
              ) : (
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
         }
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
    console.log(userNewsFeed.records , 'userNewsFeed********************')
  } else if (guestUserNewsFeed && guestUserNewsFeed.records.length > 0) {
    getAllNewsFeed = guestUserNewsFeed.records;
    console.log(guestUserNewsFeed.records , 'guestUserNewsFeed********************')
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
