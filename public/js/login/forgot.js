function checkPass() {
	const pass1 = document.getElementById('new_pass').value;
	const pass2 = document.getElementById('confirm_pass').value;
	if (pass1 == pass2) {
		return true;
	} else {
		errorMsg = 'password not matched';
		document.getElementById('error_forgot').innerHTML = errorMsg;
		return false;
	}
}

async function submitbtn() {
	if (checkPass()) {
		try {
			const form = document.getElementById('form');
			const formData = new FormData(form);
			const serialData = {};

			for (const [key, value] of formData.entries()) {
				if (serialData[key] != undefined) {
					serialData[key] += ',' + value;
				} else {
					serialData[key] = value;
				}
			}
			const data = JSON.stringify(serialData);
			const response = await fetch(`/forgot`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: data,
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			if (response.status == 201) {
				alert('You are successfully registerd');
				window.location = `/`;
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		return;
	}
}
