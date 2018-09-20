import React from 'react';
import { View, StyleSheet } from 'react-native';

const overlayStyles = StyleSheet.create({
  overlay: {
    backgroundColor: 'transparent',
    opacity: 0.6,
    flexDirection: 'row',
    padding: 10,
  },
});

export default props => (
  <View style={[overlayStyles.overlay]}>{props.children}</View>
);
