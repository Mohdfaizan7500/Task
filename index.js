/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Todo from './scr2/Todo';
import TodoAppContainer from './todo/TodoApp/Navigation';
import TaskManagerContainer from './TaskManager/navigation/TaskManagerContainer';

AppRegistry.registerComponent(appName, () => TaskManagerContainer);
