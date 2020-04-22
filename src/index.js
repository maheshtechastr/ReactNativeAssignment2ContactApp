'use strict';

import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ContactList from './HomeScreen/HomeScreen.js';
import Favorites from './FavoritesScreen/FavoritesScreen';
import {Icon } from 'native-base';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class NavigationDrawerStructure extends React.Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
        
		  <Icon name='menu' style={{ width: 35, height: 25, marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

function ContactList_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactList}
		options={({ navigation, route }) => ({
			headerTitleAlign: 'center',
			headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function Favorites_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
		options={({ navigation, route }) => ({
			headerTitleAlign: 'center',
			headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
	render(){
		return(			
			  <Drawer.Navigator initialRouteName="ContactList" >
				<Drawer.Screen name="ContactList" component={ContactList_StackNavigator} />
				<Drawer.Screen name="Favorites" component={Favorites_StackNavigator} />
			  </Drawer.Navigator>
			)
		
	}
}