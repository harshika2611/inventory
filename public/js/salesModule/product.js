var productGridResult;
async function fetching() {
	let orderId = document.getElementById('productOrderId').value;
	let response = await fetch(`/getProductGrid?orderId=${orderId}`);
	let result = await response.json();
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
	let response = await fetch(`/getSalesProducts?category_id=${category_id}`);
	let result = await response.json();
	let str = `<option value="" selected hidden>Select Product</option>`;
	result.rows.forEach((ele) => {
		str += `<option value="${ele.id}">${ele.name}</option>`;
	});
	document.getElementById(`${type}product`).innerHTML = str;
}

async function addProduct() {
	let form = document.getElementById('productForm');
	console.log(form);
	let response = await fetch('/insertSalesProduct', {
		method: 'POST',
		body: new URLSearchParams(new FormData(form)),
	});
	let result = await response.json();
	console.log(result);
	fetching();
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
	let editproduct= document.getElementById('editproduct');
	for (op of editproduct) {
		if (op.innerHTML == data.name) {
			op.setAttribute('selected', true);
		}
	}
	document.getElementById('editQuantity').value = data.quantity
}
async function editProduct(id) {
	console.log(123);
	const updateProduct = formData('updateProduct');
	let response = await fetch(`/updateSalesProduct`, {
		method: 'POST',
		body: new URLSearchParams(updateProduct),
	});
	let result = await response.json();
	console.log(result);
	
	modelHide('productEdit');
	await fetching();
}