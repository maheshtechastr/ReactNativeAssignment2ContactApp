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


export default class EditRegister extends React.Component {
	
  state = {
    username: '', land_line: '', phone_number: '', photo:'',
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
  
  signUp = async () => {
    const { username, land_line, mob_number } = this.state
    try {
		alert('Saved'),
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
	callbackFunction = (childData) => {
		this.setState({photo: childData})
	}

  render() {
	/* 2. Read the params from the navigation state */
	const { params } = this.props.navigation.state;
	const dataItem = params ? params.dataItem : null;
	const isNewContact = params ? params.isNewContact : null;
	
	const {name, photo, mobNumber, isFavorite, phNumber} = dataItem ? dataItem : '';
	
	  
    return (
      <View style={styles.container}>
	  
	  <View style={{flex:2, alignItems: 'center', justifyContent:'center'}}>
		<ImagePicker parentCallback = {this.callbackFunction}
		source={photo}/>
		<Text>{this.state.photo}</Text>
	  </View>
	  
	  <View style={styles.middleSection}>
	  
	  <View style={styles.row}>
	  <Text style={styles.rowLabel}> Name: </Text>
        <TextInput
		  defaultValue={name?name:this.value}
          style={styles.input}        
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
		</View>
	  
	  <View style={styles.row}>
	  <Text style={styles.rowLabel}> Mobile:
	  </Text>
        <TextInput		
		  defaultValue={mobNumber?mobNumber:this.value}
          style={styles.input}
          autoCapitalize="none"          
          onChangeText={val => this.onChangeText('mob_number', val)}
        />
		</View>
		
		<View style={styles.row}>
			<Text style={styles.rowLabel}>Landline: </Text>
			<TextInput
			  defaultValue={phNumber?phNumber:this.value}
			  style={styles.input}
			  autoCapitalize="none"
			  onChangeText={val => this.onChangeText('land_line', val)}
        />
		</View>
		
		{isFavorite && <ActivityIndicator/>}
		
		</View>
		
		<TouchableOpacity  onPress={() => {this.signUp
		alert('Saved')}}>
			<Text style={styles.saveButton}>{isNewContact?'Save':'Update'}</Text>
		</TouchableOpacity>
      </View>
    )
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