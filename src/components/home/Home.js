import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Touchable, Header,Image, Footer,ScrollView } from '../common';

class Home extends React.PureComponent {

  render() {
    const { props } = this;

    return (
      <View className="screen">
        <Header title="Newsfeed" navigation={this.props.navigation}/> 
          <ScrollView>
            <View>
              <View className="f-column ">
                <View className="bg-transparent mt10 space-between">
                  <View className="f-row p5 mr20">
                    <View className="f-row f-both m20">
                      <Image
                        className="med_thumb m10"
                        source={require('../images/avatars/Abbott.png')}
                        resizeMode="cover"
                      />
                    </View>
                    <View className="f-column mt10">
                      <View className="f-both">
                        <Text className="black bold large t-center">Cookie Master</Text>
                      </View>
                       <View className="f-both">
                        <Text className="black medium t-center">Cookie Master</Text>
                      </View>
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
                    <View className="f-column mt10">
                      <View className="f-both">
                        <Text className="black bold large t-center">Cookie Master</Text>
                      </View>
                       <View className="f-both">
                        <Text className="black medium t-center">Cookie Master</Text>
                      </View>
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
                    <View className="f-column mt10">
                      <View className="f-both">
                        <Text className="black bold large t-center">Cookie Master</Text>
                      </View>
                       <View className="f-both">
                        <Text className="black medium t-center">Cookie Master</Text>
                      </View>
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


export default connect()(Home);

