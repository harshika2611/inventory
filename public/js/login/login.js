async function submitbtn() {
	console.log('abc');
	const data = formData('form');
	console.log(data);
	const response = await fetch('/', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	if (response.status == 200) {
		window.location = `/dashboard`;
	}
}
