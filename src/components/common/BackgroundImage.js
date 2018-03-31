import React from "react";
import { ImageBackground } from "react-native";
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
    <ImageBackground
      source={props.source}
      style={style}
      resizeMode={props.resizeMode || "cover"}
    >
      {props.children}
    </ImageBackground>
  );
};
