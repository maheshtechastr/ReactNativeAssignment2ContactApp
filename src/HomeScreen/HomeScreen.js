'use strict';
//This is an example code for NavigationDrawer//
import React from 'react';
//import react in our code.
import { StyleSheet, View, Text, FlatList,Alert,TouchableOpacity } from 'react-native';
// import all basic components
import {Icon, Fab } from 'native-base';

import CustomRow from './CustomRow';


export default class HomeScreen extends React.Component {
		
  //HomeScreen Component
  render() {
    return (
      <View style={styles.MainContainer}>
       
		 <FlatList
			data={DATA}
			
			 renderItem={({ item }) => <CustomRow
                    name={item.name}
                    mobNumber={item.mobNumber}
                    photo={item.photo}
					isFavorite={item.isFavorite}
					item = {item}
					navigation={this.props.navigation}
                 />}
			
			keyExtractor={item => item.id}
		  />
		  		
		<View style={{ flex: 1 }}>
			<Fab
				direction="up"
				containerStyle={{ }}
				style={{ backgroundColor: 'white', }}
				position="bottomRight"
				onPress={(name) => {
					this.props.navigation.navigate('EditScreen', {title: 'Add New Contact', isNewContact:true})}}>
				<Icon name="add" style={{ color:'#4057FF' }} />
			</Fab>
		</View>
		
      </View>
    );
	 
  }
 
	
  FlatListItemSeparator = () => {
		return (
		  <View style={{
			 height: 1,
			 width:"100%",
			 backgroundColor:"rgba(0,0,0,0.5)",
			}}
			/>
		);
	}
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
	marginTop:5,
	marginBottom:5,
   },
  titleC:{
	  
	  color:'#444',
	  fontSize:23,
  },
});


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    mobNumber: '8927673638',
    phNumber: 'First Item',
    photo: "require('../Image/image1.png')",
	isFavorite: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    mobNumber: '5463782922',
    phNumber: 'Second Item',
    photo: "require('../Image/image3.png')",
	isFavorite: true,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    mobNumber: 'Third Item',
    phNumber: '98765654321',
    photo: "image3",
	isFavorite: false,
	
  },

];