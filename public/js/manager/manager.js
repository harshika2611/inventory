function addManager() {
	const customerForm = document.getElementById('myForm');
	customerForm.style.display = 'block';

	getAllStore();
}
function closeForm() {
	document.getElementById('myForm').style.display = 'none';
	// document.getElementById("childbody").style = "none";
}

async function submitbtn() {
	try {
		const data = formData('form');
		const managerValidation = manageManagerFormValidation(data);

		if (Object.keys(managerValidation).length > 0) {
			//----client side validation error
			errorShow(managerValidation);
		} else {
			const response = await fetch(`/manager`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.status == 200) {
				alert('Manager added');
				window.location = `/user`;
			}
			if (response.status === 409) {
				document.getElementById('error').innerHTML = 'manager already exist';
				document.getElementById('error').style.color = 'red';
			}
			if (response.status === 400) {
				const errorObject = await response.json();
				errorShow(errorObject);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

const getAllStore = async () => {
	try {
		const response = await fetch('/storeCombo');
	const data = await response.json();

	const store = data.result;
	store.forEach((element) => {
		const option = (document.getElementById(
			'state'
		).innerHTML += `<option value="${element.id}">${element.city_name}</option>`);
	});
	} catch (error) {
		console.log(error);
	}
};


const getAllManager=async()=>{
try {
	const response=await fetch('/api/getmanager');
	const data=await response.json();
	console.log(data,'body');
	
} catch (error) {
	console.log(error);
}
}
getAllManager();