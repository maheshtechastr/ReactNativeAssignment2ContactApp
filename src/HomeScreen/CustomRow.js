'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';


const CustomRow = ({ name, mobNumber, photo, isFavorite, item, navigation }) => (

	<TouchableOpacity onPress={() => {navigation.navigate('EditScreen', {title: 'Edit Contact',dataItem: item, isNewContact:false})}}>
    <View style={styles.container}>
        <Image 
		//source={{ uri: photo }} 
		//source={ {photo }} 
		source={ require('../Image/image2.png') } 
				
		style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
               Name: {name}
            </Text>
            <Text style={styles.description}>
                Mobile: {photo}
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
        backgroundColor: '#FFF',
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
		
        height: 50,
        width: 50,
    },
});

export default CustomRow;