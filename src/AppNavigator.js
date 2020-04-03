'use strict';

import HomeScreen from './index';

import EditScreen from "./HomeScreen/EditRegister.js";

import * as React from 'react';

import {createAppContainer } from 'react-navigation';	
import {createStackNavigator} from 'react-navigation-stack';

const PageNavigator = createStackNavigator({
  HomeScreen: {
    navigationOptions: {
      headerShown: false
    },
    screen: HomeScreen
  },

  EditScreen: {
    navigationOptions: {
		//title: '',
         headerStyle: {
			borderBottomWidth:2,
			borderBottomColor: '#222',	
			
		},
		headerTitleAlign: 'center'
    },
	
    screen: EditScreen
  }
});

PageNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  swipeEnabled: navigation.state.index === 0
});
const App = createAppContainer(PageNavigator);

export default App;

