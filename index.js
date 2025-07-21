/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import App from './src/App';
import TaskManagerContainer from './TaskManager/navigation/TaskManagerContainer';


AppRegistry.registerComponent(appName, () => TaskManagerContainer);
