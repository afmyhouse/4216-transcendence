import { backPost } from './backAPI.js';

export const login = async (username, password) => {
	const data = await backPost('login/', { userNick: username, password: password });
	return data;
};

export const signup = async (username, password) => {
	const data = await backPost('signup/', { userNick: username, password: password });
	return data;
};
