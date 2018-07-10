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
} from '../common';
import { AuthActions, TagsActions } from '../../actions';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';

class Tags extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  componentDidMount() {
    this.props.getAllTagsList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllTagsListErrorStatus) {
      Toast.show(nextProps.getAllTagsListErrorStatus, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }

    if (this.props.user !== '') {
      if (nextProps.profileErrorStatus === 'jwt expired') {
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

  render() {
    const {
      user,
      getAllTags,
      getAllTagsListRequestStatus,
      getAllTagsListErrorStatus
    } = this.props;
    return (
      <View className="screen">
        <Header
          title="Tags"
          navigation={this.props.navigation}
          createPostRequest={this.goToCreatePost}
        />
        <ScrollView>
          <View className="f-column">
            <View className="bg-transparent f-both mt5 space-between">
              {getAllTagsListRequestStatus === 'REQUESTING' &&
                <View className="p15 mt30">
                  <Spinner large />
                </View> }
              {getAllTagsListRequestStatus === 'SUCCESS' ||
                getAllTags && getAllTags.tags.length > 0 ? (
                getAllTags.tags.map((value) => (
                  <View className="f-row p5 f-middle w-1-1 shadowBox">
                    <View className="f-column mt10">
                      <Text className="dblue bold large t-left"># {value.tag}</Text>
                      <View className="dividerGrey" />
                    </View>
                  </View>
                ))  
              ) : null}
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
    getAllTags,
    getAllTagsListRequestStatus,
    getAllTagsListErrorStatus
  } = state.tags;
  return {
    token,
    user,
    getAllTags,
    getAllTagsListRequestStatus,
    getAllTagsListErrorStatus
  };
}
export default connect(mapStateToProps, {
  ...AuthActions,
  ...TagsActions
})(Tags);
