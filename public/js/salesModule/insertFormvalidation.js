function insertSalesFormValidation(insertFormData) {
	let insertFormErrorObject = {};

	for (let key in insertFormData) {
		switch (key) {
			case 'customer':
				// console.log(key + " " + insertFormData[key]);

				const customerCombo = document.getElementById('customer');

				if (customerCombo.selectedIndex < 0) {
					insertFormErrorObject[key] = '* require';
				} else {
					delete insertFormErrorObject[key];
				}
				break;

			case 'amount':
				// console.log(key + " " + insertFormData[key]);
				if (insertFormData[key].length === 0) {
					insertFormErrorObject[key] = '* require';
				} else if (
					insertFormData[key].trim().length === 0 &&
					insertFormData[key] !== ''
				) {
					insertFormErrorObject[key] = '* Please Enter Amount';
        } else if(isNaN(
          parseInt(insertFormData[key]))) {
					insertFormErrorObject[key] = '* Please Enter Valid Amount';
          }
        else {
					delete insertFormErrorObject[key];
				}
				break;

			case 'shippingAddress':
				// console.log(key + " " + insertFormData[key]);

				if (insertFormData[key].length === 0) {
					insertFormErrorObject[key] = '* require';
				} else if (
					insertFormData[key].trim().length === 0 &&
					insertFormData[key] !== ''
				) {
					insertFormErrorObject[key] = '* Please Enter Lastname';
				} else {
					delete insertFormErrorObject[key];
				}
				break;

			case 'date':
				// console.log(key + " " + insertFormData[key]);

				if (insertFormData[key].length === 0) {
					insertFormErrorObject[key] = '* require';
				} else if (
					insertFormData[key].trim().length === 0 ||
					isNaN(new Date(insertFormData[key]))
				) {
					insertFormErrorObject[key] = '* Please Enter Valid Date';
				} else if (new Date() < new Date(insertFormData[key])) {
					insertFormErrorObject[key] = '* Please Enter Valid Date';
				} else {
					delete insertFormErrorObject[key];
				}
				break;
		}
	}
	return insertFormErrorObject;
}
