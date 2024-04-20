async function insertOrder() {
	let orderid = document.getElementById('orderid');
	let flag = false;
	let isInsert = false;
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
			isInsert = true;
		}
		let option = {
			method: 'POST',
			body: new URLSearchParams(insertFormData),
		};
		let result = await commonFetch(url, option);

		if (result.rows.affectedRows != 0 && result != 'not found') {
			flag = true;
		}
		if (isInsert == true) {
			id = result.rows.insertId;
		}
	}
	if (flag == true) {
		document.getElementById('productOrderId').value = id;
		displayProductForm();
		await getCombos('productCategory');
		console.log(document.getElementById('productCategory').value);
		await getallProducts();
		fetching();
	}
}

async function getcustomer() {
	const result = await commonFetch('/getCustomers');
	generateCombo(result.rows, 'customer');
}
getcustomer();

async function generateCombo(result, id) {
	let str;
	result.forEach((data) => {
		str += `<option value="${data.opt_id}">${data.value}</option>`;
	});
	document.getElementById(`${id}`).innerHTML = str;
}

async function getCombos(name) {
	let result = await commonFetch(`/api/combos/${name}`);
	generateCombo(result, name);
}
getCombos('paymentStatus');
