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
import { AuthActions } from '../../actions';

class Tags extends React.PureComponent {
  
  goToCreatePost = () => {
    this.props.navigation.navigate('CreatePost');
  };

  render() {
    const { user } = this.props;
    const { props } = this;
    return (
      <View className="screen">
        <Header title="Tags" navigation={this.props.navigation} 
          createPostRequest={this.goToCreatePost}
          />
        <ScrollView>
          <View>
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
                  <View className="f-column j-start mt10">
                    <View className="f-row">
                      <Text className="black bold large t-center">
                        Cookie moster
                      </Text>
                      {user &&
                        user.role === 'admin' && (
                          <Image
                            className="micro_thumb m5"
                            source={require('../images/icons/delete.jpg')}
                            resizeMode="cover"
                          />
                        )
                      }
                    </View>
                    <Text className="black medium t-center">Cookiemoster</Text>
                  </View>
                  <View className="f-row pull-right f-both m20">
                    <Image
                      className="normal_thumb m10"
                      source={require('../images/icons/drop.jpg')}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View className="dividerGrey" />
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
                        Cookie moster
                      </Text>
                      {user &&
                        user.role === 'admin' && (
                          <Image
                            className="micro_thumb m5"
                            source={require('../images/icons/delete.jpg')}
                            resizeMode="cover"
                          />
                        )}
                    </View>
                    <Text className="black medium t-center">Cookiemoster</Text>
                  </View>
                  <View className="f-row pull-right f-both m20">
                    <Image
                      className="normal_thumb m10"
                      source={require('../images/icons/drop.jpg')}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View className="dividerGrey" />
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
                        Cookie moster
                      </Text>
                      {user &&
                        user.role === 'admin' && (
                          <Image
                            className="micro_thumb m5"
                            source={require('../images/icons/delete.jpg')}
                            resizeMode="cover"
                          />
                        )}
                    </View>
                    <Text className="black medium t-center">Cookiemoster</Text>
                  </View>
                  <View className="f-row pull-right f-both m20">
                    <Image
                      className="normal_thumb m10"
                      source={require('../images/icons/drop.jpg')}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View className="dividerGrey" />
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
  const user = state.user;
  return {
    token,
    user
  };
}
export default connect(mapStateToProps, { ...AuthActions })(Tags);
