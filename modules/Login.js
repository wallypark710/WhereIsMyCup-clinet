import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

export const Login = async function(email, password) {
  try {
    const result = await axios.post(
      `https://www.sunjae-kim.com/oauth/local/login`,
      {
        email: email,
        password: password,
      },
    );

    if (result.status === 200) {
      const {
        data: {
          userExist: { favorites },
        },
      } = result;

      await AsyncStorage.setItem('saved', JSON.stringify(favorites));

      const firstKeyChain = JSON.stringify({ email: email, pw: password });
      const secondKeyChain = result.headers['x-refresh-token'];

      if (AsyncStorage.getItem('access')) {
        await Keychain.resetGenericPassword();
      }
      await Keychain.setGenericPassword(firstKeyChain, secondKeyChain);
      await AsyncStorage.setItem('access', result.headers['x-access-token']);

      return 1;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err.message);
    return 0;
  }
};
