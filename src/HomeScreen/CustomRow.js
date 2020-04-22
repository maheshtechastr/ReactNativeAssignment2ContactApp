'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';


const CustomRow = ({ name, mobNumber, photo, isFavorite, item, navigation }) => (

	<TouchableOpacity onPress={() => {
		console.log("CustomRow isFavorite==>"+isFavorite);
		navigation.navigate('EditScreen',
	{title: 'Edit Contact',dataItem: item, isNewContact:false, isFavorite})}}>
    <View style={styles.container}>
        <Image 
		source={ photo? { uri: photo }:require('../Image/image2.png') } 
				
		style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
               Name: {name}
            </Text>
            <Text style={styles.description}>
                Mobile: {mobNumber}
            </Text>
        </View>

    </View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:26,
        marginRight:26,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 5,
        backgroundColor: '#FF0',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
		
    },
    photo: {
		backgroundColor:'#ccc',
		borderRadius:100,
		borderWidth:2,
		borderColor:'#555',
        height: 50,
        width: 50,
    },
});

export default CustomRow;