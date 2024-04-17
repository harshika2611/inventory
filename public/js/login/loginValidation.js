function loginFormValidation(data) {
	let loginError = {};
	for (let key in data) {
		switch (key) {
			case 'email':
				const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

				if (data[key].length === 0) {
					loginError[key] = '* require';
				} else if (!regexemail.test(data[key]) && data[key] !== '') {
					loginError[key] = '* Please Enter Valid Email';
				} else {
					delete loginError[key];
				}
				break;
			case 'password':
				const regexPass =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
				if (data[key].length === 0) {
					loginError[key] = '* require';
				} else if (!regexPass.test(data[key]) && data[key] !== '') {
					loginError[key] = 'please enter valid password';
				} else {
					delete loginError[key];
				}
				break;
		}
	}
	return loginError;
}
