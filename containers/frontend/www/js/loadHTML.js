/** all major html for the views
 * <NOTE>: Subject to change!
 */

export function modal() {
	return( `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
               <div class="modal-dialog">
                 <div class="modal-content">
                   <div class="modal-header">
                     <h3 class="modal-title" id="staticBackdropLabel">Change your password</h3>
                     <button type="button" class="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                     <form class='m-auto mb-2' id='change-pass'>
                       <div class="form-floating mb-2">
                           <input type="password" class="form-control" id="old-pass"/>
                         <label for="old-pass" class="form-label">Old password</label>
                       </div>
                       <div class="form-floating mb-2">
                         <input type="password" class="form-control" id="new-pass"/>
                         <label for="new-pass" class="form-label">New password</label>
                       </div>
                       <div class="form-floating mb-2">
                         <input type="password" class="form-control" id="retype-pass"/>
                         <label for="retype-pass" class="form-label">Re-enter the password</label>
                       </div>
                     </form>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                     <button type="button" class="btn btn-primary" id="pass-apply-btn">Apply</button>
                   </div>
                 </div>
               </div>
             </div>`);
}

// Tmp gets user as param, this will maybe change if i refactor all this to use classes for the views
export function profile(user) {
	return (`<div class="input-group mb-2" id="pic-container">
                 <img id="profile-img" src='${user.pic}' width="128px" heigth="128px" class="rounded-circle border border-2 mb-2 position-relative start-50 translate-middle-x" alt="User avatar">
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="username" value="${user.username}" disabled/>
                <label for="username" class="form-label">Username</label>
            </div>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" value="${user.username}@example.com" disabled/>
                <label for="email" class="form-label">email</label>
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="firstName" value="John" disabled/>
                <label for="firstName" class="form-label">First name</label>
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="lastName" value="Doe" disabled/>
                <label for="lastName" class="form-label">Last name</label>
            </div>

            <div class="btn-toolbar gap-1" id="profile-btn-container"></div>
`);
}

export function login() {
	return (`<form class="position-absolute top-50 start-50 translate-middle" id="login-form" autocomplete="off">
                 <h1 id="typed-text"></h1>
<div class="container w-25">
                 <div class="form-floating mb-2">
                     <input type="text" class="form-control" id="username" placeholder="username" autocomplete="off" required />
                     <label for="username" class="form-label">Username</label>
                 </div>
                 <div class="form-floating mb-2">
                     <input class="form-control" type="password" id="password" placeholder="password" autocomplete="new-password" required />
                     <label for="password" class="form-label">Password</label>
                 </div>
</div>
<div class="container text-center">
                 <div class="row">
<div class="col">
                     <button class="btn btn-primary" type="submit">Log in</button>
</div>
<div class="col">
                     <button class="btn btn-primary" type="button" id="signup-button">Sign Up</button>
</div>
<div class="col">
                     <button class="btn btn-primary" type="button" id="42Login-button">Local Play</button>
</div>
</div>
<div class="row">
                     <button class="btn btn-primary w-100 mb-1" type="button" id="42Login-button">Login with 42</button>
</div>
</div>
                 </div>
         </form>`);
}

export function signup() {
	return (`<form class="w-25 m-auto" id="signup-form" autocomplete="off">
             <h1 id="typed-text"></h1>
             <div class="row g-2">
                 <div class="col-md">
                     <div class="form-floating mb-2">
                         <input class="form-control" type="text" id="firstName" placeholder="First name" autocomple="off"/>
                         <label for="firstName" class="form-label">First name</label>
                     </div>
                 </div>
                 <div class="col-md">
                     <div class="form-floating mb-2">
                         <input class="form-control" type="text" id="lastName" placeholder="Last name" autocomplete="off"/>
                         <label for="lastName" class="form-label">Last name</label>
                    </div>
                 </div>
             </div>
             <div class="form-floating mb-2">
                 <input class="form-control" type="text" id="username" placeholder="username" minlength="5" autocomplete="off" required />
                 <label for="username" class="form-label">Username</label>
             </div>
             <div class="form-floating mb-2">
                 <input type="email" class="form-control" id="email" placeholder="email@example.com" autocomplete="off" />
                 <label for="email" class="form-label">Email address</label>
             </div>
             <div class="form-floating mb-2">
                 <input class="form-control" type="password" id="password" placeholder="password" maxlength="16" minlength="7" autocomplete="new-password" required />
                 <label for="password" class="form-label">Password</label>
             </div>
             <div class="form-floating mb-2">
                 <input class="form-control" type="password" id="re-password" placeholder="password" required />
                 <label for="re-password" class="form-label">Re-enter your password</label>
             </div>
             <button type="submit" class="btn btn-primary w-100 py-2">Sign Up <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg></button>
         </form>`);	
}

export function alert(alert) {
	return (`<div class="toast fade show bg-${alert.type} bg-opacity-75" role="alert" aria-live="assertive" aria-atomic="true">
	  <div class="toast-header">
		<img src="..." class="rounded me-2" alt="...">
		<strong class="me-auto">Bootstrap</strong>
		<small>${alert.ellapsedTime()} mins ago</small>
		<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
	  </div>
	  <div class="toast-body">${alert.msg}</div>
	</div>`);
}
