import { getCookie } from './utils.js';

const apiURL = 'api/';

// TODO: check if we dont need to validate the response from fetch

export const backPost = async (endpoint, data) => {
	const response = await fetch(`${apiURL}${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		body: JSON.stringify(data),
	});
	
	// TODO: check this, prob not exactly this logic, maybe the status can be different than 200 and the response still usefull, but for now this is the safe check, after calling backPost we check if we have a null return
	if (response.status != 200) {
		return null;
	}
	return response.json();
};

export const backGet = async (endpoint) => {
	const response = await fetch(`${apiURL}${endpoint}`, {
		method: 'GET',
	});
	if (response.status != 200) {
		return null;
	}
	return response.json();
};

export const backPut = async (endpoint, data) => {
	const response = await fetch(`${apiURL}${endpoint}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		body: JSON.stringify(data),
		// TODO: add body of request -> this will be the user information to update
	});
	if (response.status != 200) {
		return null;
	}
	return response.json();
};
