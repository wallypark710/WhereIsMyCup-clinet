import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import GoogleMap from './screens/Map';
import Home from './screens/Home';
import CafeInfo from './screens/CafeInfo';
import SearchResult from './screens/SearchResult';

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
  },
  {
    initialRouteName: 'Welcome',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent('WhereIsMyCup', () => AppContainer);
