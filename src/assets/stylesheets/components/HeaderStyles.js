import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  Statusbar: {
    width: width,
    height: 0.03 * height,
    backgroundColor: "#000000"
  },
  header: {
    width: width,
    height: 0.07 * height,
    backgroundColor: "#303030",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 40
  }
});

export default styles;
