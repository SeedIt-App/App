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
import { AuthActions, FollowActions,PostActions} from '../../actions';
import { TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { View as NativeView } from 'react-native';

class Redwood extends React.PureComponent {
  constructor(props){
    super(props)

    this.state = {
      user : this.props.user,
      activeFlag: 'seed',
      activeFlagBorderColor: '#3CCDFD',
      activeFlagTextColor: 'white',
    }
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getAlltreeErrorStatus) {
      Toast.show(nextProps.getAlltreeErrorStatus, {
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

  renderTab = (allPosts) => {
    if (this.state.activeFlag === 'sapling') {
      return (
         <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length  > 0 && 
            <Accordion
              sections={allPosts}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              underlayColor="transparent"
            /> 
          }
        </View>
      );
    } else if (this.state.activeFlag === 'seed') {
      return (
         <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length  > 0 && 
            <Accordion
              sections={allPosts}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              underlayColor="transparent"
            /> 
          }
          </View>
      );
    } else if (this.state.activeFlag === 'tree') {
      return (
         <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length  > 0 && 
            <Accordion
              sections={allPosts}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              underlayColor="transparent"
            /> 
          }
          </View>
      );
    } else if (this.state.activeFlag === 'redwood') {
      return (
         <View className="bg-transparent mt10 space-between">
          {allPosts && allPosts.length  > 0 && 
            <Accordion
              sections={allPosts}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              underlayColor="transparent"
            /> 
          }
        </View>
      );
    }
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
                  className="micro1_thumb m5"
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
    const { user, tree, allPosts, 
      getAlltreeErrorStatus, 
      getAlltreeRequestStatus } = this.props;
      const { props } = this;
    return (
      <View className="screen">
        <Header title="Levels" navigation={this.props.navigation} 
          createPostRequest={this.goToCreatePost}
          />
        <ScrollView>
          <View>
            <View className="f-column">
              <View className="bg-transparent mt10 space-between">
                <View className="f-row p5">
                    <View className="f-row bgWhite w-1-1 space-between">
                      <View className="mh10 p5">
                        <Touchable
                          style={{
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor:
                              this.state.activeFlag === 'seed'
                                ? this.state.activeFlagBorderColor
                                : 'transparent',
                          }}
                          onPress={() => {
                            this.setState({ activeFlag: 'seed' });
                          }}
                        >
                        <View>
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/seed.png')}
                            resizeMode="cover"
                          />
                          <Text className="black bold medium">Seed</Text>
                        </View>  
                        </Touchable>
                      </View>
                      <View className="mh10 p5">
                        <Touchable
                          style={{
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor:
                              this.state.activeFlag === 'sapling'
                                ? this.state.activeFlagBorderColor
                                : 'transparent',
                          }}
                          onPress={() => {
                            this.setState({
                              activeFlag: 'sapling',
                            });
                          }}
                        >
                        <View> 
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/sapling.jpg')}
                            resizeMode="cover"
                          />
                          <Text className="black bold medium">Sapling</Text>
                        </View>  
                        </Touchable>
                      </View>
                      <View className="mh10 p5">
                        <Touchable
                          style={{
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor:
                              this.state.activeFlag === 'tree'
                                ? this.state.activeFlagBorderColor
                                : 'transparent',
                          }}
                          onPress={() => {
                            this.setState({
                              activeFlag: 'tree',
                            });
                          }}
                        >
                        <View>
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/Redwood_Tree.png')}
                            resizeMode="cover"
                          />
                          <Text className="black bold medium">Tree</Text>
                        </View>
                        </Touchable>
                      </View>
                      <View className="mh10 p5">
                        <Touchable
                          style={{
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor:
                              this.state.activeFlag === 'redwood'
                                ? this.state.activeFlagBorderColor
                                : 'transparent',
                          }}
                          onPress={() => {
                            this.setState({
                              activeFlag: 'redwood',
                            });
                          }}
                        >
                        <View>
                          <Image
                            className="micro1_thumb m5"
                            source={require('../images/icons/tree.png')}
                            resizeMode="cover"
                          />
                          <Text className="black bold medium">Redwood</Text>
                        </View>  
                        </Touchable>
                      </View>
                    </View>
                  </View>
                  <ScrollView>{this.renderTab(allPosts)}</ScrollView>
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
  const { user }= state.auth;
  const { tree ,
    getAlltreeRequestStatus,
    getAlltreeErrorStatus } = state.follow;
  const { getAllPosts ,
    getPostsRequestStatus,
    getPostsErrorStatus } = state.post;
  const allPosts = getAllPosts && getAllPosts.posts;  
  return {
    token,
    user,
    tree,
    getAlltreeRequestStatus,
    getAlltreeErrorStatus,
    allPosts,
    getPostsRequestStatus,
    getPostsErrorStatus
  };
}
export default connect(mapStateToProps, { ...AuthActions,...FollowActions, ...PostActions })(Redwood);
