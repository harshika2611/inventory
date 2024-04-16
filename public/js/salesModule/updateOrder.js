const displayProductForm = () => {
	let insertForm = document.getElementById('insertFormDiv');
	let productForm = document.getElementById('productFormDiv');
	productForm.style.display = 'block';
	insertForm.style.display = 'none';
};

function updateOrderForm(result, id) {
	console.log(result);
	let customer = document.getElementById('customer');
	let amount = document.getElementById('amount');
	let shippingAddress = document.getElementById('shippingAddress');
	let paymentStatus = document.getElementsByName('paymentStatus');
	let date = document.getElementById('date');
	let orderid = document.getElementById('orderid');
	orderid.value = id;
	console.log(result.rows[0].customer_id);
	for (op of customer) {
		console.log(op);
		if (op.value == result.rows[0].customer_id) {
			op.setAttribute('selected', true);
		}
	}
	amount.value = result.rows[0].amount;
	shippingAddress.innerHTML = result.rows[0].shipping_address;
	for (op of paymentStatus) {
		if (op.value == result.rows[0].payment_status) {
			op.setAttribute('selected', true);
		}
	}
	date.value = result.rows[0].date;
}
// we will use grid fetch function for edit and delete
