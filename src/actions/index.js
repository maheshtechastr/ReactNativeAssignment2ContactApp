'';
//import {CREATE_NEW_CONTACT, REMOVE_CONTACT} from './types.js';
import * as actionTypes from './types.js';

export const createContact = (contact) => {
	console.log("ACTION CREATE_NEW_CONTACT==>"+contact);
	return {
		type : actionTypes.CREATE_NEW_CONTACT,
		contact : contact,
	}
}

export const updateContact = (contact) => {
	console.log("ACTION UPDATE_CONTACT==>"+contact);
	return {
		type : actionTypes.UPDATE_CONTACT,
		contact : contact,
	}
}

export const deleteContact = (id) => {
	console.log("ACTION REMOVE_CONTACT ==>"+id);
	return {
		type : actionTypes.REMOVE_CONTACT,
		id : id,
	}
}

export const favoriteContact = (contact) => {
	console.log("ACTION FAVORITES_CONTACT ==>"+contact);
	return {
		type :actionTypes.FAVORITES_CONTACT,
		contact : contact,
	}
}

export const allFavoriteContact = () => {
	console.log("ACTION ALL_FAVORITES_CONTACT ==>");
	return {
		type :actionTypes.ALL_FAVORITES_CONTACT,
		
	}
}


