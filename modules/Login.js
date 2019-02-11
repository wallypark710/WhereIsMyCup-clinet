import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

export const Login = async function(email, password){
  try{
    const result = await axios.post(`http://13.125.24.9:3000/oauth/local/login`,{
      email: email,
      password: password
    });

    if( result.status === 200 ){
      console.log('auto login success');
      const firstKeyChain = JSON.stringify({ email: email, pw: password });
      const secondKeyChain = result.headers['x-refresh-token'];

      if( AsyncStorage.getItem('access') ){
        await Keychain.resetGenericPassword();
      }
      await Keychain.setGenericPassword(firstKeyChain, secondKeyChain);
      await AsyncStorage.setItem('access', result.headers['x-access-token']);

      return 1;
    } else {
      console.log("auto login error");
      return 0;
    }
    
  } catch(err) {
    console.log(err.message);
    return 0;
  }
}

