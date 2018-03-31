import React from "react";
import {
  KeyboardAvoidingView as NativeKeyboardAvoidingView,
  Platform
} from "react-native";
import View from "./View";
import Styles from "./Styles";

class KeyboardAvoidingView extends React.PureComponent {
  render() {
    if (Platform.OS === "ios") {
      return (
        <NativeKeyboardAvoidingView style={Styles.flex} behavior="padding">
          {this.props.children}
        </NativeKeyboardAvoidingView>
      );
    }
    return <View className="flex">{this.props.children}</View>;
  }
}

export default KeyboardAvoidingView;
