async function getStore() {
	paggination('/store');
}

async function addNewStore() {
	const storeForm = document.getElementById('myForm');
	storeForm.style.display = 'block';
	document.getElementById('child').style.display = `-webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);`;
	document.getElementById('insertButton').style.display = 'block';
	document.getElementById('updateButton').style.display = 'none';
	// window.location.replace('/store')
	getAllState('stateSelectCombo'); //second parameter those state we need to selected
}

async function submitStoreDetails() {
	const storeFormData = formData('storeForm'); //parameter as formname
	// const storeDetailsValidation = manageCustomerFormValidation(storeFormData);
	// document.getElementById("storeForm").action = '/insertStore'
	// const storeDetailsValidation = true;

	// if (Object.keys(storeDetailsValidation).length > 0) {
	//   //----client side validation error
	//   errorShow(storeDetailsValidation);
	// } else {
	//----backend
	const response = await fetch('/insertStore', {
		method: 'POST',
		body: JSON.stringify(storeFormData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	let result = await response.json();

	try {
		console.log(result.status);
		// if (!result.ok) {
		//   throw new Error("Error In Backend Validation Manage Store");
		// }

		if (result.status === 200) {
			// const responseMessage = await response.json();
			// console.log(response.status);
			// console.log(responseMessage.message);
			window.location.href = '/store';
		}
	} catch (error) {
		console.log(error);

		if (result.status === 400) {
			// const errorObject = await response.json();
			// console.log(errorObject);
			// errorShow(errorObject);
		}
	}
	// }
}

function closeForm() {
	document.getElementById('myForm').style.display = 'none';
}

//---------update store details
async function openUpdateStoreForm(store) {
	document.getElementById('myForm').style.display = 'block';
	document.getElementById('insertButton').style.display = 'none';
	document.getElementById('updateButton').style.display = 'block';
	const form = document.getElementById('storeForm');
	// document.getElementById("storeForm").action = '/updateStore'
	const storeId = store.id;
	const response = await fetch(`/getStore/?storeId=${storeId}`, {
		method: 'GET',
	});
	const storeDetails = await response.json();

	try {
		if (!response.ok) {
			throw new Error('Error In Get Store Details');
		}

		if (response.status === 200) {
			// console.log(storeDetails);
			document.getElementsByName('storageName')[0].value =
				storeDetails[0].Storagename;
			let storeType = document.getElementsByName('storeType')[0];
			storeType.value = storeDetails[0].StorageTypeId;
			getAllState('stateSelectCombo', storeDetails[0].state);
			const stateSelectCombo = { id: 'stateSelectCombo' };
			getCity(stateSelectCombo, storeDetails[0].state, storeDetails[0].city);
		}
	} catch (error) {
		if (response.status === 404) {
			console.log(storeDetails.message);
		}

		if (response.status === 500) {
			console.log(storeDetails.message);
		}
	}
}

async function updateStoreDetails(storeId) {
	const storeFormData = formData('storeForm'); //parameter as formname
	storeFormData.storeId = storeId;

	// const customerDetailsValidation = manageCustomerFormValidation(storeFormData);
	// const customerDetailsValidation = true;

	// if (Object.keys(customerDetailsValidation).length > 0) {
	//   //----client side validation error
	//   errorShow(customerDetailsValidation);
	// } else {
	//----backend

	const response = await fetch('/updateStore', {
		method: 'POST',
		body: JSON.stringify(storeFormData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		if (!response.ok) {
			throw new Error('Error In Backend Validation Manage Store');
		}

		if (response.status === 200) {
			const responseMessage = await response.json();
			console.log(response.status);
			console.log(responseMessage.message);
			window.location.replace(
				window.location.protocol + '//' + window.location.host + `/store`
			);
		}
	} catch (error) {
		console.log(error);

		if (response.status === 400) {
			const errorObject = await response.json();
			console.log(errorObject);
			errorShow(errorObject);
		}

		if (response.status === 404) {
			const responseMessage = await response.json();
			console.log(response.status);
			console.log(responseMessage.message);
		}

		if (response.status === 500) {
			const responseMessage = await response.json();
			console.log(response.status);
			console.log(responseMessage.message);
		}
	}
}
// }

async function deleteStoreDetails(storeId) {
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success m-2',
			cancelButton: 'btn btn-danger',
		},
		buttonsStyling: false,
	});
	swalWithBootstrapButtons
		.fire({
			title: 'Are you sure?',
			text: 'Delete Warehouse?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true,
		})
		.then((result) => {
			if (result.isConfirmed) {
				deletedata(storeId);
				swalWithBootstrapButtons.fire({
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire({
					title: 'Cancelled',
					text: 'Cancelled...',
					icon: 'error',
				});
			}
		});
}

const deletedata = async (storeId) => {
	const response = await fetch(`/deleteStore/?storeId=${storeId}`, {
		method: 'POST',
	});
	window.location.replace('/store');
};

// Search

const search = (key) => {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = key;
	// console.log(input);
	filter = input;
	table = document.getElementById('t1');
	tr = table.getElementsByTagName('tr');

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		for (let j = 0; j < 5; j++) {
			td = tr[i].getElementsByTagName('td')[j];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.indexOf(filter) > -1) {
					tr[i].style.display = '';
					break;
				} else {
					tr[i].style.display = 'none';
				}
			}
		}
	}
};
