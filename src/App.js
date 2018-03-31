import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { View } from "./components/common";
import Splash from "./components/splash-screen/Splash";
import SplashScreen from "./components/splash-screen/SplashScreen";
import SocialSignUp from "./components/signup/SocialSignUp";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import configureStore from "./configure-store";

const MainNavigator = DrawerNavigator({
  Home: {
    screen: Home
  }
});

const AppNavigator = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: () => ({
      header: null
    })
  },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null
    })
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null
    })
  },
  SocialSignUp: {
    screen: SocialSignUp,
    navigationOptions: () => ({
      header: null
    })
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      header: null
    })
  }
});

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      store: null
    };
  }

  componentWillMount() {
    let store = null;
    const initialState = "";
    if (initialState) {
      store = configureStore(initialState);
    } else {
      store = configureStore();
    }
    this.setState({ store });
  }

  render() {
    return (
      <View className="screen app-container">
        {this.state.store ? (
          <Provider store={this.state.store}>
            <AppNavigator onNavigationStateChange={null} />
          </Provider>
        ) : (
          <View className="abs-cover f-both">
            <Splash />
          </View>
        )}
      </View>
    );
  }
}

export default App;
