async function insertOrder() {
	let orderid = document.getElementById('orderid');
	let flag = false;
	let id;
	const insertFormData = formData('insertSalesData');
	insertFormData['orderType'] = '8';
	const insertFormErrorValidation = insertSalesFormValidation(insertFormData);

	// const insertSalesFormValidation = true;
	if (Object.keys(insertFormErrorValidation).length > 0) {
		//----client side validation error
		errorShow(insertFormErrorValidation);
	} else {
		if (orderid.value != '') {
			id = orderid.value;
			url = `/updateSalesOrder`;
		} else {
			url = `/insertSalesOrder`;
		}
		let option = {
			method: 'POST',
			body: new URLSearchParams(insertFormData),
		};
		let result = await commonFetch(url, option);

		if (result.rows.affectedRows != 0 && result != 'not found') {
			flag = true;
		}

		// else if () {
		// 	flag = true;
		// 	id = result.rows.insertId;
		// 	getCategories();
		// }
	}
	console.log(flag);
	if (flag == true) {
		document.getElementById('productOrderId').value = id;
		// document.getElementById('productOrderType').value =
		// 	document.getElementById('orderType').value;
		displayProductForm();
		getCategories();
		fetching();
	}
}

async function generateCombo() {
	const result = await commonFetch('/getCustomers');
	let str;
	result.rows.forEach((data) => {
		str += `<option value="${data.id}">${data.firstname}</option>`;
	});
	document.getElementById('customer').innerHTML = str;
}
generateCombo();


async function getCategories() {
	let result = await commonFetch('/getSalesCategories');
	let str = `<option value="" selected hidden>Select Category</option>`;
	result.rows.forEach((ele) => {
		str += `<option value="${ele.opt_id}">${ele.value}</option>`;
	});
	let arr = document.getElementsByClassName('category');
	for (ele of arr) {
		ele.innerHTML = str;
	}
	 
}


