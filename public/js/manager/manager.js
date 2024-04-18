function addManager() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";

  getAllStore();
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  // document.getElementById("childbody").style = "none";
}

async function submitbtn() {
  try {
    const data = formData("form");
    const managerValidation = manageManagerFormValidation(data);

    if (Object.keys(managerValidation).length > 0) {
      //----client side validation error
      errorShow(managerValidation);
    } else {
      const response = await fetch(`/manager`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert("Manager added");
        window.location = `/user`;
      }
      if (response.status === 409) {
        document.getElementById("error").innerHTML = "manager already exist";
        document.getElementById("error").style.color = "red";
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
    const response = await fetch("/storeCombo");
    const data = await response.json();

    const store = data.result;
    store.forEach((element) => {
      const option = (document.getElementById(
        "state"
      ).innerHTML += `<option value="${element.id}">${element.city_name}</option>`);
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllManager = async () => {
  paggination("/api/getmanagers");
};
function dataTableGrid(manager, startIndex) {
  const table = document.getElementById("thead");
  const tableBody = document.getElementById("tbody");

  for (let key in manager[0]) {
    if (key === "id") {
      key = "No.";
    }
    const createTh = document.createElement("th");
    createTh.textContent = key;
    table.appendChild(createTh);
  }
  const createTh = document.createElement("th");
  createTh.textContent = "Action";
  createTh.colSpan = "2";
  table.appendChild(createTh);

  for (const element of manager) {
    const createTr = document.createElement("tr");
    tableBody.appendChild(createTr);

    for (const key in element) {
      const createTd = document.createElement("td");
      if (key == "id") {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else {
        createTd.textContent = element[key];
        createTr.appendChild(createTd);
      }
    }

    const createEditTd = document.createElement("td");
    createEditTd.setAttribute("class", "editButton");
    createEditTd.setAttribute("id", `${element.id}`);
    createEditTd.setAttribute("onclick", "updateManager(this)");
    const createEditButton = document.createElement("img");
    createEditButton.setAttribute("src", "src/assets/manageCustomer/edit.svg");
    createEditButton.setAttribute("width", "25");
    createEditButton.setAttribute("height", "25");
    createEditTd.appendChild(createEditButton);
    const createDeleteTd = document.createElement("td");
    createDeleteTd.setAttribute("id", `${element.id}`);
    createDeleteTd.setAttribute("class", "deleteButton");
    const createDeleteButton = document.createElement("img");
    createDeleteButton.setAttribute(
      "src",
      "src/assets/manageCustomer/delete.svg"
    );
    createDeleteButton.setAttribute("width", "25");
    createDeleteButton.setAttribute("height", "25");
    createDeleteTd.appendChild(createDeleteButton);
    createTr.appendChild(createEditTd);
    createTr.appendChild(createDeleteTd);
  }
}

async function updateManager(manager) {
  const id = manager.id;
  console.log(id, "asssperrrrr");
  document.getElementById("myForm").style.display = "block";
  document.getElementById("submitBtn").innerHTML = "Update";
  document
    .getElementById("submitBtn")
    .setAttribute("onclick", `updateDeails(${id})`);
  const response = await fetch(`/api/getmanager/${id}`);
  const managerDetails = await response.json();
  console.log(managerDetails, "also");
  try {
    if (!response.ok) {
      throw new Error("Error In Get Customer Details");
    }
    if (response.status == 200) {
      for (const key in managerDetails[0]) {
        console.log(key, "abc");
        let element = document.querySelector(`[name="${key}"]`);
        switch (key) {
          case "firstname":
            element.value = managerDetails[0][key];
            break;
          case "lastname":
            element.value = managerDetails[0][key];
            break;
          case "email":
            element.value = managerDetails[0][key];
            break;
        }
      }
      getAllStore();
    }
  } catch (error) {}
}

async function updateDeails(id) {
  try {
    const data = formData("form");
    data.id = id;
    console.log(data, "heress");
    const managerValidation = manageManagerFormValidation(data);
    if (Object.keys(managerValidation).length > 0) {
      //----client side validation error
      errorShow(managerValidation);
    } else {
      const response = await fetch(`/updatemanager`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        alert("Manager updated");
        window.location = `/manager`;
      }
      if (response.status == 409) {
        document.getElementById("error").innerHTML = "manager already exist";
        document.getElementById("error").style.color = "red";
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
