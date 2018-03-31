import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  DashBoardOption: {
    width: width,
    height: 0.199 * height,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default styles;
