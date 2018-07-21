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
import Notifications from './components/notification/Notification';
import SingleTag from './components/tags/singleTag';

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

  SingleTag: {
    screen: SingleTag,
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

  Notifications: {
    screen: Notifications,
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
    AsyncStorage.multiGet(['authState', 'otpState'], (error, localState) => {
      let store = null;
      if (!error && localState) {
        const auth = JSON.parse(localState[0][1]);
        const otp = JSON.parse(localState[1][1]);
        const initialState = {};
        if (auth) {
          initialState.auth = auth;
        }
        if (otp) {
          initialState.otp = otp;
        }
        store = configureStore(initialState);
      } else {
        store = configureStore();
      }
      this.setState({ store });
    });
  }


  /*componentWillMount() {
    AsyncStorage.getItem('authState', (error, authState) => {
      let store = null;
      if (!error && authState) {
        store = configureStore({ auth: JSON.parse(authState) })
      } else {
        store = configureStore();
      }
      this.setState({ store });
    });
    AsyncStorage.getItem('authState', (error, authState) => {
      let store = null;
      let persistor = null;
      if (!error && authState) {
        ({ store, persistor } = configureStore({ auth: JSON.parse(authState) }));
      } else {
        ({ store, persistor } = configureStore());
      }
      this.setState({ store, persistor });
    });
  }
*/
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
