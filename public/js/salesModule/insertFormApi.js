async function insertOrder() {
  let form = document.getElementById("insertSalesData");
  const response = await fetch(`/insertSalesOrder`, {
    method: "POST",
    body: new URLSearchParams(new FormData(form)),
  });
  const result = await response.json();
  if (result != "not found") {
    console.log(result.rows.insertId);
    document.getElementById('productOrderId').value = `${result.rows.insertId}`
    document.getElementById('productOrderType').value = document.getElementById('orderType').value
    //ordertype valule found undefine
    form.style.display = "none";
    getCategories();
  }
}

async function generateCombo() {
  const response = await fetch("/getCustomers");
  const result = await response.json();

  let str = '<option value="" selected hidden>Select</option>';
  result.rows.forEach((data) => {
    str += `<option value="${data.id}">${data.name}</option>`;
  });
  document.getElementById("customer").innerHTML = str;
}
generateCombo();

async function getCategories() {
  let response = await fetch("./getSalesCategories");
  let result = await response.json();
  let str = `<option value="" selected hidden>Select Category</option>`;
  result.rows.forEach((ele) => {
    str += `<option value="${ele.opt_id}">${ele.value}</option>`;
  });
  document.getElementById("category").innerHTML = str;
}

async function getProducts() {
  let category_id = document.getElementById("category").value;
  let response = await fetch(`/getSalesProducts?category_id=${category_id}`);
  let result = await response.json();
  let str = `<option value="" selected hidden>Select Product</option>`;
  result.rows.forEach((ele) => {
    str += `<option value="${ele.id}">${ele.name}</option>`;
  });
  document.getElementById("product").innerHTML = str;
}

async function addProduct() {
  let form = document.getElementById("productForm");
  console.log((form));
  let response = await fetch("/insertSalesProduct", {
    method: "POST",
    body: new URLSearchParams(new FormData(form)),
  });
  let result = await response.json();
  console.log(result);
}
