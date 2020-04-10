'use strict';

import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert,
		ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Realm from 'realm';

import CustomRow from '../HomeScreen/CustomRow';


const ContactSchema = {
	  name: 'Contact',
	  primaryKey: 'id',
	  properties: {
		id:     'string',
		name:     'string',
		phNumber: 'string?', //optional property
		mobNumber: 'string', // required property
		photo:  'string?',  // optional property
		isFavorite:  'bool',  //  property
	  }
	};
	
export default class HomeScreen extends React.Component {
	constructor(props) {
	 super(props);
	 this.state = {		 
	   loading: false,
	   dataSource:[],	   
	  };
	}
	
	componentDidMount(){
		//Realm Database config
		Realm.open({
		  schema: [ContactSchema], schemaVersion: 1})
		  .then(realm => {
								
			let sortedCon = this.fetchData(realm);
			
			this.setState({ realm:realm,
				dataSource:sortedCon
			});
				
		})		
	}
	
	fetchData = (realm) =>{
		let contacts = realm.objects('Contact').filtered('isFavorite==true');
		return contacts.sorted('name');
	}
	
	fetchDataNew = () =>{
		const {realm} = this.state;
		let contacts = realm.objects('Contact').filtered('isFavorite==true');
		console.log("fetchDataNew ==>"+JSON.stringify(contacts));
		
		if(contacts.length > 0){
			let sortedCon = contacts.sorted('name');
			this.setState({dataSource:sortedCon});
		}else{
			this.setState({dataSource:null});
		}
	}
	
	componentWillUnmount() {
		// Close the realm if there is one open.
		// const {realm} = this.state;
		// if (realm !== null && !realm.isClosed) {
		  // realm.close();
		// }
	}
	
  render() {

	const { dataSource, realm} = this.state;
	if(this.state.loading){
		return( 
		<View style={styles.loader}> 
	
		<ActivityIndicator size="large" color="#0c9"/>
		</View>
	)} else	if(this.state.dataSource == null || this.state.dataSource.length <=0){
		return( 
			<View style={styles.loader}> 
				<NavigationEvents
					onDidFocus={this.fetchDataNew}
					/>
				<Text style={styles.message}> No Contacts Available, Please create contact from below + button</Text>
			
			</View>)
	} else {		
		return (
		  <View style={styles.MainContainer}>
		    <NavigationEvents
                onDidFocus={this.fetchDataNew}
                />
			 <FlatList
				data={this.state.dataSource}
				
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
