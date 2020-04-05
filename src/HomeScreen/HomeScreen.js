'use strict';
//This is an example code for NavigationDrawer//
import React from 'react';
//import react in our code.
import { StyleSheet, View, Text, FlatList, Alert,
		ActivityIndicator, TouchableOpacity } from 'react-native';
// import all basic components
import {Icon, Fab } from 'native-base';

import CustomRow from './CustomRow';
import {firebase} from '../Firebase/Firebase';

export default class HomeScreen extends React.Component {
	constructor(props) {
	 super(props);
	 this.state = {		 
	   loading: false,
	   dataSource:[],
	   
	  };
	}
	componentDidMount(){
		//Below line can be use to get value from state route
		firebase.database().ref('contacts/').once('value',  (snapshot)=> {
			console.log(snapshot.val())
			this.setState({dataSource:snapshot})
		});
		
	}
  //HomeScreen Component
  render() {
	if(this.state.loading){
		return( 
		<View style={styles.loader}> 
		
		<ActivityIndicator size="large" color="#0c9"/>
		</View>
	)} else	if(this.state.dataSource == null){
		return( 
		<View style={styles.loader}> 
		
		<Text> DataSourceNetWorkError</Text>
		</View>
	)} else	{		
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
    photo: "https://i.picsum.photos/id/361/200/300.jpg",
	isFavorite: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    mobNumber: '5463782922',
    phNumber: 'Second Item',
    photo: "https://i.picsum.photos/id/237/200/300.jpg",
	isFavorite: true,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    mobNumber: 'Third Item',
    phNumber: '98765654321',
    photo: "https://i.picsum.photos/id/866/200/300.jpg",
	isFavorite: false,
	
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    name: 'Third Item',
    mobNumber: 'Third Item',
    phNumber: '98765654321',
    photo: "",
	isFavorite: false,
	
  },

];