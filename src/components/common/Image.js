import React from 'react';
import { Image as NativeImage, StyleSheet } from 'react-native';
import Styles from './Styles';
import Colors from './colors';

const imageStyles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  thumb: {
    height: 40,
    width: 40,
  },
  micro_thumb: {
    height: 10,
    width: 10,
    backgroundColor: Colors.white,
  },
  sm_thumb : {
    height: 10,
    width: 10,
  },
  micro: {
    height: 15,
    width: 15,
  },
  micro1_thumb: {
    height: 24,
    width: 24,
  },
  mini_thumb: {
    height: 25,
    width: 25,
  },
  normal_thumb: {
    height: 35,
    width: 35,
  },
  medium_thumb: {
    height: 45,
    width: 45,
  },
  mini1_thumb: {
    height: 30,
    width: 30,
  },
  med_thumb: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  med_thumb_view: {
    height: 85,
    width: 85,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  big_thumb: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  muiltiImageThumb: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
  },
  large_thumb: {
    height: 55,
    width: 55,
  },
  x_large_thumb: {
    height: 100,
    width: 100,
  },
});

export default props => {
  const style = [];
  if (props.className) {
    const classNames = props.className.split(' ');
    classNames.forEach(className => {
      style.push(Styles[className]);
      style.push(imageStyles[className]);
    });
  }
  return (
    <NativeImage
      style={style}
      source={props.source}
      resizeMode={props.resizeMode || 'contain'}
    >
      {props.children}
    </NativeImage>
  );
};
