import axios from 'axios'
import {push} from 'react-router-redux'

export const LOGIN = "LOGIN"
export const REGISTER_USER = "REGISTER_USER"
export const SAVE_USER = "SAVE_USER"

export function registerUser(username, password){
    return (dispatch) => {
        dispatch(saveUser(username))
        dispatch(push('/'))
    }
}

export function login(username, password){
    return (dispatch) => {
        dispatch(saveUser(username))
        dispatch(push('/'))
    }
}

export function saveUser(username){
    return {
        type: SAVE_USER,
        token: randomString(username.length)
    }
}

let randomString = (length) => {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
