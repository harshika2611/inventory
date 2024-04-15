  async function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("insertStore").style.display = "block";
    document.getElementById("updateStore").style.display = "none";
    
    document.getElementById("childbody").style = `
-webkit-filter: blur(2px);
-moz-filter: blur(2px);
-o-filter: blur(2px);
-ms-filter: blur(2px);
filter: blur(2px); `;

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
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("childbody").style = "none";
  }
  async function deleteStore(name) {
    let storeDelete = await fetch(`/deleteStore/${name}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    let response = await storeDelete.json();
    if (response.message == "Store Deleted") {
      window.location.href = "/store";
    }
  }
