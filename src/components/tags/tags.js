import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Image,
  Footer,
  ScrollView,
  Spinner,
  Colors,
  SelectInput,
  Overlay,
} from '../common';
import { AuthActions, PostActions } from '../../actions';
import { TextInput} from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import Modal from "react-native-modal";

class Tags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      modalVisible: false,
    };
    this.updateWaterToPost = this.updateWaterToPost.bind(this) 
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getPostsErrorStatus === "jwt expired" || nextProps.getPostsErrorStatus === "jwt malformed") {
      Toast.show("Please login to get your tags", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
      this.props.navigation.navigate("Login");
    }
    if(nextProps.getPostsErrorStatus ){
      Toast.show(nextProps.getPostsErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if(nextProps.updateWaterPostRequestStatus ==='SUCCESS'){
      Toast.show(nextProps.updateWaterToPost, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if(nextProps.updateWaterPostErrorStatus){
      Toast.show(nextProps.updateWaterPostErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
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

  updateWaterToPost = (value) => {
    const body = {
        postId: value._id
      };
    this.props.updateWaterPost(body);
  };

  goToSingleTag = (value) => {
    console.log(value)
    this.props.navigation.navigate('SingleTag', {
      tagData: value
    });
  };

  modelVisibleToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  renderHeader = (section , i) => (
    <NativeView>
      <View className="f-row p5 mr20">
        <View className="f-row f-both m20">
          <Image
            className="med_thumb m10"
            source={require('../images/avatars/Abbott.png')}
            resizeMode="cover"
          />
        </View>
        <View className="f-column j-start mt10 w-2-1">
          <Text className="black bold large t-left ">{section.postedBy.userName}</Text>
          <View className="f-column">
            <Text className="black large t-left">{section.text}</Text>
          </View>
          <View className="f-column">
            <View className="f-row flexWrap">
              { section.tags && section.tags.length > 0 &&
                section.tags.map((value,i) => (
                  <Touchable className="touchableMin" key={i} onPress={this.goToSingleTag.bind(this, value)}>
                    <Text className="lgBlue bold large t-left">{" "}#{value.tag}</Text>
                  </Touchable>   
                ))
              }
            </View>
          </View>
          <View className="f-row flex w-1-2">
            { section.images && section.images.length > 0 && section.images[0] !== 'image1.png' &&
            section.images.map(v => (
              <Image
                className="x_l_thumb m5" 
                source={{uri : section.images[0]}}
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
        <View className="f-row" >
          <View>
            <Touchable onPress={this.modelVisibleToggle}>
              <View className="mb5">
                <Image
                  className="micro1_thumb m10"
                  source={require('../images/icons/share.png')}
                  resizeMode="cover"
                />
                <Modal isVisible={this.state.modalVisible}
                  backdropColor={"grey"}
                  backdropOpacity={.1}>
                  <View className="overlay f-column f-both">
                    <View className=" f-row f-both m10">
                      <Text className="lgBlue bold large_sm t-center">Share on Facebook</Text>
                    </View>
                    <View className="dividerGrey" />
                    <View className=" f-row f-both m10">
                      <Text className="lgBlue bold large_sm t-center">Share on Twitter</Text>
                    </View>  
                  </View>
                  <View className="overlayCancel">
                    <View className="wh-1-1 f-row f-both m10">
                      <Touchable className="p5" onPress={this.modelVisibleToggle}>
                        <Text className="lgBlue bold large_sm t-center">Cancel</Text>
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
            <Touchable className="p5" key={i} onPress={this.goToAddComment.bind(this, section)}>
              <Image
                className="micro m10"
                source={require('../images/icons/cm.png')}
                resizeMode="cover"
              />
            </Touchable>
          </View>
          <View className="marginTop10">  
            { section.comments && section.comments.length > 0 &&
              (<Text className="mt20 darkgrey bold small t-center"> ({section.comments.length} )</Text>)
            }
          </View>
        </View>  
        <View className="marginTop15">
          <Touchable className="p5" key={i} onPress={this.updateWaterToPost.bind(this, section)}>
            <Image
              className="normal_thumb m10"
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
      allPosts,
      getPostsRequestStatus,
      getPostsErrorStatus,
      updateWaterPostRequestStatus,
      updateWaterPostErrorStatus,
      updateWaterToPost,
    } = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header
          title="Tags"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                {allPosts &&
                  allPosts.length > 0 && (
                    <Accordion
                      sections={allPosts}
                      renderHeader={this.renderHeader}
                      renderContent={this.renderContent}
                      underlayColor="transparent"
                    />
                  )}
                  { getPostsRequestStatus === 'REQUESTING' &&
                    <View className="p15 mt30">
                      <Spinner large />
                    </View> }
                  {getPostsRequestStatus === 'SUCCESS' &&
                    allPosts && allPosts.length === 0 && (
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
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus,
    updateWaterPostRequestStatus,
    updateWaterPostErrorStatus,
    updateWaterToPost
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...PostActions,
})(Tags);
