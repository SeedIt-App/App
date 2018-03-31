import React from "react";
import { View } from "react-native";
import Text from "./Text";
import Styles from "./Styles";

export default () => (
  <View style={[Styles.pageContainer, Styles.centerBoth]}>
    <Text>Oops! Something went wrong.. Please try again</Text>
  </View>
);
