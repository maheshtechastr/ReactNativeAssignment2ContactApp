'use strict';
//This is an example code for NavigationDrawer//
import React from 'react';
//import react in our code.
import { StyleSheet, View, Text, FlatList, Alert,
		ActivityIndicator, TouchableOpacity } from 'react-native';
// import all basic components
import {Icon, Fab } from 'native-base';

import CustomRow from './CustomRow';
import { connect } from 'react-redux';
import * as contactAction from '../actions/index';
	
class HomeScreen extends React.Component {
	constructor(props) {
	 super(props);
	 this.state = {		 
	   loading: false,
	   contacts:[],
	   
	  };
	}
	
	componentDidMount(){
		
			
	}
	
	
	componentWillUnmount() {
		
	}
	
  //HomeScreen Component
  render() {
	console.log("===>"+JSON.stringify(this.props.contacts.contactList))
	
	if(this.state.loading){
		return( 
		<View style={styles.loader}> 
	
		<ActivityIndicator size="large" color="#0c9"/>
		</View>
	)} else	if(this.props.contacts.contactList.length <= 0){
		return( 
			<View style={styles.loader}> 
		
			<Text style={styles.message}> No Contacts Available, Please create contact from below + button</Text>
				<View style={{ flex: 1 }}>
				
				<Fab
					direction="up"
					containerStyle={{ }}
					style={{ backgroundColor: 'white', }}
					position="bottomRight"
					onPress={(name) => {
						this.props.navigation.navigate('EditScreen',
						{title: 'Add New Contact', isNewContact:true})}}>
					<Icon name="add" style={{ color:'#4057FF' }} />
				</Fab>
			</View>
			</View>)
	} else {		
		return (
		  <View style={styles.MainContainer}>
		  
			 <FlatList
				data={this.props.contacts.contactList}							
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

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
  message:{
	  textAlign:'center',
	  paddingTop:50,
	  //backgroundColor:'#123',
		
	  flex:1,
	  color:'#444',
	  fontSize:18,
  },
  loader:{
	paddingLeft:16,
	paddingRight:16,
	flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#fff"
  },
});
