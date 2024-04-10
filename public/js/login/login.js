const patterns = {
	email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
};

const validation = {
	login: {
		email: {
			required: true,
			pattern: patterns.email,
		},
		password: {
			required: true,
		},
	},
};
function checkValidation(body, validation) {
	for (const arr of Object.entries(validation)) {
		const field = arr[0];
		const obj = arr[1];
		if (obj.required) {
			if (!body[field]) {
				return {
					status: 'error',
					message: `${field} is required`,
					field,
				};
			}
		}
	}
}
function loginValidation() {
	clearErrors();
	let data = {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value,
	};
	let validateResult = checkValidation(data, validation.login);
	console.log(validateResult);

	if (validateResult.status == 'error') {
		let field = document.getElementById(validateResult.field);
		console.log(validateResult.field);
		let a = document.createElement('div');
		a.setAttribute('id', 'error');
		a.textContent = validateResult.message;
		a.style.color = 'red';
		field.parentElement.appendChild(a);
		field.classList.add('on');
		if (validateResult.field == 'email') {
			document.getElementById('email').after(a);
		} else {
			// document.getElementById('password').after(a);
		}
	}
	return false;
}
function clearErrors() {
	let field = document.querySelector('.on');
	field?.classList.remove('on');
	field?.parentElement.removeChild(field.parentElement.lastChild);
}
