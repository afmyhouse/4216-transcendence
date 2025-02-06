/**
 * Module to handle routes using the routes obj and the defined funcs
 * <NOTE>: For now some until funcs like loadLoginHTML and others are defined here but they will be moved to a different module later
 */

import { signup, login } from './authentication.js';
import { typeText, displayToast } from './utils.js';
import *  as backend from './backAPI.js';
import * as components from './components.js';
import * as loadHTML from './loadHTML.js';

const app = document.getElementById('app');

const loadSettings = () => {
	components.Dropdown();
	app.innerHTML = "<h1 id='typed-text'>Settings";
};

const loadHome = () => {
	// will load main screen after login
	// prob add sidebar, stuff like that
	// idea is add div using functions, so for example, loadTournaments will add/edit a div that contains the available tournaments if we are in the user page this will probably add tournament history, etc..
	components.Dropdown();
	app.innerHTML = "<h1 id='typed-text'>MAIN PAGE</h1>";
};

// TODO: Revisit this => check if this is supposed to be async and result await
const loadLogout = async () => {
	const result = await backend.backGet('logout/');
	// NOTE: here maybe we need to set some sort of not authenticated flag that we check when showing the other pages - basically !authenticated show error and take user to login
	if (result) {
		if (result.success) {
			displayToast(result.success, 'alert-success');
			navigateTo('/');
		}
	}
	// TODO: deal with error while logging out
	displayToast("NOT COMPLETE", 'alert-info');
	navigateTo('/'); // REMOVE:
};

/**
 * TODO:
 * Clean this mess 80 lines for a function is just crazy;
 * can abstract the main html to a function;
 * can move the change between view profile and change profile to another function
 * need to fix the layout of most of the page, cause honestly theres no layout yet
 */
