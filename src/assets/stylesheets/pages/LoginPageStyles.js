import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    width,
    height,
    flex: 1
  },
  backgroundImage: {
    width,
    height: 0.48 * height
  },
  StatusBar: {
    width,
    height: 0.03 * height,
    backgroundColor: "#000000"
  },
  loginContainer: {
    width,
    height: 0.49 * height,
    backgroundColor: "#1976b9"
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 0.15 * width,
    paddingTop: 0.1 * width
  },
  textInput: {
    color: "white",
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 0.4,
    borderBottomColor: "white",
    width: 0.68 * width
  },
  loginButtonContainer: {
    flexDirection: "row",
    width: 0.8 * width,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 0.1 * width
  },
  forgottenPasswordContainer: {
    width: 0.78 * width,
    height: 0.05 * height,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 40
  },
  forgottenPasswordText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold"
  }
});

export default styles;
