let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
console.log(url);
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