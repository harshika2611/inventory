//---------addnew supplier
async function addNewSupplier() {
  const supplierForm = document.getElementById('myForm');
  supplierForm.style.display = 'block';
  document.getElementById('submitButton').innerHTML = 'Submit';
  document
    .getElementById('submitButton')
    .setAttribute('onclick', `submitSupplierDetails()`);

  const addNewCustomerButton = document.querySelector('.addnewcustomerbutton');

  getAllState('stateSelectCombo'); //second parameter those state we need to selected

  //---old field value clear
  const inputTag = supplierForm.querySelectorAll('.supplierInput');
  for (let element of inputTag) {
    element.value = '';
  }

  const selectTag = supplierForm.getElementsByTagName('select');
  for (let element of selectTag) {
    element.selectedIndex = 0;
  }
}

async function submitSupplierDetails() {
  const supplierFormData = formData('supplierForm'); //parameter as formname

  const supplierDetailsValidation =
    manageSupplierFormValidation(supplierFormData);
  // const supplierDetailsValidation = true;

  if (Object.keys(supplierDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(supplierDetailsValidation);
  } else {
    //----backend
    const response = await fetch('/api/insertSupplier', {
      method: 'POST',
      body: JSON.stringify(supplierFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      if (!response.ok) {
        throw new Error('Error In Backend Validation Manage Supplier');
      }

      if (response.status === 200) {
        const responseMessage = await response.json();

        //-----message pop up show
        const supplierForm = document.getElementById('myForm');
        supplierForm.style.display = 'none';
        getSuppliers();
        messagePopUp(responseMessage.message);

        //-----in the supplier form errorspan remove
        const allSpan = document.querySelectorAll('.errorspan');

        allSpan.forEach((element) => {
          element.remove();
        });

        // window.location.replace(window.location.protocol + "//" +
        //   window.location.host + `/manageSuppliers`);
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        const errorObject = await response.json();
        errorShow(errorObject);
      }
    }
  }
}