const loadProfile = async () => {
	// NOTE: we prob need a different view to check other user profiles, how to do that no clue for now but we need to be able to click a user avatar/name/search it in a search bar and go to their `dashboard`/`profile` like page
	const result = await backend.backGet('profile');
	components.Dropdown();
	if (result && result.error) { // NOTE: I do need to check if the result is fine but i cannot simply return, i prob need to give an error and redirect to another page, why would there be an error, no clue for now
		displayToast(result.error, 'alert-danger');
		navigateTo('/');
		return;
	}
	let user = undefined;
	if (result) {
		user = result.user;	
	} else {
		user = {};
	}
	const userProfile = components.userProfile(user);
	app.insertAdjacentHTML("beforebegin", loadHTML.modal());
	const passApplyBtn = document.getElementById("pass-apply-btn");
	passApplyBtn.addEventListener('click', async (e) => {
		// TODO: adapt display toast to work with alerts inside modals like this one, or change the way we create alerts in general
		e.preventDefault();
		const oldPass = document.getElementById("old-pass"); // TODO: verify that old pass is correct
		const newPass = document.getElementById("new-pass");
		const retypePass = document.getElementById("retype-pass");
		if (newPass.value != retypePass.value) {
			displayToast('Mismatch password', 'alert-danger');
			newPass.value = "";
			retypePass.value = "";
			oldPass.value = "";
			return;
		}
		const response = await backend.backPut("profile/", newPass);
		
		if (response.success) {
			document.getElementById("close-modal").click();
		}
	});
	const debugMsg = document.getElementById('debug-msg');
	app.removeChild(debugMsg);
	app.insertAdjacentElement('afterbegin', userProfile);
	const buttons = document.getElementById('profile-btn-container');
	app.insertAdjacentElement('afterbegin', userProfile);
	const editButton = components.button('edit-profile-btn', 'Edit Profile');
	const passButton = components.button('change-pass-btn', 'Change Password');
	passButton.setAttribute('data-bs-toggle', 'modal');
	passButton.setAttribute('data-bs-target', '#staticBackdrop');
	buttons.insertAdjacentElement('afterbegin', editButton);
	buttons.insertAdjacentElement('afterbegin', passButton);
	// TODO: move to func
	editButton.addEventListener('click', (e) => {
		e.preventDefault();
		buttons.removeChild(editButton);
		const inputFields = document.querySelectorAll('#profile-form .form-control');
		inputFields.forEach(e => {
			e.removeAttribute('disabled');
		});
		// const btns = document.querySelector('.button-container');
		const cancelButton = components.button('cancel-btn', 'cancel', 'btn-danger');
		const applyButton = components.button('apply-btn', 'Apply changes');
		applyButton.setAttribute('type', 'submit');
		let profileImg = document.getElementById('profile-img');
		let profileImgBox = document.getElementById('pic-container');

		const profileImgInput = document.createElement('input');
		profileImgInput.setAttribute('type', 'file');
		profileImgInput.className = 'form-control';
		profileImgBox.replaceChild(profileImgInput, profileImg);
		buttons.insertAdjacentElement('beforeend', cancelButton);
		buttons.insertAdjacentElement('beforeend', applyButton);
		// TODO: move to func (apply changes to profile)
		applyButton.addEventListener('click', async (e) => {
			e.preventDefault();
			const newInfo = { userNick: document.getElementById('username').value, email: document.getElementById('email').value, firstName: document.getElementById('firstName').value, lastName: document.getElementById('lastName').value, picPath: profileImgInput.files[0] };
			const result = await backend.backPut('profile/', newInfo);
			if (result.success) { // NOTE: send alert to inform success and update new user info (we prob get the user info back from backend as a response)
				displayToast(result.success, 'alert-success');
				buttons.insertAdjacentElement('beforeend', editButton);
				buttons.removeChild(applyButton);
				buttons.removeChild(cancelButton);
				profileImgBox.replaceChild(profileImg, profileImgInput);
				inputFields.forEach(e => {
					e.setAttribute('disabled', 'true');
				});
			}
			if (result.error) {
				displayToast(result.error, 'alert-danger');
			}
		});
		// Cancel profile editing by clicking the pressing btn
		// TODO: move to function
		cancelButton.addEventListener('click', async (e) => {
			e.preventDefault();
			buttons.insertAdjacentElement('beforeend', editButton);
			buttons.removeChild(applyButton);
			buttons.removeChild(cancelButton);
			profileImgBox.replaceChild(profileImg, profileImgInput);
			inputFields.forEach(e => {
				e.setAttribute('disabled', 'true');
			});
		});
		// Cancel profile editing by pressing escape key
		document.addEventListener("keydown", (e) => {
			e.preventDefault();
			if (e.code != "Escape") {
				return ;
			}
			buttons.insertAdjacentElement('beforeend', editButton);
			buttons.removeChild(applyButton);
			buttons.removeChild(cancelButton);
			profileImgBox.replaceChild(profileImg, profileImgInput);
			inputFields.forEach(e => {
				e.setAttribute('disabled', 'true');
			});
		});
	});
};


const loadLogin = () => {
	app.innerHTML = loadHTML.login();
	typeText("transcendence");
	// TODO: change this so that login form is a component we get from components.js | we can call a function to create a form with variable 
	const loginForm = document.getElementById('login-form');
	const createCookie = backend.backGet('login/');
	if (createCookie.error) {
		return;
	}
	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const result = await login(username, password);
		if (result == null) { // TMP: quick fix so we get no major errors
			console.warn("Backend not implemented");
		}
		if (result.error) {
			displayToast(result.error, 'alert-danger');
			document.getElementById('username').value = '';
			document.getElementById('password').value = '';
		} else if (result.success) {
			displayToast(result.success, 'alert-success');
			const results = await backend.backGet('home/');
			if (results) {
				navigateTo('/home'); // TODO: this has to change
			}
		}
	});
	// Handle user pressing signup button in login page
	const signup = document.getElementById('signup-button');
	if (signup) {
		signup.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('/signup');
		});
	}

	// Handle user pressing login42 button on login page
	const login42 = document.getElementById('42Login-button');
	if (login42) {
		login42.addEventListener('click', async (e) => {
			e.preventDefault();
			navigateTo('/login42');
		});
	}
};

