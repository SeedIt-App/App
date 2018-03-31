import React from 'react';
import { StyleSheet, Text, Image , View } from 'react-native';
import BGView from './Seed_IT.png';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <Image source={BGView} style={styles.backgroundContainer} /> 
          <View style={styles.container}>
            <View style={{justifyContent : 'flex-start',flexDirection : 'row'}}>
              <Text style={{fontSize:25}}>Join</Text>
              <Text></Text>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
