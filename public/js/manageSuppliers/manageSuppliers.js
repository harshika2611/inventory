function getSuppliers() {
  paggination("/api/manageSuppliers");
}

function dataTableGrid(supplierArray, startIndex) {
  //-----div contain table
  //-----old exist table remove
  const oldTable = document.getElementById("managesupplier__table");
  if (oldTable) {
    oldTable.remove();
  }

  const tableContainer = document.getElementById("managesupplier-container");
  const createTable = document.createElement("table");
  createTable.setAttribute("id", "managesupplier__table");
  createTable.setAttribute("class", "managesupplier__table");

  for (let key in supplierArray[0]) {
    if (key === "SupplierId") {
      key = "No.";
    }
    const createTh = document.createElement("th");
    createTh.textContent = key;
    createTable.appendChild(createTh);
  }
  const createTh = document.createElement("th");
  createTh.textContent = "Action";
  createTable.appendChild(createTh);


  for (let element of supplierArray) {
    const createTr = document.createElement("tr");
    for (let key in element) {
      const createTd = document.createElement("td");
      if (key === "SupplierId") {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else {
        createTd.textContent = element[key];
        createTr.appendChild(createTd);
      }
    }
    const createActionTd = document.createElement("td");
    createActionTd.setAttribute("class", "managesupplier__actioncolumn");
    const createEditTd = document.createElement("td");
    createEditTd.setAttribute("id", `${element.SupplierId}`);
    createEditTd.setAttribute("class", "managesupplier__actionbutton");
    createEditTd.setAttribute("onclick", "openUpdateSupplierForm(this)");
    const createEditButton = document.createElement("img");
    createEditButton.setAttribute("src", "src/assets/manageCustomer/edit.svg");
    createEditButton.setAttribute("width", "25");
    createEditButton.setAttribute("height", "25");
    createEditTd.appendChild(createEditButton);
    createActionTd.appendChild(createEditTd);

    const createDeleteTd = document.createElement("td");
    createDeleteTd.setAttribute("id", `${element.SupplierId}`);
    createDeleteTd.setAttribute("class", "managesupplier__actionbutton");
    createDeleteTd.setAttribute("onclick", "deleteSupplierDetails(this)");
    const createDeleteButton = document.createElement("img");
    createDeleteButton.setAttribute("src", "src/assets/manageCustomer/delete.svg");
    createDeleteButton.setAttribute("width", "25");
    createDeleteButton.setAttribute("height", "25");
    createDeleteTd.appendChild(createDeleteButton);
    createActionTd.appendChild(createDeleteTd);
    createTr.appendChild(createActionTd);

    createTable.appendChild(createTr);
  }
  tableContainer.appendChild(createTable);
}

//---------addnew supplier
async function addNewSupplier() {
  const supplierForm = document.getElementById("myForm");
  supplierForm.style.display = "block";
  document.getElementById("submitButton").innerHTML = "Submit";
  document.getElementById("submitButton").setAttribute("onclick", `submitSupplierDetails()`);

  getAllState("stateSelectCombo");  //second parameter those state we need to selected 

  //---old field value clear
  const inputTag = supplierForm.querySelectorAll(".supplierInput");
  for (let element of inputTag) {
    element.value = "";
  }

  const selectTag = supplierForm.getElementsByTagName("select");
  for (let element of selectTag) {
    element.selectedIndex = 0;
  }
}


async function submitSupplierDetails() {
  const supplierFormData = formData('supplierForm');  //parameter as formname

  const supplierDetailsValidation = manageSupplierFormValidation(supplierFormData);

  if (Object.keys(supplierDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(supplierDetailsValidation);
  } else {
    //----backend
    const response = await fetch('/api/insertSupplier', {
      method: 'POST',
      body: JSON.stringify(supplierFormData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("Error In Backend Validation Manage Supplier");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        window.location.replace(window.location.protocol + "//" +
          window.location.host + `/manageSuppliers`);
        messagePopUp(responseMessage.message);
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        const errorObject = await response.json();
        console.log(errorObject);
        errorShow(errorObject);
      }
    }
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//---------update supplier details
async function openUpdateSupplierForm(supplier) {
  const supplierId = supplier.id;
  console.log(supplierId);
  document.getElementById("myForm").style.display = "block";
  document.getElementById("submitButton").innerHTML = "Update";
  document.getElementById("submitButton").setAttribute("onclick", `updateSupplierDetails(${supplierId})`);

  const response = await fetch(`/api/getSuppliers/?supplierId=${supplierId}`, {
    method: 'GET'
  });
  const supplierDetails = await response.json();

  console.log(supplierDetails[0]);
  try {
    if (!response.ok) {
      throw new Error("Error In Get Supplier Details");
    }

    if (response.status === 200) {
      for (let key in supplierDetails[0]) {
        let element = document.querySelector(`[name="${key}"]`);
        switch (key) {
          case "firstname":
            element.value = supplierDetails[0][key];
            break;
          case "lastname":
            element.value = supplierDetails[0][key];
            break;
          case "email":
            element.value = supplierDetails[0][key];
            break;
          case "phonenumber":
            element.value = supplierDetails[0][key];
            break;
          case "companyname":
            element.value = supplierDetails[0][key];
            break;
          case "gst":
            element.value = supplierDetails[0][key];
            break;
          case "address":
            element.value = supplierDetails[0][key];
            break;
          case "zipcode":
            element.value = supplierDetails[0][key];
            break;
        }
      }
      getAllState("stateSelectCombo", supplierDetails[0].state);
      const stateSelectCombo = { id: "stateSelectCombo" }
      getCity(stateSelectCombo, supplierDetails[0].state, supplierDetails[0].city);

    }
  } catch (error) {
    if (response.status === 404) {
      messagePopUp(supplierDetails.message);
      console.log(supplierDetails.message);
    }

    if (response.status === 500) {
      messagePopUp(supplierDetails.message);
      console.log(supplierDetails.message);
    }
  }
}

async function updateSupplierDetails(supplierId) {
  const supplierFormData = formData('supplierForm');  //parameter as formname
  supplierFormData.supplierId = supplierId;

  const supplierDetailsValidation = manageSupplierFormValidation(supplierFormData);

  if (Object.keys(supplierDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(supplierDetailsValidation);
  } else {
    //----backend

    const response = await fetch('/api/updateSupplier', {
      method: 'POST',
      body: JSON.stringify(supplierFormData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("Error In Backend Validation Manage Supplier");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        messagePopUp(responseMessage.message);
        window.location.replace(window.location.protocol + "//" +
          window.location.host + `/manageSuppliers`);
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
        messagePopUp(responseMessage.message);
      }

      if (response.status === 500) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        messagePopUp(responseMessage.message);
      }
    }
  }
}


//----delete supplier details
async function deleteSupplierDetails(supplier) {

  const supplierId = supplier.id;
  const response = await fetch(`/api/deleteSupplier?supplierId=${supplierId}`, {
    method: 'GET'
  });

  console.log(response.status);
  try {
    if (!response.ok) {
      throw new Error("Unable To Delete Supplier");
    }

    if (response.status === 200) {
      const responseMessage = await response.json();
      console.log(responseMessage.message);
      messagePopUp(responseMessage.message);
      window.location.replace(window.location.protocol + "//" +
        window.location.host + `/manageSuppliers`);
    }
  } catch (error) {
    const responseMessage = await response.json();
    if (response.status === 404) {
      console.log(responseMessage.message);
      messagePopUp(responseMessage.message);
    }

    if (response.status === 500) {
      console.log(responseMessage.message);
      messagePopUp(responseMessage.message);
    }
  }
}