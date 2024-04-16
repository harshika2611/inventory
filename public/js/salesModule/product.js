
async function productGrid() {
	let orderId = document.getElementById('productOrderId').value;
	let response = await fetch(`/getProductGrid?orderId=${orderId}`);
	let result = await response.json();

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
    <td><a class='btn btn-success'>EDIT</a></td>
    <td><a class="btn btn-danger">DELETE</a></td>
    </tr>`;
	});

	document.getElementById('productListBody').innerHTML = body;
}
productGrid();