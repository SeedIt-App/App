import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    width: width,
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  avatarView: {
    width: width,
    height: 0.3 * height,
    backgroundColor: "#241E1E",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  details: {
    width: width,
    flex: 0.2,
    borderBottomWidth: 0.3,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: "center"
  }
});

export default styles;
