'use strict';
import 	HomeScreen from '../HomeScreen/HomeScreen';
import 	FavoritesScreen from './FavoritesScreen/FavoritesScreen';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function AppNavigator() {
	
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">

		<Stack.Screen name="HomeScreen" component={HomeScreen} />
		<Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;