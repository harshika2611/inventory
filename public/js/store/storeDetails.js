let id = new URLSearchParams(window.location.search).get('id');

function dataTableGrid(store, startIndex) {
  const table = document.getElementById('thead');
  const tableBody = document.getElementById('tbody');
  let createTh = document.createElement('th');
  let createTr = document.createElement('tr');
  let span = document.createElement('span');
  table.innerHTML = '';
  tableBody.innerHTML = '';
  createTh.innerHTML = '';

  for (let key of [
    'id',
    'Productname',
    'SKUid',
    'Category',
    'Cost',
    'Description',
  ]) {
    if (key === 'id') {
      key = 'No.';
    }
    span = document.createElement('span');
    span.setAttribute('class', 'd-inline-flex flex-row align-items-center');
    createTh = document.createElement('th');
    createTh.setAttribute('class', 'align-middle');
    span.textContent = key;
    createTr.appendChild(createTh);
    createTh.appendChild(span);
    table.appendChild(createTr);
    let spanMain = document.createElement('span');
    spanMain.setAttribute(
      'class',
      'd-inline-flex flex-column align-items-center ms-2'
    );
    let span1 = document.createElement('span');
    span1.textContent = '^';
    span1.setAttribute('class', 'span1');
    span1.setAttribute('onclick', `filterUp(event,'ASC')`);
    span1.setAttribute('id', `${key}`);

    let span2 = document.createElement('span');
    span2.textContent = '^';
    span2.setAttribute('class', 'span2');
    span2.setAttribute('onclick', `filterUp(event,'DESC')`);
    span2.setAttribute('id', `${key}`);
    spanMain.appendChild(span1);
    spanMain.appendChild(span2);
    span.appendChild(spanMain);
    if (key == 'No.') {
      spanMain.remove();
    }
  }

  createTh = document.createElement('th');
  createTh.setAttribute('class', 'align-middle');
  createTh.textContent = 'Action';
  createTh.colSpan = '2';
  createTr.appendChild(createTh);
  table.appendChild(createTr);

  for (const element of store) {
    let createTr = document.createElement('tr');
    tableBody.appendChild(createTr);

    for (const key in element) {
      const createTd = document.createElement('td');
      if (key == 'id') {
        createTd.textContent = ++startIndex;
        createTr.appendChild(createTd);
      } else if (key !== 'is_delete') {
        createTd.textContent = element[key] == null ? '-' : element[key];
        createTr.appendChild(createTd);
      }
    }
    if (element['is_delete'] == 0) {
      const createEditTd = document.createElement('td');
      const achor = document.createElement('a');
      achor.setAttribute('href', `/productinfo?id=${element.id}`);
      createEditTd.setAttribute('class', 'editButton');
      createEditTd.setAttribute('id', `${element.id}`);
      const createEditButton = document.createElement('button');
      createEditButton.setAttribute('type', 'button');
      createEditButton.textContent = 'Edit';
      createEditButton.setAttribute('class', 'btn btn-success');
      const createDeleteTd = document.createElement('td');
      createDeleteTd.setAttribute('id', `${element.id}`);
      const createDeleteButton = document.createElement('button');
      createDeleteButton.textContent = 'Delete';
      createDeleteButton.setAttribute('class', 'btn btn-danger');
      createDeleteButton.setAttribute('id', `${element.id}`);
      createDeleteButton.setAttribute('type', 'button');
      createDeleteButton.setAttribute('onclick', 'deleteProduct(this)');
      createDeleteTd.appendChild(createDeleteButton);
      achor.appendChild(createEditButton);
      createEditTd.appendChild(achor);
      createTr.appendChild(createEditTd);
      createTr.appendChild(createDeleteTd);
    } else if (element['is_delete'] == 1) {
      let actionTd = document.createElement('td');
      actionTd.setAttribute('colspan', 2);
      actionTd.innerHTML = `<b><i>DELETED</i></b>`;
      createTr.appendChild(actionTd);
    }
  }
}




const loadData = async () => {
  await paggination(`/api/storeProducts?id=${id}`);
};
loadData();
