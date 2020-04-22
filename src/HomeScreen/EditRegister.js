'use strict';
import React from 'react'
import {
	Text,
	View,
	Button,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
	Image,
	ActivityIndicator,
} from 'react-native'

import ImagePicker from '../Image/appImagePicker';
import {Icon } from 'native-base';

import { connect } from 'react-redux';
import * as contactAction from '../actions/index';


class EditRegister extends React.Component {
	
	state = {
		id:'',
		name: '', phNumber: '', mobNumber: '', photo:'',
		isFavorite:false,
		isUploadingData:false,
		
		isNewContact:true,
	}
  
	static navigationOptions = ({ route, navigation }) => {
		const {params} = route
		//console.log("navigationOptions route.params.isFavorite=="+route.params.isFavorite)
		return {
			title: route.params.title,			
			headerTitleAlign: 'center',
			headerStyle:{
				backgroundColor:'white',				
			},
			headerRight: () => (		
				<TouchableOpacity onPress={()=> params.handleSave()}>
					<Image              
					source={route.params.isFavorite?
					require('../Image/favoriteActive.png') : require('../Image/favoriteInActive.png')}
					style={styles.photo}
					/>			
				</TouchableOpacity>
			)
		};
	};
	
	
	onChangeText = (key, val) => {
		this.setState({ [key]: val })
	}
	
	callbackFunction = (childData) => {
		var obj = JSON.parse(childData);
		console.log('URI==>'+obj.uri)
		this.setState({photo: obj.uri})
	}
	
	componentDidMount(){
		
		
		console.log('Successfully==bb=>'+JSON.stringify(this.props.route.params))
		/* 2. Read the params from the navigation state */
		try{
			const { params } = this.props.route
			const dataItem = params ? params.dataItem : null
			const isNewContact = params ? params.isNewContact : false
			console.log('Successfully=isNewContact=bb=>'+isNewContact)
			
			if (dataItem != null){
				console.info('componentDidMount==>'+JSON.stringify(dataItem))
				const {id, name, photo, mobNumber, isFavorite, phNumber} = dataItem ;
					console.log('Successfully=isFavorite=bb=>'+isFavorite)
				this.setState({
					id,
					name,
					mobNumber:mobNumber?mobNumber:'',
					phNumber:phNumber?phNumber:'',
					photo:photo?photo:'',
					isFavorite:isFavorite,
					isNewContact:isNewContact,
				});
			}
		}catch(error){
			console.error(error);
		}
		this.props.navigation.setParams({
			handleSave: this.addToFavoritesContact,
			//isFavorite: this.state.isFavorite
		});
	}
	componentWillUnmount() {
	
	}
	render() {

		return (
			<View style={styles.container}>

				<View style={{flex:2, alignItems: 'center', justifyContent:'center'}}>
				
					<ImagePicker parentCallback = {this.callbackFunction}
					source={this.state.photo}/>
					<Text>{this.state.photo}</Text>
					
				</View>

				<View style={styles.middleSection}>

					<View style={styles.row}>
						<Text style={styles.rowLabel}>Name: </Text>
						<TextInput
						defaultValue={this.state.name?this.state.name:this.value}
						style={styles.input}        
						autoCapitalize="none"

						onChangeText={val => this.setState({name:val})}	/>
					</View>

					<View style={styles.row}>
						<Text style={styles.rowLabel}>Mobile: </Text>
						<TextInput		
						defaultValue={this.state.mobNumber?this.state.mobNumber:this.value}
						style={styles.input}
						autoCapitalize="none"          
						onChangeText={val => this.onChangeText('mobNumber', val)}
						/>
					</View>

					<View style={styles.row}>
						<Text style={styles.rowLabel}>Landline: </Text>
						<TextInput
						defaultValue={this.state.phNumber?this.state.phNumber:this.value}
						style={styles.input}
						autoCapitalize="none"
						onChangeText={val => this.onChangeText('phNumber', val)}
						/>
					</View>


					{!this.state.isNewContact && <TouchableHighlight  onPress={this.removeContact}>
					<Text style={styles.saveButton}>Delete</Text>
					</TouchableHighlight>}

					{this.state.isUploadingData && <ActivityIndicator size="large" color="#0c9"/>}

				</View>

				<TouchableHighlight  onPress={!this.state.isUploadingData && this.addContact}>
					<Text style={styles.saveButton}> {this.state.isNewContact?'Save':'Update'}</Text>
				</TouchableHighlight>
			</View>
		)
	}
  
  	addToFavoritesContact = () => {
		
		//alert('Add to Favorites list')
		const { name, phNumber, mobNumber, isFavorite, photo,
				 id, isNewContact} = this.state
		console.log(id+"==FAVORITES=this==>"+isFavorite)
		
		if(!name)
			return
		if(!mobNumber)
			return
		
		var inverted = !isFavorite;
		this.props.navigation.setParams({
			 isFavorite: inverted
		   });
		
		console.log(isFavorite+"==FAVORITES=this==>"+inverted)
		this.setState({isFavorite:inverted});
		console.log("Favorites=CC==>"+isFavorite);
		
		let contact = {
			  name,
			  phNumber,
			  mobNumber,
			  isFavorite:inverted,
			  photo,
			  id,
			}
			console.log("FavoritesCon : "+JSON.stringify(contact));
			this.props.favoriteContact(contact);
	}	
	
  	removeContact = async() => {
		
		const{id} = this.state
		console.log("DELETE=this==>"+id)		
		this.props.deleteContact(id);
		this.props.navigation.goBack()
	}	
	
  	addContact = async() => {		
		const { name, phNumber, mobNumber, isFavorite, photo,
				 id, isNewContact} = this.state
				
		var newId='';
		if(isNewContact || id == null || id.length <=0)
			newId = Date.now().toString()
		else {
			newId = id;
		
		}
		if(!name || !mobNumber){
			return; 
		}
		console.log("Name : "+name);
		console.log("Mobile : "+mobNumber);
		console.log("PhoneNumber : "+phNumber);
		console.log("id : "+newId);
		let contact = {
			name,
			phNumber,
			mobNumber,
			isFavorite,
			photo,
			id:newId,
		}
		console.log("Contac : "+JSON.stringify(contact));
		if(isNewContact)
			this.props.createContact(contact);
		else
			this.props.updateContact(contact);
		
		this.props.navigation.goBack();  
	}
	 	
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    updateContact: contact => dispatch(contactAction.updateContact(contact)),
    favoriteContact: contact => dispatch(contactAction.favoriteContact(contact)),
    deleteContact: contact => dispatch(contactAction.deleteContact(contact)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRegister);

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 55,
	flex:4,
	borderColor:'#cdcdcd',
	borderWidth:2,
    margin: 5,
    padding: 8,
    color: '#000',	
    borderRadius: 2,
    fontSize: 18,
    fontWeight: '500',
	
  },
  
  row:{
	flexDirection: 'row',
	marginLeft:16,
	marginRight:16,
	alignItems: 'center',
  },
  rowLabel:{
	fontSize: 18,
	flex:1,
  },
  photo: {	
		width:45,
		height:40,
  },	
  saveButton:{
	backgroundColor:'#cecece',
	fontSize: 18,
	padding:10,
	marginBottom:1,
	borderColor:'#999',
	borderWidth:3,
	textAlign:'center',
	
  },
  middleSection:{
	  flex:4,
	  alignItems: 'center',
  },
  
  container: {
    flex: 1,
	//alignItems: 'center',
   }
})