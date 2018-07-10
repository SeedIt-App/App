import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "./colors";
import Styles from "./Styles";

const textStyle = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Light",
    fontWeight: "300",
    color: "black",
    fontSize: 15,
    backgroundColor: "transparent"
  },
  bold: {
    fontFamily: "Roboto-Bold"
  },
  heading: {
    fontSize: 24,
    fontWeight: "400"
  },
  sm_Font: {
    fontSize: 10
  },
  boldFont: {
    fontSize: 15,
    fontWeight: "500"
  },
  dashHeading: {
    fontSize: 30,
    fontWeight: "700"
  },
  title: {
    fontSize: 20
  },
  "t-center": {
    textAlign: "center"
  },
  "t-left": {
    textAlign: "left"
  },
  "t-right": {
    textAlign: "right"
  },
  complementary: {
    color: Colors.complementary
  },
  white: {
    color: Colors.white
  },
  primary: {
    color: Colors.primary
  },
  black: {
    color: Colors.black
  },
  darkGrey: {
    color: Colors.darkgrey
  },
  blue: {
    color: Colors.headerBg
  },
  lgBlue : {
    color : Colors.lgBlue
  },
  error: {
    color: Colors.error,
    fontSize: 12
  },
  transparent: {
    color: "transparent",
    fontSize: 12
  },
  small: {
    fontSize: 12
  },
  medium: {
    fontSize: 15
  },
  large: {
    fontSize: 17
  },
  x_large: {
    fontSize: 25
  },
  xx_large: {
    fontSize: 28
  }
});

export default props => {
  const style = [textStyle.text];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
      style.push(textStyle[className]);
    });
  }
  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
};
