import React from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  Touchable,
  Text,
  Colors,
  KeyboardAvoidingView,
  Header,
  Footer,
  ScrollView
} from "../common";
import { TextInput } from "react-native";
import { UserActions } from '../../actions';

class Profile extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: 'posted',
      activeFlagBorderColor: 'white',
      activeFlagTextColor: '#3CCDFD',
    };
  }

  componentDidMount() {
    this.props.profile();
  }

  goToEditProfile = () => {
    this.props.navigation.navigate("EditProfile");
  }
  
  renderTab = () => {
    if (this.state.activeFlag === 'liked') {
       return (<View className="f-row f-both mt20">
          <Text className="black bold medium t-left">liked</Text>
        </View>)
      }
    else if (this.state.activeFlag === 'posted') {
      return (
        <View className="bg-transparent mt10 space-between">
          <View className="f-row p5 mr20">
            <View className="f-row f-both m20">
              <Image
                className="med_thumb m10"
                source={require("../images/avatars/Abbott.png")}
                resizeMode="cover"
              />
            </View>
            <View className="f-column mt10">
              <View className="f-both">
                <Text className="black bold large t-center">
                  Cookie Master
                </Text>
              </View>
              <View className="f-both">
                <Text className="black medium t-center">
                  Cookie Master
                </Text>
              </View>
            </View>
            <View className="f-row pull-right f-both m20">
              <Image
                className="normal_thumb m10"
                source={require("../images/icons/drop.jpg")}
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="dividerGrey" />
          <View className="f-row p5 mr20">
            <View className="f-row f-both m20">
              <Image
                className="med_thumb m10"
                source={require("../images/avatars/Abbott.png")}
                resizeMode="cover"
              />
            </View>
            <View className="f-column mt10">
              <View className="f-both">
                <Text className="black bold large t-center">
                  Cookie Master
                </Text>
              </View>
              <View className="f-both">
                <Text className="black medium t-center">
                  Cookie Master
                </Text>
              </View>
            </View>
            <View className="f-row pull-right f-both m20">
              <Image
                className="normal_thumb m10"
                source={require("../images/icons/drop.jpg")}
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="dividerGrey" />
        </View>
      )
    }
    else if (this.state.activeFlag === 'followers') {
      return (<View className="f-row f-both mt20">
        <Text className="black bold medium t-left">followers</Text>
      </View>)
    }
    else if(this.state.activeFlag === 'following') {
      return (<View className="f-row f-both mt20">
        <Text className="black bold medium t-left">following</Text>
      </View>)
    }
  };

  render() {
    const { profileRequestStatus, profileErrorStatus } = this.props;
    console.log(this.props)
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <Header title="Profile" navigation={this.props.navigation}
            openRequest={this.goToEditProfile} />
            <View className="f-column">
              <View className="bg-transparent f-row mt10 space-between">
                <View className="mh25 f-row">
                  <View>
                    <Image
                      className="med_thumb_view"
                      source={require("../images/avatars/Abbott.png")}
                    />
                  </View>
                  <View className="mh25">
                    <Text className="darkGrey bold medium">
                      Sarah Lengley
                    </Text>
                    <Text className="darkGrey medium">
                      CokieeMonster
                    </Text>
                    <Text className="darkGrey medium">
                      Wilcusion
                    </Text>
                  </View>
                </View>
                <View className="mh25 mt10">
                  <Text className="blue bold large">
                    Follow
                  </Text>
                </View>
              </View>
              <View className="bg-transparent f-row mt10 space-between">
                <View className="mh25 mt10">
                  <Text className="darkGrey medium">
                    I Love House of Cards and lasanga. Passionate{'\n'}
                    about the revival of detroit
                  </Text>
                </View>
              </View>  
              <View className="bg-transparent mh25 f-both f-row mt10 space-between">
                <View className="mh25 f-center f-column">
                  <Image
                    className=" normal_thumb"
                    source={require("../images/avatars/Abbott.png")}
                  />
                  <Text className="mh10 darkGrey medium">
                    Cards
                  </Text>
                </View>
                <View className=" f-center f-column">
                  <Image
                    className="normal_thumb"
                    source={require("../images/avatars/Abbott.png")}
                  />
                  <Text className=" mh10 darkGrey medium">
                    Cards1
                  </Text>
                </View>
                <View className="mr25 f-center f-column">
                  <Image
                    className="normal_thumb"
                    source={require("../images/avatars/Abbott.png")}
                  />
                  <Text className="mh10 darkGrey medium">
                    Cards2
                  </Text>
                </View>
              </View>  
            </View>
            <View className="f-row mt10 p5">
              <View className="f-row bg-header w-1-1 space-between">
                <View className="mh10 p5">
                  <Touchable
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 2,
                      borderBottomColor: 
                        this.state.activeFlag === 'posted'
                          ? this.state.activeFlagBorderColor
                          : 'transparent',
                    }}
                    onPress={() => {
                      this.setState({ activeFlag: 'posted' });
                    }}
                  >
                    <Text className="white medium">
                      Posted
                    </Text>
                  </Touchable>
                </View>
                <View className="mh10 p5">
                  <Touchable
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        this.state.activeFlag === 'liked'
                          ? this.state.activeFlagBorderColor
                          : 'transparent',
                    }}
                    onPress={() => {
                      this.setState({
                        activeFlag: 'liked',
                      });
                    }}
                  >
                    <Text className="white medium">
                      Liked
                    </Text>
                  </Touchable>
                </View>
                <View className="mh10 p5">
                  <Touchable
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        this.state.activeFlag === 'followers'
                          ? this.state.activeFlagBorderColor
                          : 'transparent',
                    }}
                    onPress={() => {
                      this.setState({
                        activeFlag: 'followers',
                      });
                    }}
                  >
                    <Text className="white medium">
                      Followers
                    </Text>
                  </Touchable>
                </View>
                <View className="mh10 p5">
                  <Touchable
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        this.state.activeFlag === 'following'
                          ? this.state.activeFlagBorderColor
                          : 'transparent',
                    }}
                    onPress={() => {  
                      this.setState({
                        activeFlag: 'following',
                      });
                    }}
                  >
                    <Text className="white medium">
                      Following
                    </Text>
                  </Touchable>
                </View>
              </View>  
            </View>
            <ScrollView>
              {this.renderTab()}
            </ScrollView>
          <Footer navigation={this.props.navigation} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const {
    profileRequestStatus,
    profileErrorStatus,
  } = state;
  console.log(state, "prState")
  return {
    profileRequestStatus,
    profileErrorStatus,
  };
}

export default connect(mapStateToProps, { ...UserActions })(Profile);
