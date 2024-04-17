let orderId;

const patterns = {
	textOnly: '^[a-zA-Z\\s]+$',
	numberOnly: '^\\d+$',
	email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
	date: '^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$',
};

// Pattern Field is optional
const validation = {
	form1: {
		name: {
			required: true,
			pattern: patterns.textOnly,
		},
		date: {
			required: true,
			pattern: patterns.date,
		},
		supplier_id: {
			required: true,
			pattern: patterns.numberOnly,
		},
		amount: {
			required: true,
			pattern: patterns.numberOnly,
		},
		payment_status: {
			required: false,
			pattern: patterns.numberOnly,
		},
	},
	form2: {
		purchase_id: {
			required: true,
			pattern: patterns.numberOnly,
		},
		product_id: {
			required: true,
			pattern: patterns.numberOnly,
		},
		unit_price: {
			required: true,
			pattern: patterns.numberOnly,
		},
		quantity: {
			required: true,
			pattern: patterns.numberOnly,
		},
	},
};

async function generateForm1() {
	const paymentOptions = await generateDropDown('paymentStatus');

	const supplierOptions = await generateSuppliersDropDown();

	const root = document.getElementById('root');

	let content = `
	<form>
		<div class="form-floating mb-3">
			<input name="name" type="text" class="form-control" id="floatingName" placeholder="name">
			<label for="floatingName">Order name</label>
			<div class="invalid-feedback">
				Please enter a valid purchase order name.
			</div>
		</div>
		<div class="form-floating mb-3">
			<input name="date" type="date" class="form-control" id="floatingDate" placeholder="date">
			<label for="floatingDate">Date</label>
			<div class="invalid-feedback">
				Please enter a valid date.
			</div>
		</div>
		<div class="form-floating mb-3">
			<select name="supplier_id" class="form-select" aria-label="select" id="floatingSupplier">
				${supplierOptions}
			</select>
			<label for="floatingSupplier">Supplier</label>
			<div class="invalid-feedback">
				Please select a valid supplier.
			</div>
		</div>
		<div class="form-floating mb-3">
			<input name="amount" type="number" class="form-control" id="floatingAmount" placeholder="amount" min="0">
			<label for="floatingAmount">Amount</label>
			<div class="invalid-feedback">
				Please select a valid amount.
			</div>
		</div>
		<div class="form-floating mb-3">
			<select name="payment_status" class="form-select" aria-label="select" id="floatingPaymentStatus">
				${paymentOptions}
			</select>
			<label for="floatingPaymentStatus">Payment</label>
			<div class="invalid-feedback">
				Please select a valid payment status.
			</div>
		</div>
	</form>
	<div class="d-flex mt-5 justify-content-center">
		<button
		type="button"
		class="btn btn-primary"
		onclick="submitForm1()"
		>
			Next
		</button>
	</div>`;

	root.innerHTML = content;
}

async function generateForm2() {
	const productOptions = await generateProductsDropDown();
	const warehouseOptions = await generateWarehousesDropDown();

	const root = document.getElementById('root');
	let content = `
  	<div class="d-flex mb-5 justify-content-end">
		<button
			type="button"
			class="btn btn-outline-dark"
			id="addProducts"
		>
			+ Add
		</button>
	</div>

	<form>
		
	</form>
	<div class="d-flex mt-5 justify-content-center">
		<button
		type="button"
		class="btn btn-primary"
		onclick=""
		>
		Submit
		</button>
	</div>`;

	root.innerHTML = content;
	document.getElementById('addProducts').addEventListener('click', () => {
		generateAddProductRows(productOptions, warehouseOptions);
	});
	await generateAddProductRows(productOptions, warehouseOptions);
}

