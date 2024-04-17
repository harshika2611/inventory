async function insertOrder() {
	let orderid = document.getElementById('orderid');
	var flag = false;
	var id;
	const insertFormData = formData('insertSalesData');
	console.log('formdata : ', insertFormData);

	if (orderid.value != '') {
		id = orderid.value;
		const response = await fetch(`/updateSalesOrder`, {
			method: 'POST',
			body: new URLSearchParams(insertFormData),
		});
		const result = await response.json();
		if (result.rows.affectedRows != 0) {
			flag = true;
		}
	} else {
		const response = await fetch(`/insertSalesOrder`, {
			method: 'POST',
			body: new URLSearchParams(insertFormData),
		});
		const result = await response.json();

		if (result != 'not found') {
			flag = true;
			id = result.rows.insertId;
			getCategories();
		}
	}
	console.log(flag);
	if (flag == true) {
		document.getElementById('productOrderId').value = id;
		document.getElementById('productOrderType').value =
			document.getElementById('orderType').value;
		displayProductForm();
		getCategories();
		fetching();
	}
}

async function generateCombo() {
	const response = await fetch('/getCustomers');
	const result = await response.json();
	let str;
	result.rows.forEach((data) => {
		str += `<option value="${data.id}">${data.firstname}</option>`;
	});
	document.getElementById('customer').innerHTML = str;
}
generateCombo();

async function getCategories() {
	let response = await fetch('./getSalesCategories');
	let result = await response.json();
	let str = `<option value="" selected hidden>Select Category</option>`;
	result.rows.forEach((ele) => {
		str += `<option value="${ele.opt_id}">${ele.value}</option>`;
	});
	let arr = document.getElementsByClassName('category')
		for(ele of arr) {
		ele.innerHTML = str;
	}
		
}


