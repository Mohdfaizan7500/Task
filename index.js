/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import TaskManagerContainer from './TaskManager/navigation/TaskManagerContainer';

AppRegistry.registerComponent(appName, () => TaskManagerContainer);
