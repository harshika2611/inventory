let validation = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
};
let id = new URLSearchParams(window.location.search).get('id');
const productformData = new FormData(document.getElementById('productForm1'));
let fData = Object.fromEntries(productformData);
let formtitles = Object.keys(fData);

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
    document.getElementById('productForm1')
  );
  let Newdata = {
    product: Object.fromEntries(productNewformData),
    status: true,
    error: [],
  };

  for (let data of formtitles) {
    if (!(data == 'productname' || data == 'description')) {
      if (!Newdata.product[data].trim().match(validation.numberOnly)) {
        Newdata.status = false;
        Newdata.error.push(data);
        document.getElementById(data).classList.add('is-invalid');
        document.getElementById(
          `error${data}`
        ).innerHTML = `<div class="text-danger my-2">Please enter valid ${data}</div> `;
      } else {
        if (Newdata.product[data].trim().length != 6 && data == 'skuid') {
          Newdata.status = false;
          Newdata.error.push(data);
          document.getElementById(data).classList.add('is-invalid');
          document.getElementById(
            `error${data}`
          ).innerHTML = `<div class="text-danger my-2">Please enter valid length of ${data} </div> `;
        } else {
          document.getElementById(`error${data}`).innerHTML = ``;
          document.getElementById(data).classList.remove('is-invalid');
        }
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
      if (response.status == 200) {
        messagePopUp(res.message);
        formtitles.forEach((e) => {
          document.getElementById(e).disabled = true;
          document.getElementById(`error${e}`).innerHTML = ``;
          document.getElementById(e).classList.remove('is-invalid');
        });
        document.getElementById('submit').disabled = true;
        document.getElementById('edit').disabled = false;
      } else {
        if (response.status == 500) {
          messagePopUp(res.message);
        } else {
          document.getElementById(res.field).classList.add('is-invalid');
          document.getElementById(
            `error${res.field}`
          ).innerHTML = `<div class="text-danger my-2">Please enter valid ${res.field}</div> `;
          document.getElementById(res.field).focus();
        }
      }
    } catch (err) {
      messagePopUp('Product not updated...');
      console.log(err);
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
  document.getElementById('submit').disabled = true;
};
