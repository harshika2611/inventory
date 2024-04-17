async function getCustomers() {
  paggination("/api/manageCustomers");
}

function dataTableGrid(customerArray, startIndex) {
  // console.log(customerArray);
  //-----div contain table
  //-----old exist table remove
  const oldTable = document.getElementById("managecustomer__table");
  if (oldTable) {
    oldTable.remove();
  }

  const tableContainer = document.getElementById("managecustomer-container");
  const createTable = document.createElement("table");
  createTable.setAttribute("id", "managecustomer__table");
  createTable.setAttribute("class", "managecustomer__table");

  for (let key in customerArray[0]) {
    if (key === "CustomerId") {
      key = "No";
    }
    const createTh = document.createElement("th");
    createTh.textContent = key;
    createTable.appendChild(createTh);
  }
  const createTh = document.createElement("th");
  createTh.textContent = "Action";
  createTable.appendChild(createTh);


  for (let element of customerArray) {
    const createTr = document.createElement("tr");
    for (let key in element) {
      const createTd = document.createElement("td");
      if (key === "CustomerId") {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else {
        createTd.textContent = element[key];
        createTr.appendChild(createTd);
      }
    }
    const createActionTd = document.createElement("td");
    createActionTd.setAttribute("class", "managecustomer__actioncolumn");
    const createEditTd = document.createElement("td");
    createEditTd.setAttribute("id", `${element.CustomerId}`);
    createEditTd.setAttribute("class", "managecustomer__actionbutton");
    createEditTd.setAttribute("onclick", "openUpdateCustomerForm(this)");
    const createEditButton = document.createElement("img");
    createEditButton.setAttribute("src", "src/assets/manageCustomer/edit.svg");
    createEditButton.setAttribute("width", "25");
    createEditButton.setAttribute("height", "25");
    createEditTd.appendChild(createEditButton);
    createActionTd.appendChild(createEditTd);

    const createDeleteTd = document.createElement("td");
    createDeleteTd.setAttribute("id", `${element.CustomerId}`);
    createDeleteTd.setAttribute("class", "managecustomer__actionbutton");
    createDeleteTd.setAttribute("onclick", "deleteCustomerDetails(this)");
    const createDeleteButton = document.createElement("img");
    createDeleteButton.setAttribute("src", "src/assets/manageCustomer/delete.svg");
    createDeleteButton.setAttribute("width", "25");
    createDeleteButton.setAttribute("height", "25");
    createDeleteTd.appendChild(createDeleteButton);
    createActionTd.appendChild(createDeleteTd);
    createTr.appendChild(createActionTd);

    createTable.appendChild(createTr);
  }

  // for (let element of customerArray) {
  //   const createTr = document.createElement("tr");
  //   for (let key in element) {
  //     const createTd = document.createElement("td");
  //     createTd.textContent = element[key];
  //     createTr.appendChild(createTd);
  //   }
  //   const createEditTd = document.createElement("td");
  //   createEditTd.setAttribute("id", `${element.CustomerId}`);
  //   createEditTd.setAttribute("class", "managecustomer__actionbutton");
  //   createEditTd.setAttribute("onclick", "openUpdateCustomerForm(this)");
  //   const createEditButton = document.createElement("img");
  //   createEditButton.setAttribute("src", "src/assets/manageCustomer/edit.svg");
  //   createEditButton.setAttribute("width", "25");
  //   createEditButton.setAttribute("height", "25");
  //   createEditTd.appendChild(createEditButton);
  //   createTr.appendChild(createEditTd);

  //   const createDeleteTd = document.createElement("td");
  //   createDeleteTd.setAttribute("id", `${element.CustomerId}`);
  //   createDeleteTd.setAttribute("class", "managecustomer__actionbutton");
  //   createDeleteTd.setAttribute("onclick", "deleteCustomerDetails(this)");
  //   const createDeleteButton = document.createElement("img");
  //   createDeleteButton.setAttribute("src", "src/assets/manageCustomer/delete.svg");
  //   createDeleteButton.setAttribute("width", "25");
  //   createDeleteButton.setAttribute("height", "25");
  //   createDeleteTd.appendChild(createDeleteButton);
  //   createTr.appendChild(createDeleteTd);

  //   createTable.appendChild(createTr);
  // }
  tableContainer.appendChild(createTable);
}

//---------addnew customer
async function addNewCustomer() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";

  getAllState("stateSelectCombo");  //second parameter those state we need to selected 
}


