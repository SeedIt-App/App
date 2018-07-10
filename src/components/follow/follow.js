import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Touchable,
  Header,
  Image,
  Footer,
  SelectInput,
  ScrollView,
} from '../common';
import { AuthActions, FollowActions, PostActions } from '../../actions';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

  const statusOptions =[
    {
      key: 'Share on Facebook',
      label: 'Share on Facebook',
      value: 'Share on Facebook'
    },
    {
      key: 'Share on Twitter',
      label: 'Share on Twitter',
      value: 'Share on Twitter'
    }
  ]

class Follow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {
    this.props.getAllFollowers();
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

    if (this.props.user !== '') {
      if (nextProps.getAllFollowersErrorStatus === 'jwt expired'
        || nextProps.getPostsErrorStatus === 'jwt expired') {
        Toast.show('Please login to get your tags', {
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

  /*  <View className="mt10">
    <ModalSelector
      data={statusOptions}
      initValue=""
    />
  </View>*/

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
            <Text className="black large t-left">{section.text}</Text>
            {/*{ section.tags.map(t => (
                <Text className="lgBlue bold large t-left">#{t}</Text>
              ))
            }*/}
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
        <View className="dividerGrey" />
      </View>
    </NativeView>
  );

  renderContent = (section, i) => (
    <View className="f-row p5 mr20" >
      <View className=" f-row space-between w-1-1">
        <View className="f-row" >
          <View>
            <Image
              className="micro1_thumb m10"
              source={require('../images/icons/share.png')}
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="f-row">
          <Touchable className="p5" key={i} onPress={this.goToAddComment.bind(this, section)}>
            <Image
              className="micro m10"
              source={require('../images/icons/cm.png')}
              resizeMode="cover"
            />
          </Touchable>
            { section.comments && section.comments.length > 0 &&
              (<Text className="mt20 darkgrey bold small t-center"> ({section.comments.length} )</Text>)
            }
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
    } = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header
          title="Followed"
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
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...FollowActions,
  ...PostActions,
})(Follow);
