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
import UserInfo from './screens/UserInfo';
import Intro_1 from './screens/Intro_1';
import Intro_2 from './screens/Intro_2';
import Intro_3 from './screens/Intro_3';
import Intro_4 from './screens/Intro_4';
import Intro_5 from './screens/Intro_5';

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

    UserInfo: {
      screen: UserInfo,
    },

    Intro_1: {
      screen: Intro_1,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
    Intro_2: {
      screen: Intro_2,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
    Intro_3: {
      screen: Intro_3,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
    Intro_4: {
      screen: Intro_4,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
    Intro_5: {
      screen: Intro_5,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
  },
  {
    initialRouteName: 'Intro_1',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent('WhereIsMyCup', () => AppContainer);
