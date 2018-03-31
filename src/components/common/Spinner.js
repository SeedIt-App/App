import React from "react";
import { ActivityIndicator } from "react-native";
import { View, Colors } from "./";

export default props => (
  <View className="abs-cover f-center f-middle">
    <ActivityIndicator
      size={props.large && "large"}
      color={props.color || Colors.primary}
    />
  </View>
);
