import { httpsify } from '../utilities/httpsify';
import Auth0Lock from 'auth0-lock';
import logo from '../assets/logo.png';

const Auth = (function() {
  let wm = new WeakMap();
  let privateStore = {};

  function Auth() {
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH_CLIENT_ID,
      process.env.REACT_APP_AUTH_DOMAIN,
      {
        auth: {
          redirectUrl: httpsify(process.env.REACT_APP_AUTH_REDIRECT_URI),
          responseType: 'token id_token',
          autoParseHash: false
        },
        theme: {
          logo,
          primaryColor: '#2C90F5',
          secondaryColor: '#5BAC48'
        },
        languageDictionary: {
          emailInputPlaceholder: 'something@youremail.com',
          title: 'RxID'
        }
      }
    );
    wm.set(privateStore, {
      appName: 'Rx Id'
    });
  }

  return Auth;
})();

export default new Auth();
