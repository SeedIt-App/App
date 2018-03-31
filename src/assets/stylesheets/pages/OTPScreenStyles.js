import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 30,
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
    marginLeft: 0.1 * width,
    marginBottom: 0.01 * height
  },
  forgottenPasswordContainer: {
    width: 0.78 * width,
    height: 0.05 * height,
    flexDirection: "row",
    justifyContent: "flex-end",
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
