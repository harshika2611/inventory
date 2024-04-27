function getCustomers() {
  // currentPage = 1;
  paggination('/api/manageCustomers');
}


function dataTableGrid(customerArray, startIndex) {
  // console.log(customerArray);
  //-----div contain table
  //-----old exist table remove
  const oldTable = document.getElementById('managecustomer__table');
  if (oldTable) {
    oldTable.remove();
  }
  const tableContainer = document.getElementById("managecustomer-container");

  if (customerArray.length === 0) {
    const notfoundmessage = document.getElementById("notfoundmessage");

    if (notfoundmessage) {
      notfoundmessage.remove();
    }
    const createP = document.createElement("p");
    createP.innerHTML = "Not Found";
    createP.setAttribute("id", "notfoundmessage");
    createP.style.textAlign = "center";
    createP.style.padding = "20px";
    createP.style.fontSize = "50px";
    tableContainer.appendChild(createP);
  } else {
    const notfoundmessage = document.getElementById("notfoundmessage");

    if (notfoundmessage) {
      notfoundmessage.remove();
    }
    //-----generate grid
    const createTable = document.createElement("table");
    createTable.setAttribute("id", "managecustomer__table");
    createTable.setAttribute("class", "managecustomer__table");

    for (let key in customerArray[0]) {
      if (key === "CustomerId") {
        key = "No.";
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
        switch (key) {
          case "CustomerId":
            createTd.textContent = ++startIndex;
            createTr.appendChild(createTd);
            break;

          case "Created":
            createTd.textContent = renderTimestamp(element[key]);
            createTr.appendChild(createTd);
            break;

          case "Updated":
            createTd.textContent = renderTimestamp(element[key]);
            createTr.appendChild(createTd);
            break;

          default:
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
    tableContainer.appendChild(createTable);
  }
}


function closeForm() {
  document.getElementById("myForm").style.display = "none";

  //-----in the customer form errorspan remove
  const allSpan = document.querySelectorAll('.errorspan');

  allSpan.forEach((element) => {
    element.remove();
  });
}


//----delete customer details
async function deleteCustomerDetails(customer) {
  const modal = new bootstrap.Modal('#deleteModal');

  modal.show();

  document.getElementById('confirm').onclick = async () => {
    const customerId = customer.id;
    const response = await fetch(`/api/deleteCustomer?customerId=${customerId}`, {
      method: 'GET',
    });

    console.log(response.status);
    try {
      if (!response.ok) {
        throw new Error('Unable To Delete Customer');
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        const customerForm = document.getElementById("myForm");
        customerForm.style.display = "none";
        getCustomers();
        messagePopUp(responseMessage.message);
      }
    } catch (error) {
      const responseMessage = await response.json();
      if (response.status === 404) {
        messagePopUp(responseMessage.message);
      }

      if (response.status === 500) {
        messagePopUp(responseMessage.message);
      }
    }
    modal.hide();
  };
}


function modelHide() {
  const modal = new bootstrap.Modal('#deleteModal');

  modal.hide();
}