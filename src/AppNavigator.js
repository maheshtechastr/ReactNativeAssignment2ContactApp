'use strict';

import HomeScreen from './index';

import EditScreen from "./HomeScreen/EditRegister.js";

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
	render(){
		return(
			 <NavigationContainer>
			  <Stack.Navigator initialRouteName="HomeScreen" >
				<Stack.Screen name="HomeScreen" component={HomeScreen}
					options={{headerShown: false}}/>
				<Stack.Screen name="EditScreen" component={EditScreen}
					options={EditScreen.navigationOptions} />
			  </Stack.Navigator>
			</NavigationContainer>
		)
	}
}

