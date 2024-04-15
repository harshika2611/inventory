async function addNewCustomer() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";

  const response = await fetch('/api/getState', {
    method: 'GET'
  });

  try {
    if (!response.ok) {
      throw new Error("Can't get state");
    }

    if (response.status === 200) {
      const stateObject = await response.json();
      const stateArray = stateObject.stateArray;

      const stateSelectCombo = document.getElementById("stateSelectCombo");

      const optionCreate = document.createElement("option");
      optionCreate.innerHTML = "Select State";
      stateSelectCombo.appendChild(optionCreate);

      for (let element of stateArray) {
        const option = document.createElement("option");
        option.innerHTML = `${element.state_name}`;
        option.setAttribute("id", `state${element.state_id}`);
        option.setAttribute("value", `${element.state_name}`);
        stateSelectCombo.appendChild(option);
      }
    }
  } catch (error) {
    console.log(error);

    if (response.status === 404) {
      console.log("StateArray is empty");
    }
    if (response.status === 500) {
      console.log("Something went wrong");
    }
  }
}

async function getCity(stateSelectCombo) {
  const stateSelectComboId = stateSelectCombo.id;
  const stateName = document.getElementById(`${stateSelectComboId}`).value;

  const response = await fetch('/api/getCity', {
    method: 'POST',
    body: JSON.stringify({ state: `${stateName}` }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  try {
    if (!response.ok) {
      throw new Error("Can't get city");
    }

    if (response.status === 200) {
      const cityObject = await response.json();
      const cityArray = cityObject.cityArray;

      const citySelectCombo = document.getElementById("citySelectCombo");

      citySelectCombo.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.innerHTML = "Select City";
      citySelectCombo.appendChild(defaultOption);

      for (let element of cityArray) {
        const optionCreate = document.createElement("option");
        optionCreate.innerHTML = `${element.city_name}`;
        optionCreate.setAttribute("id", `city${element.city_id}`);
        optionCreate.setAttribute("value", `${element.city_name}`);
        citySelectCombo.appendChild(optionCreate);
      }
    }
  } catch (error) {
    if (response.status === 404) {
      console.log(response.message);
    }

    if (response.status === 500) {
      console.log(response.message);
    }
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// function addNewCustomer() {
//   const customerForm = document.getElementById("myForm");
//   customerForm.style.display = "block";
// }

function customerFilter() {

}
