async function generateForm1() {
  const paymentOptionsList = await generateDropDown("paymentStatus");
  let paymentOptions = ``;

  paymentOptionsList.forEach((o) => {
    paymentOptions += `<option id="${o.opt_id}">${o.value}</option>`;
  });

  const supplierOptionsList = await generateSuppliersDropDown();
  let supplierOptions = ``;

  supplierOptionsList.forEach((o) => {
    supplierOptions += `<option id="${o.id}">${o.supplier_name}</option>`;
  });

  const root = document.getElementById("root");

  let content = `
	<form>
		<div class="form-floating mb-3">
		<input type="text" class="form-control" id="floatingName" placeholder="name">
		<label for="floatingName">Order name</label>
		</div>
		<div class="form-floating mb-3">
		<select class="form-select" aria-label="select" id="floatingSupplier">
			${supplierOptions}
		</select>
		<label for="floatingSupplier">Supplier</label>
		</div>
		<div class="form-floating mb-3">
		<input type="number" class="form-control" id="floatingAmount" placeholder="amount" min="0">
		<label for="floatingAmount">Amount</label>
		</div>
		<div class="form-floating mb-3">
		<select class="form-select" aria-label="select" id="floatingPaymentStatus">
			${paymentOptions}
		</select>
		<label for="floatingPaymentStatus">Payment</label>
		</div>
	</form>
	<div class="d-flex mt-5 justify-content-center">
		<button
		type="button"
		class="btn btn-primary"
		onclick="generateForm2()"
		>
			Next
		</button>
	</div>`;

  root.innerHTML = content;
}

function generateForm2() {
  const root = document.getElementById("root");
  let content = `
  	<div class="d-flex mb-5 justify-content-end">
		<button
			type="button"
			class="btn btn-outline-dark"
			onclick="generateAddProductRows()"
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
  generateAddProductRows();
}

function generateAddProductRows() {
  document.querySelector("form").innerHTML += `
  	<div class="container">
		<div class="row align-items-center mb-3">
			<div class="col">
				<div class="form-floating">
				<select class="form-select" aria-label="select" id="floatingProducts">
				</select>
				<label for="floatingProducts">Product</label>
			</div>
			</div>
			<div class="col">
				<div class="form-floating">
				<select class="form-select" aria-label="select" id="floatingWarehouse">
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
				<button type="button" class="btn btn-danger">Delete</button>
			</div>
		</div>
	</div>`;
}

function generateDropDown(value) {
  return fetch(`api/combos/${value}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => []);
}

function generateSuppliersDropDown() {
  return fetch("api/purchase/suppliers")
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => []);
}