async function submitCustomerDetails() {
  const customerFormData = formData('customerForm');  //parameter as formname

  const customerDetailsValidation = manageCustomerFormValidation(customerFormData);
  // const customerDetailsValidation = true;

  if (Object.keys(customerDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(customerDetailsValidation);
  } else {
    //----backend
    const response = await fetch('/api/insertCustomer', {
      method: 'POST',
      body: JSON.stringify(customerFormData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("Error In Backend Validation Manage Customer");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        window.location.replace(window.location.protocol + "//" +
          window.location.host + `/manageCustomers`)
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

//---------update customer details
async function openUpdateCustomerForm(customer) {
  const customerId = customer.id;
  document.getElementById("myForm").style.display = "block";
  document.getElementById("submitButton").innerHTML = "Update";
  document.getElementById("submitButton").innerHTML = "Update";
  document.getElementById("submitButton").setAttribute("onclick", `updateCustomerDetails(${customerId})`);

  const response = await fetch(`/api/getCustomers/?customerId=${customerId}`, {
    method: 'GET'
  });
  const customerDetails = await response.json();

  try {
    if (!response.ok) {
      throw new Error("Error In Get Customer Details");
    }

    if (response.status === 200) {
      // console.log(customerDetails[0]);
      for (let key in customerDetails[0]) {
        let element = document.querySelector(`[name="${key}"]`);
        switch (key) {
          case "firstname":
            element.value = customerDetails[0][key];
            break;
          case "lastname":
            element.value = customerDetails[0][key];
            break;
          case "email":
            element.value = customerDetails[0][key];
            break;
          case "phonenumber":
            element.value = customerDetails[0][key];
            break;
          case "address":
            element.value = customerDetails[0][key];
            break;
          case "zipcode":
            element.value = customerDetails[0][key];
            break;
        }
      }
      getAllState("stateSelectCombo", customerDetails[0].state);
      const stateSelectCombo = { id: "stateSelectCombo" }
      getCity(stateSelectCombo, customerDetails[0].state, customerDetails[0].city);

    }
  } catch (error) {
    if (response.status === 404) {
      console.log(customerDetails.message);
    }

    if (response.status === 500) {
      console.log(customerDetails.message);
    }
  }
}

async function updateCustomerDetails(customerId) {
  const customerFormData = formData('customerForm');  //parameter as formname
  customerFormData.customerId = customerId;

  const customerDetailsValidation = manageCustomerFormValidation(customerFormData);
  // const customerDetailsValidation = true;

  if (Object.keys(customerDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(customerDetailsValidation);
  } else {
    //----backend

    const response = await fetch('/api/updateCustomer', {
      method: 'POST',
      body: JSON.stringify(customerFormData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("Error In Backend Validation Manage Customer");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        console.log(response.status);
        console.log(responseMessage.message);
        window.location.replace(window.location.protocol + "//" +
          window.location.host + `/manageCustomers`)
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


//----delete customer details
async function deleteCustomerDetails(customer) {
  const customerId = customer.id;
  const response = await fetch(`/api/deleteCustomer?customerId=${customerId}`, {
    method: 'GET'
  });

  console.log(response.status);
  try {
    if (!response.ok) {
      throw new Error("Unable To Delete Customer");
    }

    if (response.status === 200) {
      const responseMessage = await response.json();
      console.log(responseMessage.message);
      window.location.replace(window.location.protocol + "//" +
        window.location.host + `/manageCustomers`);
    }
  } catch (error) {
    const responseMessage = await response.json();
    if (response.status === 404) {
      console.log(responseMessage.message);
    }

    if (response.status === 500) {
      console.log(responseMessage.message);
    }
  }
}