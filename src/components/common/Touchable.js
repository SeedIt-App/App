import React from "react";
import Touchable from "react-native-platform-touchable";
import { StyleSheet } from "react-native";
import Colors from "./colors";
import Styles from "./Styles";

const touchableStyles = StyleSheet.create({
  touchable: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  rounded: {
    borderRadius: 22
  },
  "btn-primary": {
    backgroundColor: Colors.primary
  },
  "btn-complementary": {
    backgroundColor: Colors.complementary
  },
  "btn-danger": {
    backgroundColor: Colors.error
  },
  "btn-completed": {
    backgroundColor: Colors.lightBlue
  },
  "btn-transparent": {
    backgroundColor: Colors.transparent
  },
  fab: {
    height: 44,
    width: 44,
    borderRadius: 22
  },
  status: {
    minHeight: 20,
    height: 20,
    width: 100
  }
});

export default props => {
  let rippleColor = Colors.complementary;
  const style = [touchableStyles.touchable];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
      style.push(touchableStyles[className]);
      if (className === "btn-complementary") {
        rippleColor = Colors.primary;
      }
    });
  }
  return (
    <Touchable
      style={[style, props.style]}
      onPress={props.onPress}
      background={Touchable.Ripple(rippleColor, false)}
    >
      {props.children}
    </Touchable>
  );
};
