async function updateOrder(type, event, page) {
	let deleteModal;
	let url = '';
	let editModalName;

	switch (page) {
		case 'order':
			url = 'salesNewOrder';
			deleteModal = 'deleteModal';
			break;
		case 'product':
			deleteModal = 'deleteModal';
			editModalName = 'productEdit';
			break;
	}
	let id = event.target.getAttribute('id').split(`${type}`)[1];
	let modal = new bootstrap.Modal(document.getElementById(`${deleteModal}`));

	if (type == 'edit') {
		if (page == 'order') {
			window.location.href = `/${url}?id=${id}`;
			fetching();
		} else {
			console.log(id);
			let editModal = new bootstrap.Modal(
				document.getElementById(`${editModalName}`)
			);
			editModal.show();
			let confirmEdit = document.getElementById('confirmEdit');
			let rowId = document.getElementById('rowId');
			rowId.value = id;
			confirmEdit.setAttribute('onclick', `editProduct(${id})`);
			allocateProductEdit(id)
		}
	} else if (type == 'delete') {
		// deleteId.innerHTML = id;
		let confirm = document.getElementById('confirm'); //confirm btn id
		confirm.setAttribute('onclick', `deleteOrder(${id},'${page}')`);
		modal.show();
	}
}

async function fetchDelete(id, page) {
	let url = '';

	switch (page) {
		case 'order':
			url = 'deleteSalesOrder';
			break;
		case 'product':
			url = 'deleteSalesProduct';
			break;
	}
	let response = await fetch(`/${url}?id=${id}`);
	let result = await response.json();
	console.log(result);
}
function modelHide(modelName) {
	bootstrap.Modal.getInstance(document.getElementById(`${modelName}`)).hide();
}

async function deleteOrder(id, page) {
	await fetchDelete(id, page);
	modelHide('deleteModal');
	fetching();
}


