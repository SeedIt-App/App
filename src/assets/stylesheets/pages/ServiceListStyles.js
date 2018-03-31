import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  buttonView: {
    width,
    height: 0.09 * height,
    flexDirection: "row"
  },
  ServiceListOption: {
    width,
    height: 0.199 * height,
    flexDirection: "row"
  }
});

export default styles;
