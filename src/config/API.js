import axios from 'axios';
export const url = "https://mhc-be-fakhril.zilog.tech"
export const API = axios.create({baseURL: url+`/api/v1/mhc`});
// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};