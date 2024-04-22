function getStore() {
  paggination('/api/store');
}

function dataTableGrid(storeArray, startIndex) {
  const oldTable = document.getElementById('store__table');
  if (oldTable) {
    oldTable.remove();
  }

  const tableContainer = document.getElementById('store-section');
  const createTable = document.createElement('table');
  createTable.setAttribute('id', 'store__table');
  createTable.setAttribute('class', 'store__table');

  for (let key in storeArray[0]) {
    if (key === 'storeId') {
      key = 'No.';
    }
    const createTh = document.createElement('th');
    // createTh.setAttribute("class", "bg-dark text-light");
    createTh.textContent = key;
    createTable.appendChild(createTh);
  }
  const createTh = document.createElement('th');
  createTh.textContent = 'Action';
  // createTh.setAttribute("class", "bg-dark text-light");
  createTable.appendChild(createTh);

  for (let element of storeArray) {
    const createTr = document.createElement('tr');
    createTr.setAttribute('class', '');
    for (let key in element) {
      const createTd = document.createElement('td');
      if (key === 'storeId') {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else {
        createTd.textContent = element[key];
        createTr.appendChild(createTd);
      }
    }
    const createActionTd = document.createElement('td');
    createActionTd.setAttribute('class', 'store__actioncolumn');
    const createEditTd = document.createElement('td');
    createEditTd.setAttribute('id', `${element.storeId}`);
    createEditTd.setAttribute('class', 'store__actionbutton');
    createEditTd.setAttribute('onclick', 'openUpdateStoreForm(this)');
    const createEditButton = document.createElement('button');
    createEditButton.textContent = 'Edit';
    createEditButton.setAttribute('class', 'btn btn-outline-primary');
    createEditButton.setAttribute('width', '25');
    createEditButton.setAttribute('height', '25');
    createEditTd.appendChild(createEditButton);
    createActionTd.appendChild(createEditTd);

    const createDeleteTd = document.createElement('td');
    createDeleteTd.setAttribute('id', `${element.storeId}`);
    createDeleteTd.setAttribute('class', 'store__actionbutton');
    createDeleteTd.setAttribute(
      'onclick',
      `deleteStoreDetails(${element.storeId})`
    );
    const createDeleteButton = document.createElement('button');
    createDeleteButton.textContent = 'Delete';
    createDeleteButton.setAttribute('class', 'btn btn-outline-danger');
    createDeleteButton.setAttribute('width', '25');
    createDeleteButton.setAttribute('height', '25');
    createDeleteTd.appendChild(createDeleteButton);
    createActionTd.appendChild(createDeleteTd);
    createTr.appendChild(createActionTd);

    createTable.appendChild(createTr);
  }
  tableContainer.appendChild(createTable);
}

async function addNewStore() {
  const storeForm = document.getElementById('myForm');
  storeForm.style.display = 'block';
  document.getElementById('store-section').style = `
  filter: blur(5px);
  `;
  document.getElementById('header').style = `
  filter: blur(5px);
  `;
  document.getElementById('insertButton').style.display = 'block';
  document.getElementById('updateButton').style.display = 'none';
  // window.location.replace('/store')
  getAllState('stateSelectCombo'); //second parameter those state we need to selected
}

async function submitStoreDetails() {
  const storeFormData = formData('storeForm'); //parameter as formname
  // const storeDetailsValidation = manageCustomerFormValidation(storeFormData);
  // document.getElementById("storeForm").action = '/insertStore'
  // const storeDetailsValidation = true;

  // if (Object.keys(storeDetailsValidation).length > 0) {
  //   //----client side validation error
  //   errorShow(storeDetailsValidation);
  // } else {
  //----backend
  const storeValidation = storeFormValidation(storeFormData);
    if (Object.keys(storeValidation).length > 0) {
      //----client side validation error
      errorShow(storeValidation);
    } else {
  const response = await fetch('/insertStore', {
    method: 'POST',
    body: JSON.stringify(storeFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let result = await response.json();

  try {
    console.log(result.status);
    // if (!result.ok) {
    //   throw new Error("Error In Backend Validation Manage Store");
    // }

    if (result.status === 200) {
      // const responseMessage = await response.json();
      // console.log(response.status);
      // console.log(responseMessage.message);
      window.location.href = '/store';
    }
  } catch (error) {
    console.log(error);

    if (result.status === 400) {
      // const errorObject = await response.json();
      // console.log(errorObject);
      // errorShow(errorObject);
    }
  }
  }
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('store-section').style = 'none';
  document.getElementById('header').style = 'none';
}

//---------update store details
async function openUpdateStoreForm(store) {
  const storeId = store.id;
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('insertButton').style.display = 'none';
  document.getElementById('updateButton').style.display = 'block';
  document.getElementById('store-section').style = `-webkit-filter: blur(2px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  `;
  document.getElementById('header').style = `-webkit-filter: blur(2px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  `;
  document.getElementById('updateButton').setAttribute("onclick",`updateStoreDetails(${storeId})`);

  const response = await fetch(`/getStore/?storeId=${storeId}`, {
    method: 'GET',
  });
  const storeDetails = await response.json();

  try {
    if (!response.ok) {
      throw new Error('Error In Get Store Details');
    }

    if (response.status === 200) {
      document.getElementsByName('storageName')[0].value =
        storeDetails[0].Storagename;
      let storeType = document.getElementsByName('storeType')[0];
      storeType.value = storeDetails[0].StorageTypeId;
      // console.log(storeDetails[0]);
      getAllState('stateSelectCombo', storeDetails[0].state);
      const stateSelectCombo = { id: 'stateSelectCombo' };
      getCity(stateSelectCombo, storeDetails[0].state, storeDetails[0].city);
    }
  } catch (error) {
    if (response.status === 404) {
      console.log(storeDetails.message);
    }

    if (response.status === 500) {
      console.log(storeDetails.message);
    }
  }
}

async function updateStoreDetails(storeId) {
  
  const storeFormData = formData('storeForm'); //parameter as formname
  storeFormData.storeId = storeId;
  //----backend
  const storeValidation = storeFormValidation(storeFormData);
  if (Object.keys(storeValidation).length > 0) {
    //----client side validation error
    errorShow(storeValidation);
  } else {
    const response = await fetch('/updateStore', {
      method: 'POST',
      body: JSON.stringify(storeFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      if (!response.ok) {
        throw new Error('Error In Backend Validation Manage Store');
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        window.location.replace(
          window.location.protocol + '//' + window.location.host + `/store`
        );
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        const errorObject = await response.json();
        console.log(errorObject);
        errorShow(errorObject);
      }

      if (response.status === 404) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
      }

      if (response.status === 500) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
      }
    }
  }
}
// }

async function deleteStoreDetails(storeId) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-2',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: 'Delete Warehouse?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deletedata(storeId);
        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Cancelled...',
          icon: 'error',
        });
      }
    });
}

const deletedata = async (storeId) => {
  const response = await fetch(`/deleteStore/?storeId=${storeId}`, {
    method: 'POST',
  });
  window.location.replace('/store');
};

// Search

function debounce(cb, interval, immediate) {
  var timeout;

  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) cb.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, interval);

    if (callNow) cb.apply(context, args);
  };
}

const search = (key) => {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = key;
  // console.log(input);
  filter = input;
  table = document.getElementById('store__table');
  tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    for (let j = 0; j < 5; j++) {
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
// document.getElementById('input').onkeyup = debounce(search, 400);
