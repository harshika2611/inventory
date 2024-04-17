function forgotFormValidation(data) {
	let forgotError = {};
	for (let key in data) {
	
		switch (key) {
			case 'email':
				const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

				if (data[key].length === 0) {
					forgotError[key] = '* require';
				} else if (!regexemail.test(data[key]) && data[key] !== '') {
					forgotError[key] = '* Please Enter Valid Email';
				} else {
					delete forgotError[key];
				}
				break;
			case 'new_pass':
				const regexPass =
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
				if (data[key].length === 0) {
					forgotError[key] = '* require';
				} else if (!regexPass.test(data[key]) && data[key] !== '') {
					forgotError[key] = 'please enter valid password';
				} else {
					delete forgotError[key];
				}
				break;
		}
	}

	return forgotError;
}