// TODO: Check if we need to have a fallback page or alert in case of error
const login42 = async () => {
	const result = await backend.backGet('login42/');
	if (result.redirect) {
		window.location.href = result.redirect;
	}
};

const loadSignup = () => {
	app.innerHTML = loadHTML.signup();
	typeText("transcendence");
	const signupForm = document.getElementById('signup-form');
	signupForm.addEventListener('submit', async (e) => {
		// TODO: move this to a funct and called in the event listener
		e.preventDefault();
		const username = document.getElementById('username').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const re_password = document.getElementById('re-password').value;
		if (password !== re_password) {
			displayToast("Missmatch Passwords", "alert-danger");
			document.getElementById('password').value = "";
			document.getElementById('re-password').value = '';
			return;
		}
		const result = await signup(username, password, email);
		if (!result) {
			console.error("NO BACKEND IMPLEMENTED"); // REMOVE:
		} else {
			if (result.error) {
				displayToast(result.error, "alert-danger");
				// TODO: this could be change to just query all inputs and loop them setting their values to empty
				document.getElementById('username').value = '';
				document.getElementById('email').value = '';
				document.getElementById('password').value = '';
				document.getElementById('re-password').value = '';
				
			} else if (result.success) {
				displayToast(result.success, "alert-success");
				navigateTo('/');
			}
		}
	});
};

const load404 = () => {
	document.body.innerHTML = "<h1>Page Not Found</h1>"; // TMP: tmp page change for a proper 404 page, honestly i dont think the user will encounter this very often
};

// TODO: change this so that we get the page load from backend
const loadLocal = () => {
	const result = backGet();
	document.body.innerHTML = `<h1>LOCAL PONG</h1><p>NOT IMPLEMENTED YET</p>
<div class='btn-group gap-1'><button class='btn btn-primary'>vs CPU</button><button class='btn btn-primary'>vs Player</button></div>
`;
	// document.body.innerHTML = result.HTML;
};

