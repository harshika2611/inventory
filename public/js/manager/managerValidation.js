function manageManagerFormValidation(data) {
	let customerFormErrorObject = {};
	for (let key in data) {
		switch (key) {
			case 'firstname':
		
				if (data[key].length === 0) {
					customerFormErrorObject[key] = '* require';
				} else if (data[key].trim().length === 0 && data[key] !== '') {
					customerFormErrorObject[key] = '* Please Enter Firstname';
				} else {
					delete customerFormErrorObject[key];
				}
				break;

			case 'lastname':
		

				if (data[key].length === 0) {
					customerFormErrorObject[key] = '* require';
				} else if (data[key].trim().length === 0 && data[key] !== '') {
					customerFormErrorObject[key] = '* Please Enter Lastname';
				} else {
					delete customerFormErrorObject[key];
				}
				break;

			case 'email':
			

				const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

				if (data[key].length === 0) {
					customerFormErrorObject[key] = '* require';
				} else if (!regexemail.test(data[key]) && data[key] !== '') {
					customerFormErrorObject[key] = '* Please Enter Valid Email';
				} else {
					delete customerFormErrorObject[key];
				}
				break;

			case 'dob':
				const regexDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
				if (data[key]) {
					if (!regexDate.test(data[key]) && data[key] !== '') {
						customerFormErrorObject[key] = '* Please Enter Valid date';
					} else {
						delete customerFormErrorObject[key];
					}
				} else {
					delete customerFormErrorObject[key];
				}
				break;

			case 'state':
				

				const stateSelectCombo = document.getElementById('state');
				if (stateSelectCombo.selectedIndex < 1) {
					customerFormErrorObject[key] = '* require';
				} else {
					delete customerFormErrorObject[key];
				}
				break;
		}
	}

	return customerFormErrorObject;
}
