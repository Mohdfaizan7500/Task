/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';

AppRegistry.registerComponent(appName, () => App);
