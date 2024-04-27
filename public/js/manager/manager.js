let url = new URL(window.location.href);

function addManager() {
  const customerForm = document.getElementById('myForm');
  customerForm.style.display = 'block';
  document.getElementById('submitBtn').innerHTML = 'Submit';
  document.getElementById('filter').style = `filter: blur(2px);`;
  document.getElementById('head').style = `filter: blur(2px);`;
  document.getElementById('grid').style = `filter: blur(2px);`;
  // getAllStore();
  getAllCity('state');
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('filter').style = 'none';
  document.getElementById('grid').style = 'none';
  document.getElementById('head').style = 'none';
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

const getAllCity = async (id, name) => {
  try {
    console.log(id, name);
    const response = await fetch('/cityCombo');
    const data = await response.json();
    const store = data.result;
    let option = document.getElementById(`${id}`);
    option.innerHTML = '';
    option.innerHTML = `<option value="select here">Select here</option>`;
    store.forEach((element, index) => {
      option.innerHTML += `<option value="${element.city_id}">${element.city_name}</option>`;

      if (name && element.city_name === name) {
        option.selectedIndex = index + 1;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStore = async (state, name, cityName) => {
  try {
    console.log(state, name, cityName, 'ehat');
    let index = document.getElementById('state').value;
    let option = document.getElementById('place');
    const response = await fetch(`/storeCombo/${index}`);
    const data = await response.json();
    const store = data.result;
    option.innerHTML = '';
    store.forEach((element) => {
      option.innerHTML += `<option value="${element.id}">${element.name}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
};

function dataTableGrid(manager, startIndex) {
  const table = document.getElementById('thead');
  const tableBody = document.getElementById('tbody');
  let createTh = document.createElement('th');
  let createTr = document.createElement('tr');
  let span = document.createElement('span');
  table.innerHTML = '';
  tableBody.innerHTML = '';
  createTh.innerHTML = '';
  for (let key in manager[0]) {
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
      'd-inline-flex flex-column align-items-center ms-3'
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

    if (key == 'No.' || key == 'Status') {
      spanMain.remove();
    }
  }
  createTh = document.createElement('th');
  createTh.setAttribute('class', 'align-middle');
  createTh.textContent = 'Action';
  createTh.colSpan = '2';
  createTr.appendChild(createTh);
  table.appendChild(createTr);

  for (const element of manager) {
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
    createEditTd.setAttribute('class', 'editButton');
    createEditTd.setAttribute('id', `${element.id}`);
    createEditTd.setAttribute('onclick', 'updateManager(this)');
    const createEditButton = document.createElement('button');
    createEditButton.setAttribute('type', 'button');
    createEditButton.textContent = 'Edit';
    createEditButton.setAttribute('class', 'btn btn-outline-primary');
    createEditTd.appendChild(createEditButton);
    const createDeleteTd = document.createElement('td');
    createDeleteTd.setAttribute('id', `${element.id}`);
    createDeleteTd.setAttribute('class', 'deleteButton');
    createDeleteTd.setAttribute('onclick', 'deleteManager(this)');
    const createDeleteButton = document.createElement('button');
    createDeleteButton.setAttribute('type', 'button');
    createDeleteButton.textContent = 'Delete';
    createDeleteButton.setAttribute('class', 'btn btn-outline-danger');
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
          case 'city_name':
            const state = { id: 'state' };
            await getAllCity('state', managerDetails[0].city_name);
            let stateCombo = document.getElementById('state');
            console.log(state, managerDetails[0][key]);
            for (op of stateCombo) {
              console.log(op);
              if (op.value === managerDetails[0][key]) {
                op.setAttribute('selected', true);
              } else {
                op.setAttribute('selected', false);
              }
            }
            break;
        }
        getAllStore(state, managerDetails[0].name, managerDetails[0].city_name);
      }
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
