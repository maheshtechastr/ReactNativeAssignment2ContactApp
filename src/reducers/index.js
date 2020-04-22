'';
import * as actionTypes from '../actions/types';
import {} from '../actions/index';
import { combineReducers } from 'redux';

const initialState = {
	contactList:[],
	favoriteList:[],
	message:'Empty List',
}

const contacts = (state = initialState, action) => {
	console.log("Reducer : "+JSON.stringify(action));
	switch(action.type){
		case actionTypes.CREATE_NEW_CONTACT:
			return {
				...state,
				contactList: state.contactList.concat(action.contact)
			};
		case actionTypes.REMOVE_CONTACT:
			return {
				...state,
				contactList: state.contactList.filter(contact => contact.id !== action.id),
				favoriteList: state.favoriteList.filter(contact => contact.id !== action.id),
			};
		case actionTypes.FAVORITES_CONTACT:
			
			return {
				...state,
				contactList: state.contactList.map((contact) =>{
					// Find the item with the matching id
					if(contact.id === action.contact.id) {
					  // Return a new object
					  return {
						...contact,  // copy the existing item
						isFavorite: action.contact.isFavorite  // replace the email addr
					  }
					}
				}),
				favoriteList: action.contact.isFavorite? state.favoriteList.concat(action.contact):
				state.contactList.filter(contact => contact.isFavorite === true)
								
			};	
			
		case actionTypes.ALL_FAVORITES_CONTACT:
		console.log("Reducer : ALL_FAVORITES_CONTACT "+JSON.stringify(action));
			return {
				...state,
				favoriteList: state.contactList.filter(contact => contact.isFavorite === true)
			};
			
		case actionTypes.UPDATE_CONTACT:
			
			return {
				...state,
				contactList: state.contactList.map((contact) =>{
					// Find the item with the matching id
					if(contact.id === action.contact.id) {
					  // Return a new object
					  return {
						...contact,  // copy the existing item
						id: action.contact.id,  // replace id 
						isFavorite: action.contact.isFavorite,  
						name: action.contact.name,  
						mobNumber: action.contact.mobNumber, 
						phNumber: action.contact.phNumber, 
						photo: action.contact.photo, 
					  }
					}
				}),					
			};
		default:
			return initialState;
	}
}

// Combine all the reducers
export default combineReducers({
    contacts: contacts
});

