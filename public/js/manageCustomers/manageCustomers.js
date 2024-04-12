async function addNewCustomer() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";

  try {
    const response = await fetch('/api/getState', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error("Can't get state");
    }

    if (response.status === 200) {
      const stateArray = await response.json();
      console.log(response.status);
    }
  } catch (error) {
    console.log(response.status);
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
