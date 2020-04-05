'use strict';
import React from 'react'
import {
	Text,
	View,
	Button,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Image,
	ActivityIndicator,
} from 'react-native'

import ImagePicker from '../Image/appImagePicker';
import {firebase} from '../Firebase/Firebase';
import Realm from 'realm';

export default class EditRegister extends React.Component {
	

  state = {
	id:'',
	name: '', phNumber: '', mobNumber: '', photo:'',
	isFavorite:false,
	isUploadingData:false,
	realm:null,
	isNewContact:false,
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'gray',
        },
		headerRight: () => (
		
			<TouchableOpacity onPress={this.addToFavoritesContact}>
				<Image              
				  source={navigation.state.params.isFavorite?
				  require('../Image/favoriteActive.png'):require('../Image/favoriteInActive.png')}
				  style={styles.photo}
				/>			
			</TouchableOpacity>
          )
    });
	
	onChangeText = (key, val) => {
		this.setState({ [key]: val })
	}
	
	callbackFunction = (childData) => {
		var obj = JSON.parse(childData);
		console.log('URI==>'+obj.uri)
		this.setState({photo: obj.uri})
	}
	
	componentDidMount(){
		console.info('componentDidMount==>'+firebase)
		/* 2. Read the params from the navigation state */
		const { params } = this.props.navigation.state;
		const dataItem = params ? params.dataItem : null;
		const isNewContact = params ? params.isNewContact : false;
		const {name, photo, mobNumber, isFavorite, phNumber} = dataItem ? dataItem : '';
		
		this.setState({
			dataItem:dataItem?dataItem:null,
			name:name?name:'',
			mobNumber:mobNumber?mobNumber:'',
			phNumber:phNumber?phNumber:'',
			photo:photo?photo:'',
			isFavorite:isFavorite?isFavorite:false,
			isNewContact:isNewContact?isNewContact:false,
		})
		//Realm Database config
		Realm.open({
		  schema: [ContactSchema], schemaVersion: 1
		}).then(realm => {
			console.log('DB Created')
		  this.setState({ realm });
		  console.log('Successfully')
		})
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
	  <Text style={styles.rowLabel}> Name: </Text>
        <TextInput
		  defaultValue={this.state.name?this.state.name:this.value}
          style={styles.input}        
          autoCapitalize="none"
         
          onChangeText={val => this.setState({name:val})}
        />
		</View>
	  
	  <View style={styles.row}>
	  <Text style={styles.rowLabel}> Mobile:
	  </Text>
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
		
		
		{!this.state.isNewContact && <TouchableOpacity  onPress={this.removeContact}>
			<Text style={styles.saveButton}>Delete</Text>
		</TouchableOpacity>}
		
		{this.state.isUploadingData && <ActivityIndicator size="large" color="#0c9"/>}
		
		
		</View>
		
		<TouchableOpacity  onPress={!this.state.isUploadingData && this.addContact}>
			<Text style={styles.saveButton}>{this.state.isNewContact?'Save':'Update'}</Text>
		</TouchableOpacity>
      </View>
    )
  }
  
  	addToFavoritesContact = async() => {
		alert('Add to Favorites list');
		const{id, realm, isFavorite} = this.state;
		console.log("FAVORITES=this==>")
		
		realm.write(() => {
		  Contact.isFavorite = !isFavorite;
		});

		this.setState({isFavorite:!isFavorite})
		console.log("Favorites=CC==>"+isFavorite)
		
	}	
  	removeContact = async() => {
		
		const{id, realm, dataItem} = this.state
		console.log("DELETE=this==>"+dataItem)
		var contacts = realm.objects('Contact')
		 var contactDel = contacts.filtered("id ='"+id+"'");
		 console.log("DELETE=BB==>"+JSON.stringify(contactDel))
		// Delete the book
		realm.delete(contactDel);
		console.log("DELETE=CC==>"+contactDel)
		this.props.navigation.goBack()
	}	
  	addContact = async() => {		
		const { name, phNumber, mobNumber, isFavorite, photo,
				realm, id, isNewContact} = this.state
				var newId='';
		  if(isNewContact)
			newId = Date.now().toString()
			else
				newId = id
		 if(!name){
			return; 
		 }
		  this.setState({
			  isUploadingData:true
		  })
		  realm.write(() => {
				const contact = realm.create('Contact', 
					{
						id:newId,
						name: name,
						phNumber:phNumber,
						mobNumber:mobNumber,
						photo:photo,
						isFavorite:isFavorite,
					});
					this.setState({isUploadingData:false})
				console.log("contacts ==>"+JSON.stringify(contact));
		  });
			  
	}
	 
	componentWillUnmount() {
		// Close the realm if there is one open.
		const {realm} = this.state;
		if (realm !== null && !realm.isClosed) {
		  realm.close();
		}
	}
}
	
	const ContactSchema = {
	  name: 'Contact',
	  properties: {
		id:     'string',
		name:     'string',
		phNumber: 'string?', //optional property
		mobNumber: 'string', // required property
		photo:  'string?',  // optional property
		isFavorite:  'bool'  //  property
	  }
	};
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