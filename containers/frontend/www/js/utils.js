export const typeText = async (text) => {
    const h1Text = document.getElementById("typed-text");
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            h1Text.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval); // Clear the interval once typing is done
            blinkUnderscore(); // Call blink function after typing
        }
    }, 60);
};

function blinkUnderscore() {
    const underscore = document.createElement('span');
    underscore.innerText = "_";
    document.getElementById("typed-text").appendChild(underscore);
    underscore.id="underscore";
    setInterval(() => {
        underscore.style.visibility = (underscore.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 500);
}

export const displayToast = (message, alertClass) => {
	const myToast = document.createElement('div');
	myToast.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
	myToast.className = `alert ${alertClass} alert-dismissible fade show`;
	myToast.setAttribute('role', 'alert');
	document.body.insertAdjacentElement('afterbegin', myToast);
	setTimeout(() => {
		if (document.body.contains(myToast)) {
			document.body.removeChild(myToast);
		}
	}, 1500);
};

export const getCookie = (name) => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for  (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

