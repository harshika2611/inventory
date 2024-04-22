let validation = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
};
const productformData = new FormData(document.getElementById('productForm'));
let fData = Object.fromEntries(productformData);
let formtitles = Object.keys(fData);
console.log(fData);
// console.log(customerFormData);

const fetchApi = async (api) => {
  let response = await fetch(api);
  let data = await response.json();
  return data;
};

const editData = async () => {
  formtitles.forEach((e) => {
    document.getElementById(e).disabled = false;
  });
  document.getElementById('submit').disabled = false;
  document.getElementById('edit').disabled = true;
};

const submitData = async () => {
  document.getElementById('submit').disabled = true;
  document.getElementById('edit').disabled = false;

  const productNewformData = new FormData(
    document.getElementById('productForm')
  );
  let Newdata = {
    product: Object.fromEntries(productNewformData),
    status: false,
  };

  for (let data of formtitles) {
    if (!(data == 'productname' || data == 'description')) {
      let titleData = Newdata.product[data].trim();
      if (!titleData.match(validation.numberOnly)) {
        document.getElementById(
          `error${data}`
        ).innerHTML += `<div class="alert alert-danger my-2">Please enter valid ${data}</div> `;
      }
    }
  }
  if (!Newdata.status) {
    console.log(Newdata.product);
  }
  formtitles.forEach((e) => {
    document.getElementById(e).disabled = true;
  });
};

const loadData = async () => {
  let product = await fetchApi(`api/products?id=1`);
  let combo = await fetchApi(`api/combos/productCategory`);
  let title = Object.keys(product[0]);

  for (let e in title) {
    if (!(title[e] == 'category')) {
      document.getElementById(formtitles[e]).value = product[0][title[e]];
    }
  }
  let option = document.getElementById('category');
  option.innerHTML = ``;
  combo.map((o) => {
    option.innerHTML += `<option value="${o.opt_id}">
        ${o.value}
      </option>`;
  });
  formtitles.map((e) => {
    document.getElementById(e).disabled = true;
  });
};
loadData();
