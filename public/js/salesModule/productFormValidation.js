function productFormValidation(productFormData) {
	let productFormErrorObject = {};

	for (let key in productFormData) {
		switch (key) {
			case 'category':
				// console.log(key + " " + productFormData[key]);

				const categoryCombo = document.getElementById('category');

				if (categoryCombo.selectedIndex < 1) {
					productFormErrorObject[key] = '* require';
				} else {
					delete productFormErrorObject[key];
				}
				break;

			case 'product':
				// console.log(key + " " + productFormData[key]);

				const productCombo = document.getElementById('product');

				if (productCombo.selectedIndex < 1) {
					productFormErrorObject[key] = '* require';
				} else {
					delete productFormErrorObject[key];
				}
				break;

			case 'orderType':
				// console.log(key + " " + productFormData[key]);

				const orderTypeCombo = document.getElementById('orderType');

				if (orderTypeCombo.selectedIndex < 0) {
					productFormErrorObject[key] = '* require';
				} else {
					delete productFormErrorObject[key];
				}
				break;

			case 'quantity':
				// console.log(key + " " + productFormData[key]);
				if (productFormData[key].length === 0) {
					productFormErrorObject[key] = '* require';
				} else if (
					productFormData[key].trim().length === 0 &&
					productFormData[key] !== ''
				) {
					productFormErrorObject[key] = '* Please Enter Quantity';
				} else if (isNaN(parseInt(productFormData[key]))) {
					productFormErrorObject[key] = '* Please Enter Valid Quantity';
				} else {
					delete productFormErrorObject[key];
				}
				break;
		}
	}
	return productFormErrorObject;
}
