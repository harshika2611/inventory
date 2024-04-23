let url = new URL(window.location.href);

function addProduct() {
  const customerForm = document.getElementById('myForm');
  customerForm.style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Submit';
  document.getElementById('filter').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
  // getAllStore();
}
function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('filter').style = 'none';
  document.getElementById('grid').style = 'none';
}
async function submitbtn() {
  try {
    const data = formData('productForm');
    // const managerValidation = manageManagerFormValidation(data);
    console.log(data, 'aaa');
    // if (Object.keys(managerValidation).length > 0) {
    //   //----client side validation error
    //   errorShow(managerValidation);
    // } else {
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
    // }
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
  table.innerHTML = '';
  tableBody.innerHTML = '';
  for (let key in product[0]) {
    if (key === 'id') {
      key = 'No.';
    }
    const createTh = document.createElement('th');
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
  const createTh = document.createElement('th');
  createTh.textContent = 'View Details';
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
        createTd.textContent = element[key];
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
    achor.appendChild(createEditButton);
    createEditTd.appendChild(achor);

    createTr.appendChild(createEditTd);
  }
}
function filterUp(event, order) {
  const key = event.target.getAttribute('id');
  console.log(key, 'ssssssssssss');
  url = `/api/products?field=${key}&order=${order}`;
  paggination(url);
}
