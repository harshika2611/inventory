async function updateOrder(type, event, page) {
  let deleteModal;
  let url = '';
  let editModalName;

  switch (page) {
    case 'order':
      url = 'salesNewOrder';
      deleteModal = 'deleteModal';
      break;
    case 'product':
      deleteModal = 'deleteModal';
      editModalName = 'productEdit';
      break;
  }
  let storage = event.target.getAttribute('id').split(`${type}`)[0];
  let id = event.target.getAttribute('id').split(`${type}`)[1];
  let modal = new bootstrap.Modal(document.getElementById(`${deleteModal}`));

  if (type == 'edit' && page == 'order') {
    window.location.href = `/${url}?id=${id}&storage=${storage}`;
  } else if (type == 'delete') {
    let confirm = document.getElementById('confirm'); //confirm btn id
    confirm.setAttribute(
      'onclick',
      `deleteOrder(${id},'${page}','${storage}')`
    );
    modal.show();
  }
}

async function fetchDelete(id, page, storage) {
  let url = '';

  switch (page) {
    case 'order':
      url = 'deleteSalesOrder';
      break;
    case 'product':
      url = 'deleteSalesProduct';
      break;
  }
  showLoader();
  const response = await fetch(`/${url}?id=${id}&storage=${storage}`);
  const result = await response.json();
  hideLoader();
  return;
}
function modelHide(modelName) {
  bootstrap.Modal.getInstance(document.getElementById(`${modelName}`)).hide();
}

async function deleteOrder(id, page, storage) {
  await fetchDelete(id, page, storage);
  modelHide('deleteModal');
  fetching();
}
