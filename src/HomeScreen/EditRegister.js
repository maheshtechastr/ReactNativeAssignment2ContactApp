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
import firebase from '../Firebase/Firebase';


export default class EditRegister extends React.Component {
	

  state = {
    name: '', phNumber: '', mobNumber: '', photo:'',
	isFavorite:false,
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
		this.setState({photo: childData})
	}
	
	componentDidMount(){
		/* 2. Read the params from the navigation state */
		const { params } = this.props.navigation.state;
		const dataItem = params ? params.dataItem : null;
		const {name, photo, mobNumber, isFavorite, phNumber} = dataItem ? dataItem : '';
		
		this.setState({
			name:name,
			mobNumber:mobNumber,
			phNumber:phNumber,
			photo:photo,
			isFavorite:isFavorite,
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
		
		{this.state.isFavorite && <ActivityIndicator/>}
		
		</View>
		
		<TouchableOpacity  onPress={this.addContact}>
			<Text style={styles.saveButton}>{isNewContact?'Save':'Update'}</Text>
		</TouchableOpacity>
      </View>
    )
  }
  
  	addContact = () => {		
		//const { name, phNumber, mobNumber, isFavorite } = this.state
		  //alert('user==>'+Date.now())
		  //var id = Date.now().toString()
		  firebase.database().ref('contacts/001').set({
			id:'00001',
			name:'ram',
			mobNumber:'98765431',
			phNumber:'98765434567',
			photo:'images',
		}).then((data)=>{
			//success callback
			console.log('data ' , data)
		}).catch((error)=>{
			//error callback
			console.log('error ' , error)
		})
	}
}

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