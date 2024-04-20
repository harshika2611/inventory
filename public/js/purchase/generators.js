function generateDropDown(value, selectedId) {
  return fetch(`api/combos/${value}`)
    .then((res) => res.json())
    .then((data) => {
      let content = '';
      data.forEach((o) => {
        content += `<option value="${o.opt_id}" ${
          o.opt_id == selectedId ? 'selected="selected"' : ''
        }>
            ${o.value}
          </option>`;
      });
      return content;
    })
    .catch(() => '');
}

function generateSuppliersDropDown() {
  return fetch('api/purchase/suppliers')
    .then((res) => res.json())
    .then((data) => {
      let content = '';
      data.forEach((o) => {
        content += `<option value="${o.id}">${o?.firstname.concat(
          ' ',
          o?.lastname
        )}</option>`;
      });
      return content;
    })
    .catch(() => '');
}

function generateProductsDropDown(id, selectedId) {
  return id
    ? fetch('api/purchase/products/' + id)
        .then((res) => res.json())
        .then((data) => {
          let content = '';
          data.forEach((o) => {
            content += `<option value="${o.id}" ${
              o.id == selectedId ? 'selected="selected"' : ''
            } >${o.product_name}</option>`;
          });
          return content;
        })
        .catch(() => '')
    : '';
}

function generateWarehousesDropDown() {
  return fetch('api/purchase/warehouses')
    .then((res) => res.json())
    .then((data) => {
      let content = '';
      data.forEach((o) => {
        content += `<option value="${o.id}">${o.name}</option>`;
      });
      return content;
    })
    .catch(() => '');
}
