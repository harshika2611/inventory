async function getStore() {
	paggination('/store');
}

async function addNewStore() {
	const storeForm = document.getElementById('myForm');
	storeForm.style.display = 'block';
	const form = document.getElementById('storeForm');
	form.action = '/insertStore';

	getAllState('stateSelectCombo'); //second parameter those state we need to selected
}

async function submitStoreDetails() {
	const storeFormData = formData('storeForm'); //parameter as formname

	const storeDetailsValidation = manageStoreFormValidation(storeFormData);
	// const storeDetailsValidation = true;

	if (Object.keys(storeDetailsValidation).length > 0) {
		//----client side validation error
		errorShow(storeDetailsValidation);
	} else {
		//----backend
		const response = await fetch('/insertStore', {
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
				window.location.replace(`/store`);
			}
		} catch (error) {
			console.log(error);

			if (response.status === 400) {
				const errorObject = await response.json();
				console.log(errorObject);
				errorShow(errorObject);
			}
		}
	}
}

function closeForm() {
	document.getElementById('myForm').style.display = 'none';
}

//---------update store details
async function openUpdateStoreForm(store) {
	document.getElementById('myForm').style.display = 'block';
	const form = document.getElementById('storeForm');
	form.action = '/updateStore';
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

async function updateStoreDetails(store) {}
async function deleteStoreDetails(storeId) {
	const response = await fetch(`/deleteStore/?storeId=${storeId}`, {
		method: 'POST',
	});
	window.location.reload('/store');
}
