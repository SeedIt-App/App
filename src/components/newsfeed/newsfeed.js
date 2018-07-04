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

    this.goToAddComment = this.goToAddComment.bind(this) 

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
  }

  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  goToAddComment = (section) => {
    console.log(section)
    this.props.navigation.navigate('CreateComment', {
      itemId: 86
    });
  };

  renderHeader = (section, i) => (
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
            <Text className="black bold large t-center ">{section.postedBy.userName}</Text>
            <Text className="black large t-center">{section.text}</Text>
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

  renderContent = (section, i) => (
    <View>
      <View className="f-row p5 mr20" >
        <View className=" f-row space-between w-1-1">
          <View>
            <Image
              className="micro1_thumb m10"
              source={require('../images/icons/share.png')}
              resizeMode="cover"
            />
          </View>
          <View>
            <Touchable className="p5" key={i} onPress={this.goToAddComment.bind(this, section)}>
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
    const {
      user,
      getAllNewsFeed,
      userNewsFeedErrorStatus,
      userNewsFeedRequestStatus,
      guestUserNewsFeedErrorStatus,
      guestUserNewsFeedRequestStatus
    } = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header
          title="NewsFeed"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
              {userNewsFeedRequestStatus === 'REQUESTING' 
                || guestUserNewsFeedRequestStatus === 'REQUESTING' &&
                 <Spinner/> }
                {userNewsFeedRequestStatus === 'SUCCESS' 
                || guestUserNewsFeedRequestStatus === 'SUCCESS' ||
                  getAllNewsFeed && getAllNewsFeed.length > 0 ? (
                  <Accordion
                    sections={getAllNewsFeed}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    underlayColor="transparent"
                  />
                ) : (
                    <Spinner/>
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
    guestUserNewsFeedRequestStatus,
    guestUserNewsFeedErrorStatus,
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...NewsFeedActions,
  ...PostActions,
})(NewsFeed);
