import React from "react";
import { View as NativeView } from "react-native";
import Styles from "./Styles";

export default props => {
  const style = [];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
    });
  }
  return <NativeView style={style}>{props.children}</NativeView>;
};
