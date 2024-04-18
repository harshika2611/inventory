var productGridResult;
async function fetching() {
	let orderId = document.getElementById('productOrderId').value;
	let result = await commonFetch(`/getProductGrid?orderId=${orderId}`);

	productGridResult = result.rows; //to select one row
	let head = `<tr>`;
	result.header.forEach((ele) => {
		if (ele != 'id') {
			head += `<th scope="col">${ele}</th>`;
		}
	});
	head += `</tr>`;
	document.getElementById('productListHead').innerHTML = head;

	let body = ``;
	result.rows.forEach((data) => {
		console.log(data);

		body += `<tr>
    <td hidden>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.Category}</td>
    <td>${data.quantity}</td>
    <td><a class='btn btn-success' id="edit${data.id}" onclick="updateOrder('edit', event,'product')">EDIT</a></td>
    <td><a class="btn btn-danger" id="delete${data.id}" onclick="updateOrder('delete', event,'product')">DELETE</a></td>
    </tr>`;
	});

	document.getElementById('productListBody').innerHTML = body;
}
// fetching();

async function getProducts(type) {
	let category_id = document.getElementById(`${type}category`).value;
	let result = await commonFetch(
		`/getSalesProducts?category_id=${category_id}`
	);

	let str = `<option value="" selected hidden>Select Product</option>`;
	result.rows.forEach((ele) => {
		str += `<option value="${ele.id}">${ele.name}</option>`;
	});
	document.getElementById(`${type}product`).innerHTML = str;
}

async function addProduct() {
	console.log(123);
	const productFormData = formData('productForm');
	console.log(productFormData);
	const productValidation = productFormValidation(productFormData);
	// const productValidation = true;
	console.log(productValidation);

	if (Object.keys(productValidation).length > 0) {
		console.log('error');
		//----client side validation error
		errorShow(productValidation);
	} else {
		let form = document.getElementById('productForm');
		console.log(form);

		let option = {
			method: 'POST',
			body: new URLSearchParams(productFormData),
		};
		let response = await commonFetch('/insertSalesProduct', option);
		let result = await response.json();
		console.log(result);
		fetching();
	}
}

async function allocateProductEdit(id) {
	console.log(productGridResult);
	let data;
	productGridResult.forEach((ele) => {
		if (ele.id == id) {
			data = ele;
		}
	});
	let editcategory = document.getElementById('editcategory');
	for (op of editcategory) {
		if (op.innerHTML == data.Category) {
			op.setAttribute('selected', true);
		}
	}
	await getProducts('edit');
	let editproduct = document.getElementById('editproduct');
	for (op of editproduct) {
		if (op.innerHTML == data.name) {
			op.setAttribute('selected', true);
		}
	}
	document.getElementById('editQuantity').value = data.quantity;
}
async function editProduct(id) {
	console.log(123);
	const updateProduct = formData('updateProduct');

	let option = {
		method: 'POST',
		body: new URLSearchParams(updateProduct),
	};
	let response = await commonFetch(`/updateSalesProduct`, option);
	let result = await response.json();
	console.log(result);

	modelHide('productEdit');
	await fetching();
}
