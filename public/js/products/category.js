function addCategory() {
  const categoryForm = document.getElementById('myForm1');
  categoryForm.style.display = 'block';
};

const closeFormCategory = () => {
  document.getElementById('myForm1').style.display = 'none';
};

const submitbtn1 = async () => {
  try {
    const data = formData('categoryForm');
    const response = await fetch(`/category`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      alert('Category Added');
      closeFormCategory();
      fetchcategory();
    }
    if (response.status === 409) {
      document.getElementById('error').innerHTML = 'Category already exist';
      document.getElementById('error').style.color = 'red';
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchcategory = async () => {
  await paggination(`/api/category`);
};
fetchcategory();

const dataTableGrid = (category, startIndex) => {
  document.getElementById('cards').innerHTML = '';
  const cards = document.getElementById('cards');
  for (const element of category) {
    const card1 = document.createElement('div');
    card1.setAttribute('class', 'card1');
    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    const cardId = document.createElement('h5');
    const cardIn = document.createElement('div');
    cardIn.setAttribute('class', 'cardIn');
    const createDelete = document.createElement('td');
    createDelete.setAttribute('class', 'managecustomer__actionbutton');
    const createDeleteButton = document.createElement('img');
    createDeleteButton.setAttribute(
      'src',
      'src/assets/manageCustomer/delete.svg'
    );
    createDeleteButton.setAttribute('onclick', 'deleteCategory(this)');
    createDeleteButton.setAttribute('id', `${element.id}`);
    createDeleteButton.setAttribute('width', '25');
    createDeleteButton.setAttribute('height', '25');
    createDeleteButton.style.cursor = "pointer";

    for (const key in element) {
      if (key == 'id') {
        cardId.textContent = ++startIndex;

        cardIn.appendChild(cardId);
      }

      cardTitle.textContent = element['value'];
      cardIn.appendChild(cardTitle);
    }
    cardIn.appendChild(createDeleteButton);
    card1.appendChild(cardIn);
    cards.appendChild(card1);
  }
};


async function deleteCategory(category) {

  const responseDelete = await fetch('/api/deleteCategory', {
    method: 'POST',
    body: JSON.stringify({ categoryId: category.id }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    if (!responseDelete.ok) {
      throw new Error("Can't delete category");
    }

    if (responseDelete.status === 200) {
      const responseMessage = await responseDelete.json();
      messagePopUp(responseMessage.message);
      fetchcategory();
    }
  } catch (error) {
    const responseMessage = await responseDelete.json();
    if (responseDelete.status === 400) {
      messagePopUp(responseMessage.message);
    }
    if (responseDelete.status === 500) {
      messagePopUp(responseMessage.message);
    }
  }
}