const addCategory = () => {
  const categoryForm = document.getElementById('myForm1');
  categoryForm.style.display = 'block';
};

const closeForm = async () => {
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
    console.log(data);
    if (response.status === 200) {
      alert('Category Added');
      await closeForm();
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
    const buttonDiv = document.createElement('div');

    for (const key in element) {
      if (key == 'id') {
        cardId.textContent = ++startIndex;

        cardIn.appendChild(cardId);
      }

      cardTitle.textContent = element['value'];
      cardIn.appendChild(cardTitle);
    }
    cardIn.appendChild(buttonDiv);
    card1.appendChild(cardIn);
    cards.appendChild(card1);
  }
};
