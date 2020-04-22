/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import App from './src/AppNavigator';
import {name as appName} from './app.json';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

let store = configureStore();

export default class RootApp extends Component{
   render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
AppRegistry.registerComponent(appName, () => RootApp);
