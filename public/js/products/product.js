let url = new URL(window.location.href);

function addProduct() {
  const customerForm = document.getElementById('myForm');
  customerForm.style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Submit';
  document.getElementById('filter').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
  getAllStore();
  v;
}
function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('filter').style = 'none';
  document.getElementById('grid').style = 'none';
}
async function submitbtn() {
  try {
    const data = formData('productForm');
    const productValidation = manageProductFormValidation(data);

    if (Object.keys(productValidation).length > 0) {
      //----client side validation error
      errorShow(productValidation);
    } else {
      url = `/products`;
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert('product added');
        window.location = `/products`;
      }
      if (response.status === 409) {
        document.getElementById('error').innerHTML = 'product already exist';
        document.getElementById('error').style.color = 'red';
      }
      if (response.status === 400) {
        const errorObject = await response.json();
        errorShow(errorObject);
      }
    }
    if (Object.keys(productValidation).length > 0) {
      //----client side validation error
      errorShow(productValidation);
    } else {
      url = `/products`;
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert('product added');
        window.location = `/products`;
      }
      if (response.status === 409) {
        document.getElementById('error').innerHTML = 'product already exist';
        document.getElementById('error').style.color = 'red';
      }
      if (response.status === 400) {
        const errorObject = await response.json();
        errorShow(errorObject);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function getProducts() {
  paggination('/api/products');
}
getProducts();

function dataTableGrid(product, startIndex) {
  const table = document.getElementById('thead');
  const tableBody = document.getElementById('tbody');
  let createTh = document.createElement('th');
  table.innerHTML = '';
  tableBody.innerHTML = '';
  createTh.innerHTML = '';
  for (let key in product[0]) {
    if (key === 'id') {
      key = 'No.';
    }
    createTh = document.createElement('th');
    createTh.textContent = key;
    table.appendChild(createTh);
    const span = document.createElement('span');
    span.setAttribute('class', `${key}`);
    createTh.appendChild(span);
    const achor = document.createElement('span');
    achor.setAttribute('onclick', `filterUp(event,'ASC')`);
    const img = document.createElement('img');
    img.setAttribute('src', 'icons/bxs-up-arrow.svg');
    img.setAttribute('id', `${key}`);
    const achor2 = document.createElement('span');
    achor2.setAttribute('onclick', `filterUp(event,'DESC')`);
    const img2 = document.createElement('img');
    img2.setAttribute('src', 'icons/bxs-down-arrow.svg');
    img2.setAttribute('id', `${key}`);
    img2.setAttribute('width', '15');
    img.setAttribute('width', '15');
    span.appendChild(achor2);
    achor2.appendChild(img2);
    achor.appendChild(img);
    span.appendChild(achor);

    if (key == 'No.' || key == 'Status') {
      span.remove();
    }
  }
  createTh = document.createElement('th');
  createTh.textContent = 'Action';
  createTh.colSpan = '2';
  table.appendChild(createTh);

  for (const element of product) {
    const createTr = document.createElement('tr');
    tableBody.appendChild(createTr);

    for (const key in element) {
      const createTd = document.createElement('td');
      if (key == 'id') {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else {
        createTd.textContent = element[key] == null ? '-' : element[key];
        createTr.appendChild(createTd);
      }
    }
    const createEditTd = document.createElement('td');
    const achor = document.createElement('a');
    achor.setAttribute('href', `/productinfo?id=${element.id}`);
    createEditTd.setAttribute('class', 'editButton');
    createEditTd.setAttribute('id', `${element.id}`);
    const createEditButton = document.createElement('button');
    createEditButton.setAttribute('type', 'button');
    createEditButton.textContent = 'View details';
    createEditButton.setAttribute('class', 'btn btn-outline-primary');
    const createDeleteTd = document.createElement('td');
    createDeleteTd.setAttribute('id', `${element.id}`);
    const createDeleteButton = document.createElement('button');
    createDeleteButton.textContent = 'Delete';
    createDeleteButton.setAttribute('class', 'btn btn-outline-danger');
    createDeleteButton.setAttribute('id', `${element.id}`);
    createDeleteButton.setAttribute('type', 'button');
    createDeleteButton.setAttribute('onclick', 'deleteProduct(this)');
    createDeleteTd.appendChild(createDeleteButton);
    achor.appendChild(createEditButton);
    createEditTd.appendChild(achor);
    createTr.appendChild(createEditTd);
    createTr.appendChild(createDeleteTd);
  }
}

async function deleteProduct(product) {
  const id = product.id;
  let modal = new bootstrap.Modal(document.getElementById('deleteModal'));
  modal.show();
  let confirm = document.getElementById('confirm');
  confirm.setAttribute('onclick', `deleteProductPop(${id})`);
}

async function deleteProductPop(id) {
  console.log(id, 'here');
  url = `/api/deleteProduct/${id}`;
  const response = await fetch(url);
  try {
    if (response.status == 200) {
      const message = await response.json();
      window.location = '/products';
    }
    if (response.status == 404) {
      const message = await response.json();
      console.log(message.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function modelHide() {
  bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

function filterUp(event, order) {
  const key = event.target.getAttribute('id');

  url = `/api/products?field=${key}&order=${order}`;
  paggination(url);
}
const search = (key) => {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = key;

  filter = input;
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    for (let j = 0; j < 7; j++) {
      td = tr[i].getElementsByTagName('td')[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }
};

const getAllStore = async () => {
  try {
    const response = await fetch('api/combos/productCategory');
    const data = await response.json();

    const store = data;
    let option = document.getElementById('category');
    option.innerHTML = '';
    option.innerHTML = `<option value="select here">Select here</option>`;
    store.forEach((element) => {
      option.innerHTML += `<option value="${element.opt_id}">${element.value}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
};
