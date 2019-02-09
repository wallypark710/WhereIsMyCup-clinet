import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import GoogleMap from './screens/Map';
import Home from './screens/Home';
import CafeInfo from './screens/CafeInfo';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: SignUp,
  SignIn: {
    screen: SignIn,
    navigationOptions: {
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  GoogleMap: GoogleMap,
  CafeInfo: CafeInfo
},
{
  initialRouteName: 'Welcome',
});

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent('WhereIsMyCup', () => AppContainer);
