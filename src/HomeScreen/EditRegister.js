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
    name: '', phNumber: '', mobNumber: '', photo:'',
	isFavorite:false,
	isUploadingData:false,
	imageObj:null,
	realm:null,
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'gray',
        },
		headerRight: () => (
		<TouchableOpacity onPress={() => alert('This is a Favorites button!')}>
            <Image              
              source={require('../Image/favoriteInActive.png')}
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
		this.setState({photo: obj.uri,
		imageObj:obj,})
	}
	
	componentDidMount(){
		console.info('componentDidMount==>'+firebase)
		/* 2. Read the params from the navigation state */
		const { params } = this.props.navigation.state;
		const dataItem = params ? params.dataItem : null;
		const {name, photo, mobNumber, isFavorite, phNumber} = dataItem ? dataItem : '';
		
		this.setState({
			name:name?name:'',
			mobNumber:mobNumber?mobNumber:'',
			phNumber:phNumber?phNumber:'',
			photo:photo?photo:'',
			isFavorite:isFavorite?isFavorite:false,
		})
		//Realm Database config
		Realm.open({
		  schema: [ContactSchema]
		}).then(realm => {
			console.log('DB Created')
		  this.setState({ realm });
		  console.log('Successfully')
		})
	}
	
  render() {
		/* 2. Read the params from the navigation state */
		const { params } = this.props.navigation.state;
		const isNewContact = params ? params.isNewContact : false;
	
		
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
		
		{this.state.isUploadingData && <ActivityIndicator/>}
		
		</View>
		
		<TouchableOpacity  onPress={!this.state.isUploadingData && this.addContact}>
			<Text style={styles.saveButton}>{isNewContact?'Save':'Update'}</Text>
		</TouchableOpacity>
      </View>
    )
  }
  
  	addContact = async() => {		
		const { name, phNumber, mobNumber, isFavorite, photo,
				imageObj} = this.state
		  var id = Date.now().toString()
		 if(!name){
			return; 
		 }
		  this.setState({
			  isUploadingData:true
		  })
		  this.uriToBlob(photo)
		  .then((blob)=>{
			  
			  return this.uploadToFirebase(blob, id+".jpg");

			}).then((snapshot)=>{
				return snapshot.ref.getDownloadURL();
			})
			.then((downloadURL)=>{

			  console.log("File uploaded==>"+downloadURL);
			  
			   return firebase.database().ref('contacts/').list.push({
					id,
					name,
					mobNumber,
					phNumber,
					isFavorite,
					photo:downloadURL,
				});
				
			})
			.then((data)=>{
					//success callback
					console.log('success' , data)
					this.setState({
					  isUploadingData:false,
					  name:'',
					  mobNumber:'',
					  phNumber:'',
					  photo:'',
					  isFavorite:false,
				  })
				})
			.catch((error)=>{
				console.log(error);
			  //throw error;
			  this.setState({
				isUploadingData:false,
			  })
				alert("Oops!, Unable to Add Contact, please try again.");
			}); 	
			  
	}
	
	uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = (blob, fileName) => {

    return new Promise((resolve, reject)=>{

      var storageRef = firebase.storage().ref();

      storageRef.child('contacts/'+fileName).put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });

    });

  }  

}
	
	const ContactSchema = {
	  name: 'Contact',
	  properties: {
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