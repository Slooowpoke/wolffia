import axios from 'axios'
import {push} from 'react-router-redux'

export const LOGIN = "LOGIN"
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const FETCH_ACCESS_TOKEN = "FETCH_ACCESS_TOKEN"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const CHECK_AUTH_TOKEN = "CHECK_AUTH_TOKEN"

export function checkAuthToken(){
	const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(token){
        return (dispatch) => {
            dispatch(fetchAccessToken)
        }
    }
}

export function login() {
	// fire off to the URL
	const request = axios.get('http://localhost:3000/projects.json')
    
    return {type: LOGIN_REQUEST}
}

var randomString = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function loginRequest() {
	const nonce = randomString(10);
	document.cookie = "nonce=" + nonce;
	window.location.replace("https://github.com/login/oauth/authorize?client_id=65adabfbf851c01bcfab&redirect_uri=http://localhost:3000/callback&scope=user&" + nonce + "&allow_signup=true");
	return {type: LOGIN_REQUEST}
}

export function fetchAccessToken(code) {
	// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
	const nonce = document.cookie.replace(/(?:(?:^|.*;\s*)nonce\s*\=\s*([^;]*).*$)|^.*$/, "$1");

	const data = JSON.stringify({code, nonce})
	const request = axios({method: 'post', url: 'http://liberation-redux.local/auth.php', data});

	return (dispatch) => {
		request.then(({data}) => {
			dispatch(authSuccess(data))
		})
	}
    return {type: FETCH_ACCESS_TOKEN}
}

export function authSuccess(token) {
	return (dispatch) => {
		// Relocate
		dispatch(push(''))
        dispatch(saveToken(token));
	}
}

export function saveToken(token){

    return {
        type: AUTH_SUCCESS,
        token
    }
}
