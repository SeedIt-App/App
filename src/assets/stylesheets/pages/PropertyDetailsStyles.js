import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  topView: {
    height: 0.2 * height,
    width: width
  },
  backgroundImage: {
    width: width,
    height: 0.2 * height,
    flex: 1,
    flexDirection: "row"
  },
  imageOverlay: {
    width: width / 2,
    height: 0.2 * height,
    backgroundColor: "transparent",
    marginLeft: 15,
    flex: 0.5
  },
  topViewData: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center"
  },
  middleView: {
    height: 0.1 * height,
    width: width,
    flex: 1,
    flexDirection: "row",
    marginBottom: 70
  },
  dropDownSelectStyles: {
    flex: 0,
    paddingLeft: 0,
    paddingTop: 20,
    paddingBottom: 0,
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    height: 40,
    width: width * 0.4
  },
  dateView: {
    backgroundColor: "#285F9C",
    width: 0.9 * width,
    marginLeft: 15,
    marginRight: 15,
    flex: 0.5
  }
});

export default styles;
