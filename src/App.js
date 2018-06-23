import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import { View } from './components/common';
import Splash from './components/splash-screen/Splash';
import SplashScreen from './components/splash-screen/SplashScreen';
import SocialSignUp from './components/signup/SocialSignUp';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import Newsfeed from './components/newsfeed/newsfeed';
import ProfileNavigator from './components/profile/ProfileNavigator';
import CreatePost from './components/post/createPost';
import CreateComment from './components/post/createComment';
import Follow from './components/follow/follow';
import Tags from './components/tags/tags';
import Redwood from './components/redwood/redwood';

const AppNavigator = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Newsfeed: {
    screen: Newsfeed,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SocialSignUp: {
    screen: SocialSignUp,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      header: null,
    }),
  },

  ProfileNavigator: {
    screen: ProfileNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },

  CreatePost: {
    screen: CreatePost,
    navigationOptions: () => ({
      header: null,
    }),
  },

  CreateComment: {
    screen: CreateComment,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Follow: {
    screen: Follow,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Tags: {
    screen: Tags,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Redwood: {
    screen: Redwood,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      store: null,
    };
  }

  componentWillMount() {
    AsyncStorage.multiGet(['authState'], (error, localState) => {
      let store = null;
      if (!error && localState) {
        const auth = JSON.parse(localState[0][1]);
        const initialState = {};
        if (auth) {
          initialState.auth = auth;
        }
        store = configureStore(initialState);
      } else {
        store = configureStore();
      }
      this.setState({ store });
    });
  }

  render() {
    return (
      <View className="screen app-container">
        {this.state.store ? (
          <Provider store={this.state.store}>
            <AppNavigator onNavigationStateChange={null} />
          </Provider>
        ) : (
          <View>
            <Splash />
          </View>
        )}
      </View>
    );
  }
}

export default App;
