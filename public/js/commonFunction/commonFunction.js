//----common function

function formData(formName) {
  const form = document.forms[formName];

  const formData = new FormData(form);

  let formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  return formDataObject;
}

//----error show in form validation
function errorShow(errorObject) {
  const allSpan = document.querySelectorAll('.errorspan');

  allSpan.forEach((element) => {
    element.remove();
  });

  for (let key in errorObject) {
    // console.log(key + " " + errorObject[key]);
    const targetElement = document.querySelector(`[name="${key}"]`);
    if (targetElement) {
      const errorSpan = targetElement.nextElementSibling;

      if (errorSpan && errorSpan.classList.contains('errorspan')) {
        errorSpan.textContent = errorObject[key];
      } else {
        //errorspan not exist
        const createSpan = document.createElement('span');
        createSpan.textContent = errorObject[key];
        createSpan.setAttribute('class', 'errorspan');
        createSpan.style.color = 'red';
        targetElement.insertAdjacentElement('afterend', createSpan);
      }
    }
  }
  // const allSpans = document.querySelectorAll(".errorspan");
  // allSpans.forEach(span => {
  //   if (!errorObject.hasOwnProperty(span.previousElementSibling.name)) {
  //     span.remove(); // Remove only if the corresponding input has no error
  //   }
  // });
}

async function getAllState(selectComboId, selectStateName) {
  const response = await fetch('/api/getState', {
    method: 'GET',
  });
  try {
    if (!response.ok) {
      throw new Error("Can't get state");
    }

    if (response.status === 200) {
      const stateObject = await response.json();
      const stateArray = stateObject.stateArray;

      const stateSelectCombo = document.getElementById(`${selectComboId}`);

      const optionCreate = document.createElement('option');
      optionCreate.innerHTML = 'Select State';
      stateSelectCombo.appendChild(optionCreate);

      stateArray.forEach((element, index) => {
        const option = document.createElement('option');
        option.innerHTML = `${element.state_name}`;
        option.setAttribute('id', `state${element.state_id}`);
        option.setAttribute('value', `${element.state_name}`);
        stateSelectCombo.appendChild(option);

        //--this condition useful during update when data selected show
        if (selectStateName && element.state_name === selectStateName) {
          stateSelectCombo.selectedIndex = index + 1;
        }
      });
    }
  } catch (error) {
    console.log(error);

    if (response.status === 404) {
      console.log('StateArray is empty');
    }
    if (response.status === 500) {
      console.log('Something went wrong');
    }
  }
}

//----get city according to state select
//---this function also use during update city selected show
//----in this statename and cityname show

async function getCity(stateSelectCombo, selectedStateName, selectedCityName) {
  const stateSelectComboId = stateSelectCombo.id;
  let stateName = document.getElementById(`${stateSelectComboId}`).value;
  // console.log(stateSelectComboId);
  // console.log(stateName);

  if (selectedStateName && selectedCityName) {
    stateName = selectedStateName;
  }

  const response = await fetch('/api/getCity', {
    method: 'POST',
    body: JSON.stringify({ state: `${stateName}` }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (!response.ok) {
      throw new Error("Can't get city");
    }

    if (response.status === 200) {
      const cityObject = await response.json();
      const cityArray = cityObject.cityArray;

      const citySelectCombo = document.getElementById('citySelectCombo');

      citySelectCombo.innerHTML = '';

      const defaultOption = document.createElement('option');
      defaultOption.innerHTML = 'Select City';
      citySelectCombo.appendChild(defaultOption);

      cityArray.forEach((element, index) => {
        const optionCreate = document.createElement('option');
        optionCreate.innerHTML = `${element.city_name}`;
        optionCreate.setAttribute('id', `city${element.city_id}`);
        optionCreate.setAttribute('value', `${element.city_name}`);
        citySelectCombo.appendChild(optionCreate);

        if (
          selectedStateName &&
          selectedCityName &&
          element.city_name === selectedCityName
        ) {
          citySelectCombo.selectedIndex = index + 1;
        }
      });
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

function renderTimestamp(databaseDate) {
  const storedDate = new Date(databaseDate);

  return storedDate.toLocaleString();
}
