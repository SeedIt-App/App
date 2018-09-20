import React from 'react';
import { connect } from 'react-redux';
import {Text, View, Touchable, Header, Image, Footer, ScrollView, Switch,Icon} from '../common';
import { AuthActions, PostActions } from '../../actions';
import idx from 'idx';
import Modal from 'react-native-modal';

class ViewComments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userNameFlag: false,
      modalVisible: false,
      message: '',
      currentPostData: this.props.navigation.state.params.postData,
    };
  }


  goBack = () => {
    this.props.navigation.goBack();
  };

  goToAddComment = sec => {
    console.log(sec);
    this.props.navigation.navigate('CreateComment', {
      postData: sec,
    });
  };

  ShowUserName = () => {
    this.setState({ userNameFlag: !this.state.userNameFlag });
  };

  modelVisibleToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const {
      user,
    } = this.props;
    const { props } = this;

    console.log(this.state.currentPostData , "*************")
    return (
      <View className="screen">
         <View>     
          <View className="f-row bg-header p5">
            <View className="w-1-1 f-row f-both h65 mt15">
              <Touchable className="pull-left" onPress={this.goBack}>
                <Icon
                  name="keyboard-backspace"
                  color='white'
                  size={28}
                />
              </Touchable>
                <Touchable
                  className="pull-right"
                  onPress={this.goToAddComment.bind(this, this.state.currentPostData)}
                >
                  <Text className="complementary bold medium m10">Add Comment</Text>
                </Touchable>
            </View>
          </View>
        </View>
          <View className="f-column bg-transparent  space-between">
              <View className="f-row p5 mr10 j-start">
                <View>
                  {this.state.currentPostData.postedBy.picture ? 
                    (<Image
                      className="med_thumb m10"
                      source={{uri : this.state.currentPostData.postedBy.picture}}
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
                    {this.state.currentPostData.postedBy.userName}
                  </Text>
                  <View className="f-column">
                    <Text className="lightGrey medium t-left">
                      {this.state.currentPostData.text}
                    </Text>
                  </View>

                  <View className="f-column">
                    <View className="f-row flexWrap w-2-1 mr30">
                      {this.state.currentPostData.tags &&
                        this.state.currentPostData.tags.length > 0 &&
                        this.state.currentPostData.tags.map((v, i) => (
                          <Text className="lgBlue bold medium t-left">
                            {' '}
                            #{v.tag}
                          </Text>
                        ))}
                    </View>
                    <View className="f-row flex w-1-2 mr30">
                      {this.state.currentPostData.images &&
                        this.state.currentPostData.images.length > 0 &&
                        this.state.currentPostData.images.map(v => (
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
                  {this.state.currentPostData.waters &&
                    this.state.currentPostData.waters.length > 0 ?
                      <View className="f-row">
                        { this.state.currentPostData.waters.map( v => (
                          (v._id === this.props.user._id) &&
                          <Image
                            className="normal_thumb m15"
                            source={require('../images/icons/drop.jpg')}
                            resizeMode="cover"
                          />)
                        )}
                        <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                          {' '}{this.state.currentPostData.waters.length}
                        </Text>
                      </View> 
                    :
                    <View className="f-row">
                      <Image
                        className="big_thumb m5"
                        source={require('../images/icons/grey_drop.png')}
                        resizeMode="cover"
                      />
                      <Text className=" mt20 marginLeft20 darkgrey bold medium t-center">
                        {' '}{this.state.currentPostData.waters.length}
                      </Text>  
                    </View>  
                  }  
                </View>
                <View className="dividerGrey" />
              </View>
              <View className="f-row p5  f-both f-mddile">
                  <View className="f-row p5  f-both  w-1-1">
                    <View className=" f-row f-both space-between">
                      <View className="f-row mh40">
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
                                backdropOpacity={0.4}
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
                      <View className="f-row mb5  mh40">
                        <View >
                          <Touchable
                            onPress={this.goToAddComment.bind(this, this.state.currentPostData)}
                          >
                            <Image
                              className="micro "
                              source={require('../images/icons/cm.png')}
                              resizeMode="cover"
                            />
                          </Touchable>
                        </View>
                        <View className="marginTop25 ">
                          {this.state.currentPostData.comments &&
                            this.state.currentPostData.comments.length > 0 && (
                              <Text className="mt20 lightGrey bold small t-center">
                                ({this.state.currentPostData.comments.length} )
                              </Text>
                            )}
                        </View>
                      </View>
                    </View>
                  </View>
                            </View>
              <View className="dividerGrey" />
              <View className="f-column p5 mr10 j-start ">
                <ScrollView>
                  {this.state.currentPostData.comments.map((c ) => 
                    (<View className="f-row">
                      <View>
                        {c.commentBy.picture ? 
                          (<Image
                            className="med_thumb m10"
                            source={{uri : c.commentBy.picture}}
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
                          {c.commentBy.userName}
                        </Text>
                        <View className="f-column">
                          <Text className="lightGrey medium t-left">
                            {c.text}
                          </Text>
                        </View>
                      </View>
                    </View>)
                  )}
                </ScrollView>
          </View>
          </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const token = state.auth.authToken;
  const { user } = state.auth;
  return {
    token,
    user,
  };
}
export default connect(mapStateToProps, { ...AuthActions, ...PostActions })(ViewComments);
