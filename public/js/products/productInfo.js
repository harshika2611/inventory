let validation = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
};
const searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get('id');
const productformData = new FormData(document.getElementById('productForm1'));
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
  const productNewformData = new FormData(
    document.getElementById('productForm')
  );
  let Newdata = {
    product: Object.fromEntries(productNewformData),
    status: true,
    error: [],
  };

  for (let data of formtitles) {
    if (!(data == 'productname' || data == 'description')) {
      let titleData = Newdata.product[data].trim();
      if (!titleData.match(validation.numberOnly)) {
        Newdata.status = false;
        Newdata.error.push(data);
        document.getElementById(
          `error${data}`
        ).innerHTML = `<div class="alert alert-danger my-2">Please enter valid ${data}</div> `;
      } else {
        document.getElementById(`error${data}`).innerHTML = ``;
      }
    }
  }
  if (!Newdata.status) {
    Newdata.error.map((e) => {
      document.getElementById(e).focus();
    });
  } else {
    const body = new URLSearchParams();
    Object.entries(Newdata.product).forEach((arr) => {
      body.append(arr[0], arr[1].trim());
    });
    try {
      let response = await fetch(`/productInfo?id=${id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });
      let res = await response.json();
      if (response.status != 200) {
        if (response.status == 500) {
          messagePopUp(res.message);
        } else {
          document.getElementById(
            `error${res.field}`
          ).innerHTML = `<div class="alert alert-danger my-2">Please enter valid ${res.field}</div> `;
          document.getElementById(res.field).focus();
        }
      } else {
        messagePopUp(res.message);
        formtitles.forEach((e) => {
          document.getElementById(e).disabled = true;
        });
        document.getElementById('submit').disabled = true;
        document.getElementById('edit').disabled = false;
      }
    } catch (err) {
      messagePopUp('Product not updated...');
    }
  }
};

const loadData = async () => {
  let product = await fetchApi(`api/products?id=${id}`);
  let combo = await fetchApi(`api/combos/productCategory`);
  let title = Object.keys(product[0]);
  title.shift();
  for (let e in title) {
    if (title[e] != 'Category') {
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
