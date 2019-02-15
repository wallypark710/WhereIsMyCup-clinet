import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import SearchResult from './screens/SearchResult';

import GoogleMap from './screens/Map';
import CafeInfo from './screens/CafeInfo';
import Feedback from './screens/Feedback';

const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },

    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
      },
    },

    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
      },
    },

    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },

    GoogleMap: {
      screen: GoogleMap,
    },

    CafeInfo: {
      screen: CafeInfo,
    },

    SearchResult: {
      screen: SearchResult,
      navigationOptions: {
        header: null,
      },
    },

    Feedback: {
      screen: Feedback,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
      },
    },
  },
  {
    initialRouteName: 'Welcome',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent('WhereIsMyCup', () => AppContainer);
