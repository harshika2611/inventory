let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
console.log(url);
let id = params.get('id');

if (id != null) {
	fetchUpdate(id);
}
async function fetchUpdate(id) {
	url = `/salesorder?col=sales_order.id&colValue=${id}`;
	let response = await fetch(url);
	let result = await response.json();
	updateOrderForm(result, id);
}
