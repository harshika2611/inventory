function getSuppliers() {
  currentPage = 1;
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

  if (supplierArray.length === 0) {
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
    //----generate grid
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
        switch (key) {
          case "SupplierId":
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
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  //-----in the supplier form errorspan remove
  const allSpan = document.querySelectorAll('.errorspan');

  allSpan.forEach((element) => {
    element.remove();
  });
}


//----delete supplier details
async function deleteSupplierDetails(supplier) {
  const modal = new bootstrap.Modal('#deleteModal');

  modal.show();

  document.getElementById('confirm').onclick = async () => {
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
        const supplierForm = document.getElementById("myForm");
        supplierForm.style.display = "none";
        getSuppliers();
        messagePopUp(responseMessage.message);
        // window.location.replace(window.location.protocol + "//" +
        //   window.location.host + `/manageSuppliers`);
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