async function submitForm1() {
	document.getElementsByTagName('form')[0].classList.add('was-validated');
	const nameElement = document.getElementsByName('name')[0];
	const dateElement = document.getElementsByName('date')[0];
	const supplierElement = document.getElementsByName('supplier_id')[0];
	const amountElement = document.getElementsByName('amount')[0];
	const paymentElement = document.getElementsByName('payment_status')[0];

	// Clear Errors
	[
		nameElement,
		dateElement,
		supplierElement,
		amountElement,
		paymentElement,
	].forEach((ele) => (ele.required = false));

	const data = {
		name: nameElement.value,
		date: dateElement.value,
		supplier_id: supplierElement.value,
		amount: amountElement.value,
		payment_status: paymentElement.value,
	};
	console.log(data);
	if (checkValidation(data, validation.form1)) {
		try {
			const body = new URLSearchParams();

			Object.entries(data).forEach((arr) => {
				body.append(arr[0], arr[1]);
			});

			const response = await fetch('api/purchase/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body,
			});

			orderId = await response.json().insertId;

			generateForm2();
		} catch (error) {
			console.log(error);
		}
	}
}

function generateAddProductRows(productOptions, warehouseOptions) {
	document.querySelector('form').innerHTML += `
  	<div class="container">
		<div class="row align-items-center mb-3">
			<div class="col">
				<div class="form-floating">
				<select class="form-select" aria-label="select" id="floatingProducts">
					${productOptions}
				</select>
				<label for="floatingProducts">Product</label>
			</div>
			</div>
			<div class="col">
				<div class="form-floating">
				<select class="form-select" aria-label="select" id="floatingWarehouse">
					${warehouseOptions}
				</select>
				<label for="floatingWarehouse">Warehouse</label>
				</div>
			</div>
			<div class="col">
				<div class="form-floating">
				<input type="number" class="form-control" id="floatingUnitPrice" placeholder="unitPrice" min="0">
				<label for="floatingUnitPrice">Unit Price</label>
				</div>
			</div>
			<div class="col">
				<div class="form-floating">
				<input type="number" class="form-control" id="floatingQuantity" placeholder="quantity" min="0">
					<label for="floatingQuantity">Quantity</label>
				</div>
			</div>
			<div class="w-auto">
				<button type="button" class="btn btn-danger" onclick="deleteProduct(event)">Delete</button>
			</div>
		</div>
	</div>`;
}

function deleteProduct(e) {
	e.target.parentElement.parentElement.parentElement.remove();
}

function generateDropDown(value) {
	return fetch(`api/combos/${value}`)
		.then((res) => res.json())
		.then((data) => {
			let content = '';
			data.forEach((o) => {
				content += `<option value="${o.opt_id}">${o.value}</option>`;
			});
			return content;
		})
		.catch(() => '');
}

function generateSuppliersDropDown() {
	return fetch('api/purchase/suppliers')
		.then((res) => res.json())
		.then((data) => {
			let content = '';
			data.forEach((o) => {
				content += `<option value="${o.id}">${o.supplier_name}</option>`;
			});
			return content;
		})
		.catch(() => '');
}

function generateProductsDropDown() {
	return fetch('api/purchase/products')
		.then((res) => res.json())
		.then((data) => {
			let content = '';
			data.forEach((o) => {
				content += `<option value="${o.id}">${o.name}</option>`;
			});
			return content;
		})
		.catch(() => '');
}

function generateWarehousesDropDown() {
	return fetch('api/purchase/warehouses')
		.then((res) => res.json())
		.then((data) => {
			let content = '';
			data.forEach((o) => {
				content += `<option value="${o.id}">${o.name}</option>`;
			});
			return content;
		})
		.catch(() => '');
}

function checkValidation(body, validation) {
	const result = [];
	for (let arr of Object.entries(validation)) {
		const field = arr[0];
		const obj = arr[1];
		if (obj.required) {
			if (!body[field]) {
				result.push({
					status: 'error',
					field,
					message: `${field} is required!`,
				});
			}
		}

		// Note pattern is optional property
		if (obj?.pattern && body[field]) {
			if (!new RegExp(obj.pattern, 'i').test(body[field])) {
				result.push({
					status: 'error',
					field,
					message: `Invalid input for ${field}!`,
				});
			}
		}
	}
	if (result.length > 0) {
		result.forEach((obj) => {
			document.getElementsByName(obj.field)[0].required = true;
		});
		return false;
	}
	return true;
}
