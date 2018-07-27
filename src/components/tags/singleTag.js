import React from 'react';
import { connect } from 'react-redux';
import {Text, View, Touchable, Header, Image, Footer, ScrollView,Spinner} from '../common';
import { AuthActions, FollowActions, PostActions } from '../../actions';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import Modal from 'react-native-modal';

class SingleTag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      modalVisible: false,
      currentTagData : this.props.navigation.state.params.tagData,
      goggleData : null
    };
    this.updateWaterToPost = this.updateWaterToPost.bind(this);
    AsyncStorage.getItem("res").then((value) => {
      if(value){
        let data = JSON.parse(value);
        this.setState({goggleData : data.user})
        console.log(data)
      }
    }).done();
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.goggleData === null){
      if (nextProps.token === null){
        Toast.show('Please login', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        this.props.navigation.navigate('Login');
      } 
    }  
    if (nextProps.getPostsErrorStatus === 'FAILED') {
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
    if (nextProps.updateWaterPostRequestStatus === 'SUCCESS') {
      Toast.show(nextProps.updateWaterToPost, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
    if (nextProps.updateWaterPostErrorStatus === 'FAILED') {
      Toast.show(nextProps.updateWaterPostErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  goToAddComment = (section) => {
    console.log(section)
    this.props.navigation.navigate('CreateComment', {
      postData: section
    });
  };

  updateWaterToPost = (section) => {
    const body = {
      postId: section._id
    };
    this.props.updateWaterPost(body);
  };

  modelVisibleToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  renderHeader = (section , i) => (
    <NativeView>
      <View className="f-row p5 mr20">
        <View className="f-row f-both m20">
          {section.postedBy.picture ? 
            (<Image
              className="med_thumb m10"
              source={{uri : section.postedBy.picture}}
              resizeMode="cover"
            />)
            : (<Image
              className="med_thumb m10"
              source={require('../images/icons/Login_Black.png')}
              resizeMode="cover"
            />)
          }
        </View>
        <View className="f-column j-start mt10 w-2-1">
          <Text className="black bold large t-left ">{section.postedBy.userName}</Text>
          <View className="f-column">
            <Text className="black large t-left">{section.text}</Text>
          </View>
          <View className="f-row ">
            <Text className="lgBlue bold large t-left">{" "}#{this.state.currentTagData.tag}</Text>
          </View>
          <View className="f-row flex w-1-2">
            {section.images &&
              section.images.length > 0 &&
              section.images[0] !== 'image1.png' &&
              section.images.map(v => (
                <Image
                  className="x_l_thumb m5"
                  source={{ uri: section.images[0] }}
                  resizeMode="cover"
                />
              ))}
          </View>  
            {this.state.user &&
              this.state.user.role === 'admin' && (
                <Image
                  className="micro_thumb m5"
                  source={require('../images/icons/delete.jpg')}
                  resizeMode="cover"
                />
            )}
        </View>
        <View className="f-row pull-right f-both m20">
          <Touchable className="p5" key={i} onPress={this.updateWaterToPost.bind(this, section)}>
            <Image
              className="normal_thumb m10"
              source={require('../images/icons/drop.jpg')}
              resizeMode="cover"
            />
          </Touchable>  
        </View>
        <View className="dividerGrey" />
      </View>
    </NativeView>
  );

  renderContent = (section, i) => (
    <View className="f-row p5 mr20" >
      <View className=" f-row f-both space-between w-1-1">
        <View className="f-row">
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
                  backdropOpacity={0.1}
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
        <View className="f-row mb5">
          <View slassName="mb10">
            <Touchable
              className="p5"
              key={i}
              onPress={this.goToAddComment.bind(this, section)}
            >
              <Image
                className="micro m10"
                source={require('../images/icons/cm.png')}
                resizeMode="cover"
              />
            </Touchable>
          </View>
          <View className="marginTop10">
            {section.comments &&
              section.comments.length > 0 && (
                <Text className="mt20 darkgrey bold small t-center">
                  {' '}
                  ({section.comments.length} )
                </Text>
              )}
          </View>
        </View>
        <View className="marginTop15">
          <Touchable className="p5" key={i} onPress={this.updateWaterToPost.bind(this, section)}>
            <Image
              className="normal_thumb m10 mb20"
              source={require('../images/icons/drop_grey.png')}
              resizeMode="cover"
            />
          </Touchable>
        </View>
      </View>
    </View>
  );

  render() {
    const {
      user,
      followers,
      allPosts,
      getAllFollowersErrorStatus,
      getAllFollowersRequestStatus,
      getPostsRequestStatus,
      getPostsErrorStatus,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
      updateWaterToPost,
    } = this.props;
    const { props } = this;

    const allPostsData = [];
    if(allPosts){
      allPosts.forEach(p => {
        p.tags.forEach(t => {
          if(this.state.currentTagData.tag === t.tag ){
            allPostsData.push(p)
          }
        })
      })
    }

    return (
      <View className="screen">
        <Header
          title={ '#'+ this.state.currentTagData.tag}
          back navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                {allPostsData &&
                  allPostsData.length > 0 && (
                    <Accordion
                      sections={allPostsData}
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
                    allPostsData &&
                    allPostsData.length === 0 && (
                    <View className="flex f-both p10">
                      <Text className="black bold">There are no tags.</Text>
                    </View>
                  )}
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
    followers,
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
  } = state.follow;
  const {
    getAllPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
    updateWaterToPost,
  } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts;

  return {
    token,
    user,
    followers,
    getAllFollowersRequestStatus,
    getAllFollowersErrorStatus,
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
    updateWaterToPost,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...FollowActions,
  ...PostActions,
})(SingleTag);
