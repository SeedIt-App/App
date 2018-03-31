import React from "react";
import { ScrollView as NativeScrollView } from "react-native";
import Styles from "./Styles";

export default props => {
  const style = [];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
    });
  }
  return (
    <NativeScrollView
      style={style}
      showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
      horizontal={props.horizontal}
    >
      {props.children}
    </NativeScrollView>
  );
};
