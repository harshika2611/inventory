

function updateOrderForm(result, id) {

	let customer = document.getElementById('customer');
	let shippingAddress = document.getElementById('shippingAddress');
	let paymentStatus = document.getElementsByName('paymentStatus');
	let date = document.getElementById('date');
	let orderid = document.getElementById('orderid');
	orderid.value = id;

	for (op of customer) {
	
		if (op.value == result[0].customer_id) {
			op.setAttribute('selected', true);
		}
	}
	
	shippingAddress.innerHTML = result[0].shipping_address;
	for (op of paymentStatus) {
		if (op.value == result[0].payment_status) {
			op.setAttribute('selected', true);
		}
	}
	date.value = result[0].date;
}
// we will use grid fetch function for edit and delete
