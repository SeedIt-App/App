import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    height: height
  },
  headerView: {
    flex: 0.3,
    backgroundColor: "white"
  },
  avatarView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  listView: {
    flex: 0.7,
    backgroundColor: "#104F8C"
  }
});

export default styles;
