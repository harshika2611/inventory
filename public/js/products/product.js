let url = new URL(window.location.href);

async function addProduct() {
  getAllStore();
  const storageOptionosIn = await generateWarehousesDropDown();
  if (document.getElementById('storageComboIn') != null) {
    document.getElementById('storageComboIn').innerHTML = storageOptionosIn;
  }
  const customerForm = document.getElementById('myForm');
  customerForm.style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Submit';
  document.getElementById('main2').style = `filter: blur(2px);`;
  document.getElementById('head').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
}
function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('main2').style = 'none';
  document.getElementById('grid').style = 'none';
  document.getElementById('head').style = 'none';
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

async function allFetch() {
  if (document.getElementById('storageComboIn') != null) {
    let storage = document.getElementById('storageCombo').value;
    url = `/api/products?storage=${storage}`;
  }

  paggination(url);
}

async function getProducts() {
  const storageOptionos = await generateWarehousesDropDown(1, true);
  if (document.getElementById('storageCombo') != null) {
    document.getElementById('storageCombo').innerHTML = storageOptionos;
  }
  paggination('/api/products');
  allFetch();
}
getProducts();

function dataTableGrid(product, startIndex) {
  const table = document.getElementById('thead');
  const tableBody = document.getElementById('tbody');
  let createTh = document.createElement('th');
  let createTr = document.createElement('tr');
  let span = document.createElement('span');
  table.innerHTML = '';
  tableBody.innerHTML = '';
  createTh.innerHTML = '';

  for (let key of [
    'id',
    'Productname',
    'SKUid',
    'Category',
    'Cost',
    'Quantity',
    'Description',
  ]) {
    if (key === 'id') {
      key = 'No.';
    }
    span = document.createElement('span');
    span.setAttribute('class', 'd-inline-flex flex-row align-items-center');
    createTh = document.createElement('th');
    createTh.setAttribute('class', 'align-middle');
    span.textContent = key;
    createTr.appendChild(createTh);
    createTh.appendChild(span);
    table.appendChild(createTr);
    let spanMain = document.createElement('span');
    spanMain.setAttribute(
      'class',
      'd-inline-flex flex-column align-items-center ms-2'
    );
    let span1 = document.createElement('span');
    span1.textContent = '^';
    span1.setAttribute('class', 'span1');
    span1.setAttribute('onclick', `filterUp(event,'ASC')`);
    span1.setAttribute('id', `${key}`);

    let span2 = document.createElement('span');
    span2.textContent = '^';
    span2.setAttribute('class', 'span2');
    span2.setAttribute('onclick', `filterUp(event,'DESC')`);
    span2.setAttribute('id', `${key}`);
    spanMain.appendChild(span1);
    spanMain.appendChild(span2);
    span.appendChild(spanMain);
    if (key == 'No.') {
      spanMain.remove();
    }
  }

  createTh = document.createElement('th');
  createTh.setAttribute('class', 'align-middle');
  createTh.textContent = 'Action';
  createTh.colSpan = '2';
  createTr.appendChild(createTh);
  table.appendChild(createTr);

  for (const element of product) {
    let createTr = document.createElement('tr');
    tableBody.appendChild(createTr);

    for (const key in element) {
      const createTd = document.createElement('td');
      if (key == 'id') {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else if (key !== 'is_delete' && key !== 'store') {
        createTd.textContent = element[key] == null ? '-' : element[key];
        createTr.appendChild(createTd);
      }
    }
    if (element['is_delete'] == 0 && element['store'] == 0) {
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
    } else if (element['is_delete'] == 1 || element['store'] == 1) {
      let actionTd = document.createElement('td');
      actionTd.setAttribute('colspan', 2);
      actionTd.innerHTML = `<b><i>DELETED</i></b>`;
      createTr.appendChild(actionTd);
    }
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
  if (document.getElementById('storageComboIn') != null) {
    let storage = document.getElementById('storageCombo').value;
    url = `/api/products?field=${key}&order=${order}&storage=${storage}`;
  } else {
    url = `/api/products?field=${key}&order=${order}`;
  }
  paggination(url);
}
const search = () => {
  let search = document.getElementById('search').value.toLowerCase().trim();
  if (search == '') {
    paggination(null, dataArray);
  } else {
    filteredResult = dataArray.filter((ele) => {
      return (
        ele.Productname.toLowerCase().includes(search) ||
        ele.Category.toLowerCase().includes(search)
      );
    });
    paggination(null, filteredResult);
  }
};

const getAllStore = async () => {
  try {
    const response = await fetch('api/combos/productCategory');
    const data = await response.json();

    const store = data;
    let option = document.getElementById('category');
    option.innerHTML = '';
    option.innerHTML = `<option value="select here">Select Category</option>`;
    store.forEach((element) => {
      option.innerHTML += `<option value="${element.opt_id}">${element.value}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
};
