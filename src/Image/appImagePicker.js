'use strict';
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {Icon } from 'native-base';
import {  
  StyleSheet, 
  View,  
  Image,  
  Text,
  TouchableOpacity
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        //console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
		this.sendData();
      }
    });
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
	  
    } else {
      return <Image
        source={this.props.source?this.props.source:require('./camera.png')}
        style={styles.images}
      />
    }
  }
  
  sendData = () => {	
	
    this.props.parentCallback(this.state.fileUri);
	console.log('Send Data ImageUri==>'+this.state.fileUri)
  }

  render() {
    return (        	
		<TouchableOpacity onPress={this.chooseImage} >	
			<View style={styles.ImageSections}>
					  
				{this.renderFileUri()}		  
			
			</View>    
		</TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({

  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
	width: 160,
    height: 160,
	borderRadius:100,
	borderColor: 'black',
    borderWidth: 2,
	alignItems: 'center',
  },
  images: {
    width: 120,
    height: 120,  
	borderRadius:100,	
   },
  
});
