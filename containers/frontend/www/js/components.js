/**
 * This module will load all common components like:
 *         - avatar dropdown
 *         - sidemenu
 *         - etc...
 */
import { backGet } from './backAPI.js';
import { profile as loadProfileHTML} from './loadHTML.js';
import { alert as loadAlertHTML } from './loadHTML.js';

export async function Dropdown() {
	const username = document.createElement('span');
	const response = await backGet('home/'); // TMP: we wont need this to get the user info cause we should have a class with the user logged in with all needed info, i think.. | maybe we will need this but still save the info somewhere maybe
	if (response.user) {
		const user = response.user;
		username.innerHTML = user.username;
	}
	const dropdown = document.getElementById('dropdown-avatar');
	dropdown.classList.replace('invisible', 'visible');
	document.getElementById('avatar-menu').insertAdjacentElement('beforeend', username);
}

export function title(text) {
	let title = document.createElement('h1');
	title.id = "typed-text";
	title.innerText = text;
	return title;
}

export function userProfile(user) {
	let userProfile = document.createElement('form'); // TODO: move to a function
	userProfile.className = 'position-absolute start-50 top-50 translate-middle w-auto m-auto mb-2';
	userProfile.setAttribute('id', 'profile-form');
	// TODO: Move the user image to some sort of sidebar or something, kinda like intra and make it so it opens a menu to go to settings and profile
	userProfile.innerHTML = loadProfileHTML(user);
	userProfile.insertAdjacentElement('afterbegin', title('Profile'));
	return userProfile;
}

export function button(id, text, className = 'btn-primary') {
	let button = document.createElement('button');
	button.type = 'button';
	button.id = id;
	button.className = `w-100 btn ${className}`;
	button.innerHTML = text;
	return button;
}
