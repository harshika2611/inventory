let url = new URL(window.location.href);

function addManager() {
  const customerForm = document.getElementById('myForm');
  customerForm.style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Submit';
  document.getElementById('filter').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
  getAllStore();
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('filter').style = 'none';
  document.getElementById('grid').style = 'none';
}

async function submitbtn() {
  try {
    const data = formData('form');
    const managerValidation = manageManagerFormValidation(data);
    if (Object.keys(managerValidation).length > 0) {
      //----client side validation error
      errorShow(managerValidation);
    } else {
      url = `/manager`;
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert('Manager added');
        window.location = `/user`;
      }
      if (response.status === 409) {
        document.getElementById('error').innerHTML = 'manager already exist';
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

const getAllStore = async () => {
  try {
    const response = await fetch('/storeCombo');
    const data = await response.json();

    const store = data.result;
    store.forEach((element) => {
      const option = (document.getElementById(
        'state'
      ).innerHTML += `<option value="${element.id}">${element.city_name}</option>`);
    });
  } catch (error) {
    console.log(error);
  }
};

function dataTableGrid(manager, startIndex) {
  const table = document.getElementById('thead');
  const tableBody = document.getElementById('tbody');
  table.innerHTML = '';
  tableBody.innerHTML = '';
  for (let key in manager[0]) {
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
  createTh.textContent = 'Action';
  createTh.colSpan = '2';
  table.appendChild(createTh);

  for (const element of manager) {
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
    createEditTd.setAttribute('class', 'editButton');
    createEditTd.setAttribute('id', `${element.id}`);
    createEditTd.setAttribute('onclick', 'updateManager(this)');
    const createEditButton = document.createElement('img');
    createEditButton.setAttribute('src', 'src/assets/manageCustomer/edit.svg');
    createEditButton.setAttribute('width', '25');
    createEditButton.setAttribute('height', '25');
    createEditTd.appendChild(createEditButton);
    const createDeleteTd = document.createElement('td');
    createDeleteTd.setAttribute('id', `${element.id}`);
    createDeleteTd.setAttribute('class', 'deleteButton');
    createDeleteTd.setAttribute('onclick', 'deleteManager(this)');
    const createDeleteButton = document.createElement('img');
    createDeleteButton.setAttribute(
      'src',
      'src/assets/manageCustomer/delete.svg'
    );
    createDeleteButton.setAttribute('width', '25');
    createDeleteButton.setAttribute('height', '25');
    createDeleteTd.appendChild(createDeleteButton);
    createTr.appendChild(createEditTd);
    createTr.appendChild(createDeleteTd);
  }
}

async function updateManager(manager) {
  const id = manager.id;
  url = `/api/getmanager/${id}`;

  document.getElementById('myForm').style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Update';
  document.getElementById('filter').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
  document
    .getElementById('submitBtn')
    .setAttribute('onclick', `updateDeails(${id})`);
  const response = await fetch(url);
  const managerDetails = await response.json();

  try {
    if (!response.ok) {
      throw new Error('Error In Get Customer Details');
    }
    if (response.status == 200) {
      for (const key in managerDetails[0]) {
        let element = document.querySelector(`[name="${key}"]`);
        switch (key) {
          case 'firstname':
            element.value = managerDetails[0][key];
            break;
          case 'lastname':
            element.value = managerDetails[0][key];
            break;
          case 'email':
            element.value = managerDetails[0][key];
            break;
        }
      }
      getAllStore();
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateDeails(id) {
  try {
    const data = formData('form');
    data.id = id;
    url = `/updatemanager`;

    const managerValidation = manageManagerFormValidation(data);
    if (Object.keys(managerValidation).length > 0) {
      //----client side validation error
      errorShow(managerValidation);
    } else {
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert('Manager updated');
        window.location = `/manager`;
      }
      if (response.status == 409) {
        document.getElementById('error').innerHTML = 'manager already exist';
        document.getElementById('error').style.color = 'red';
      }
      if (response.status == 400) {
        const errorObject = await response.json();
        errorShow(errorObject);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteManager(manager) {
  const id = manager.id;

  let modal = new bootstrap.Modal(document.getElementById('deleteModal'));
  modal.show();
  let confirm = document.getElementById('confirm');
  confirm.setAttribute('onclick', `deleteManagerPop(${id})`);
}

async function deleteManagerPop(id) {
  url = `/api/deleteManager/${id}`;
  const response = await fetch(url);
  try {
    if (response.status == 200) {
      const message = await response.json();
      window.location = '/manager';
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

function managerFilter() {
  let status = document.getElementById('status').value;
  url = `/api/getmanagers?status=${status}`;
  paggination(url);
}
managerFilter();

function filterUp(event, order) {
  let status = document.getElementById('status').value;
  const key = event.target.getAttribute('id');
  url = `/api/getmanagers?status=${status}&field=id&order=${order}`;
  paggination(url);
}

const search = (key) => {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = key;

  filter = input;
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');
  console.log(tr, 'aaaaa');
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    for (let j = 0; j < 5; j++) {
      console.log(tr[i], 'heer');
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
