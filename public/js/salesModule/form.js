let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

let id = params.get('id');

if (id != null) {
	fetchUpdate(id);
}
async function fetchUpdate(id) {
	url = `/salesorder?col=sales_order.id&colValue=${id}`;
	let result = await commonFetch(url);
	updateOrderForm(result, id);
}

async function commonFetch(url,option) {
	const response = await fetch(url,option);
	const result = await response.json()
	return result;
}
// function displayProductForm() {
// 	document.getElementById('productFormDiv').style.display='block'
// }
const displayProductForm = () => {
	let insertForm = document.getElementById('insertFormDiv');
	let productForm = document.getElementById('productFormDiv');
	productForm.style.display = 'block';
	insertForm.style.display = 'none';
};