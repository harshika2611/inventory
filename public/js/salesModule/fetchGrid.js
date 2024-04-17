async function fetching() {
	let orderby = document.getElementById('orderby').value;
	let order = document.getElementById('order').value;
	url = `/salesorder?order=${order}`;
	if (orderby != '') {
		url = url + `&orderby=${orderby}`;
	}
	let response = await fetch(url);
	let result = await response.json();
	grid(result);
}
fetching();

function grid(result) {
	let head = `<tr>`;
	result.header.forEach((ele) => {
		if (ele != 'date') {
			head += `<th scope="col">${ele}</th>`;
		}
	});
	head += `<th scope="col">Time</th>
  <th scope="col">Edit</th>
  <th scope="col">Delete</th>`;
	head += `</tr>`;
	document.getElementById('thead').innerHTML = head;

	let body = ``;
	result.rows.forEach((data) => {
		body += `<tr>
        <th scope="row">${data.id}</th>
        <td>${data.customer_id}</td>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.amount}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status}</td>
        <td>${data.created_at.split(' ')[0]}</td>
        <td>${data.created_at.split(' ')[1]}</td>
        <td><a class='btn btn-success' id=edit${
					data.id
				} onclick="updateOrder('edit',event,'order')">EDIT</a></td>
        <td><a class="btn btn-danger" id=delete${
					data.id
				} onclick="updateOrder('delete',event,'order')">DELETE</a></td>
        </tr>`;
	});
	document.getElementById('tbody').innerHTML = body;
}