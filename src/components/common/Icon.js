import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default props => (
  <Icon
    name={props.name}
    size={props.size || 20}
    color={props.color || "black"}
  />
);