const testHTML = () => {
	document.body.innerHTML = `
<div class="position-absolute start-50 top-50 translate-middle container mt-3">
  <div class="row mb-2">
    <div class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary-emphasis text-center">USER box</strong>
                <p class="card-text mb-auto">
                    <img src="../media/default.png" width="32" height="32" class="border border-2 d-inline-block align-text-center rounded-circle"><a class="link" href="profile">TEST USER</a><a> LEVEL(XP)</a>
                </p>
                <p>INSERT LAST 3 GAMES STATS HERE OR SOMETHING SIMILAR</p>
                    <div class="card-group">
                      <div class="card">
                        <div class="card-title ms-1 text-primary-emphasis">Game 1</div>
                          <div class="card-body text-center">
                            <p>dd/mm/yyyy - HH:MM</p>
                            <img src="" width="32" height="32">
<a class="link" href="#USER1">USER1</a></img>
                            <br>vs</br>
                            <img src="" width="32" height="32">
                              <a class="link text-center" href="#USER2">USER2</a>
                            </img>
                        </div>
                        <div class="card-footer text-center">Score: USER1 vs USER2</div>
                      </div>
                      <div class="card">
                        <div class="card-title ms-1 text-primary-emphasis">Game 2</div>
                        <div class="card-body text-center">
                            <p>dd/mm/yyyy - HH:MM</p>
                            <img src="" width="32" height="32">
<a class="link" href="#USER1">USER1</a></img>
                            <br>vs</br>
                            <img src="" width="32" height="32">
                              <a class="link text-center" href="#USER2">USER2</a>
                            </img>
                        </div>
                        <div class="card-footer text-center">Score: USER1 vs USER2</div>
                      </div>
                      <div class="card">
                       <div class="card-title ms-1 text-primary-emphasis">Game 3</div>
                         <div class="card-body text-center">
                            <p>dd/mm/yyyy - HH:MM</p>
                            <img src="" width="32" height="32">
                              <a class="link" href="#USER1">USER1</a>
                            </img>
                            <br>vs</br>
                            <img src="" width="32" height="32">
                              <a class="link text-center" href="#USER2">USER2</a>
                            </img>
                      </div>
                        <div class="card-footer text-center">Score: USER1 vs USER2</div>
                    </div>
</div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                   Available for random matches
                  </label>
                </div>
                <a class="link" href="profile">See your profile...</a>
            </div>
        </div>
    </div>
        <div class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden row mb-4 shadow-sm h-md-250 position-relative">
            GAME box
            <div class="btn-group gap-1 mb-2 text-nowrap" role="group">
                <button class="btn btn-primary">Vs Player</button>
                <button class="btn btn-primary">Vs CPU</button>
                <button class="btn btn-primary">Enter a tournament</button>
            </div>
        </div>
    </div>
  </div>
</div>
<canvas id="canvas" height="300" width="300" class="position-absolute start-50 top-50 translate-middle z-n1 w-50">The current time</canvas>`;
	function clock() {
		let height = 300;
		let width = 300;
		const now = new Date();
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
		ctx.save();
		ctx.clearRect(0, 0, width, height);
		ctx.translate(width/2, height/2);
		ctx.scale(0.4, 0.4);
		ctx.rotate(-Math.PI / 2);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.lineWidth = 8;
		ctx.lineCap = "round";

		// Hour marks
		ctx.save();
		for (let i = 0; i < 12; i++) {
			ctx.beginPath();
			ctx.rotate(Math.PI / 6);
			ctx.moveTo(100, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.restore();
		
  // Minute marks
		ctx.save();
		ctx.lineWidth = 5;
		for (let i = 0; i < 60; i++) {
			if (i % 5 !== 0) {
				ctx.beginPath();
				ctx.moveTo(117, 0);
				ctx.lineTo(120, 0);
				ctx.stroke();
			}
			ctx.rotate(Math.PI / 30);
		}
		ctx.restore();
		
		const sec = now.getSeconds();
		// To display a clock with a sweeping second hand, use:
		// const sec = now.getSeconds() + now.getMilliseconds() / 1000;
		const min = now.getMinutes();
		const hr = now.getHours() % 12;
		
		ctx.fillStyle = "black";
		
		// Write image description
		canvas.innerText = `The time is: ${hr}:${min}`;
		
		// Write Hours
		ctx.save();
		ctx.rotate(
			(Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
		);
		ctx.lineWidth = 14;
		ctx.beginPath();
		ctx.moveTo(-20, 0);
		ctx.lineTo(80, 0);
		ctx.stroke();
		ctx.restore();
		
		// Write Minutes
		ctx.save();
		ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo(-28, 0);
		ctx.lineTo(112, 0);
		ctx.stroke();
		ctx.restore();

		// Write seconds
		ctx.save();
		ctx.rotate((sec * Math.PI) / 30);
		ctx.strokeStyle = "#D40000";
		ctx.fillStyle = "#D40000";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(-30, 0);
		ctx.lineTo(83, 0);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fillStyle = "rgb(0 0 0 / 0%)";
		ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.restore();

		ctx.beginPath();
		ctx.lineWidth = 14;
		ctx.strokeStyle = "#325FA2";
		ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
		ctx.stroke();

		ctx.restore();

		window.requestAnimationFrame(clock);
	}

	window.requestAnimationFrame(clock);

};

// Available routes and corresponding funcs to load them
export const routes = {
	'/': loadLogin,
	'/signup': loadSignup,
	'/logout': loadLogout,
	'/home': loadHome,
	'/profile': loadProfile,
	'/login42': login42,
	'/settings': loadSettings,
	'/404': load404,
	'/play': loadLocal,
	'/test': testHTML,
};

// Function to handle the current route
export const handleLocation = () => {
	const path = window.location.pathname;
	const route = routes[path] || routes['/404'];  // Fallback to 404 if route not found
	route();
};

// Function to navigate to a new route
export const navigateTo = (path) => {
	window.history.pushState({}, path, window.location.origin + path);
	handleLocation();
};
