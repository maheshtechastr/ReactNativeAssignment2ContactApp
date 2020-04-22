'use strict';

import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert,
		ActivityIndicator, TouchableOpacity } from 'react-native';

import CustomRow from '../HomeScreen/CustomRow';

import { connect } from 'react-redux';
import * as contactAction from '../actions/index';

class FavoritesScreen extends React.Component {
	constructor(props) {
	 super(props);
	 this.state = {		 
	   loading: false,
	   //dataSource:[],	   
	  };
	}
	
	componentDidMount(){
		
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			  // do something
			  console.info('Refresghhhhhhhh');
			  this.props.allFavoriteContact();
		});
	}
	
	
	
	componentWillUnmount() {
		 this._unsubscribe();
	}
	
  render() {

	const { dataSource} = this.state;
	if(this.state.loading){
		return( 
		<View style={styles.loader}> 
	
		<ActivityIndicator size="large" color="#0c9"/>
		</View>
	)} else	if(this.props.contacts.favoriteList.length <=0){
		
		return( 
			<View style={styles.loader}> 
				
				<Text style={styles.message}> No Favorites Contacts Available, Please add contact from detail page</Text>
			
			</View>)
	} else {		
		return (
		  <View style={styles.MainContainer}>
		   
			 <FlatList
				data={this.props.contacts.favoriteList}
				
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
	console.info('mapStateToProps=='+JSON.stringify(ownProps))
	console.info('mapStateToProps=='+JSON.stringify(state))
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    allFavoriteContact: () => dispatch(contactAction.allFavoriteContact())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);

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
