let productGridResult;
async function fetching() {
  let orderId = document.getElementById('productOrderId').value;
  let [result, response] = await commonFetch(
    `/getProductGrid?orderId=${orderId}`
  );
  let storage = '';
  if (document.getElementById('storageCombo') != null) {
    storage = document.getElementById('storageCombo').value;
  }
  let totalAmount = 0;
  productGridResult = result.rows; //to select one row
  let head = `<tr>`;
  result.header.forEach((ele) => {
    if (ele != 'id') {
      head += `<th scope="col">${ele}</th>`;
    }
  });
  head += `<th scope="col">EDIT</th>
	<th scope="col">DELETE</th>
	</tr>`;
  document.getElementById('productListHead').innerHTML = head;

  let body = ``;
  result.rows.forEach((data) => {
    body += `<tr>
    <td hidden>${data.id}</td>
    <td>${data.product_name}</td>
    <td>${data.Category}</td>
    <td> <input type="text" class="form-control editQuantity" name="editQuantity${data.id}" id="editQuantity${data.id}" onkeyup="enableSave(${data.id})" value="${data.quantity}"></td>
		<td><select name="orderType${data.order_type}" class=" form-select dropdown-toggle orderType" id="orderType${data.id}" onchange="enableSave(${data.id})">
    </select> </td>
    <td>${data.UnitPrice}</td> 
		<td>${data.Total}</td>
    <td><a class='btn btn-secondary' id="${storage}edit${data.id}" disabled="true" onclick="">Save</a></td>
    <td><a class="btn btn-danger" id="${storage}delete${data.id}" onclick="updateOrder('delete', event,'product')">DELETE</a></td>
    </tr>`;
    document
      .getElementById('generatePdf')
      .setAttribute('onclick', `generatePdf(${orderId})`);
  });
  document.getElementById(
    'totalAmount'
  ).innerHTML = `Total Amount Is ${result.totalAmount}`;

  document.getElementById('productListBody').innerHTML = body;
  OrderTypeCombo();
}

function generatePdf(id) {
  console.log(id);
  window.location.href = `/getPdf?id=${id}&type=invoice`;
}

function enableSave(id) {
  let storage = '';
  if (document.getElementById('storageCombo') != null) {
    storage = document.getElementById('storageCombo').value;
  }
  btn = document.getElementById(`${storage}edit${id}`);
  if (btn.value != '') {
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-success');
    btn.setAttribute('onclick', `updateProduct(${id})`);
  } else {
    btn.classList.add('btn-secondary');
    btn.classList.remove('btn-success');
    btn.setAttribute('onclick', ``);
  }
}

let allProduct = [];
async function getallProducts() {
  let [result, response] = await commonFetch(`/getSalesProducts`);
  allProduct = result.rows;
  getProducts('');
}

async function getProducts() {
  let categoryId = document.getElementById(`productCategory`).value;
  let filterdResult = allProduct.filter((ele) => {
    console.log(ele.category_id, categoryId);
    if (ele.category_id == categoryId) {
      return ele;
    }
  });
  console.log(filterdResult);
  generateCombo(filterdResult, `product`);
}
async function addProduct() {
  const productFormData = formData('productForm');
  const productValidation = productFormValidation(productFormData);
  let storage = '';
  if (document.getElementById('storageCombo') != null) {
    storage = document.getElementById('storageCombo').value;
  }
  productFormData['storage'] = storage;
  if (Object.keys(productValidation).length > 0) {
    //----client side validation error
    errorShow(productValidation);
  } else {
    let form = document.getElementById('productForm');
    let option = {
      method: 'POST',
      body: new URLSearchParams(productFormData),
    };
    const [result, response] = await commonFetch('/insertSalesProduct', option);

    try {
      if (!response.ok) {
        throw new Error('Error In Backend Validation Manage Customer');
      }

      if (response.status === 200) {
        if (result.msg !== undefined) {
          // document.getElementById('quantityError').innerHTML = result.msg
          Swal.fire({
            title: 'oops!!',
            text: result.msg,
            icon: 'error',
            // toast: true,
            // position:"top-end"
          });
        } else {
          fetching();
        }
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        errorShow(result);
      }
    }
  }
}

async function updateProduct(id) {
  let storage = '';
  if (document.getElementById('storageCombo') != null) {
    storage = document.getElementById('storageCombo').value;
  }
  let quantity = document.getElementById(`editQuantity${id}`).value;
  let orderType = document.getElementById(`orderType${id}`).value;
  if (quantity > 0 && quantity !== '' && !isNaN(parseInt(quantity))) {
    let updateProductobj = {};
    updateProductobj['quantity'] = quantity;
    updateProductobj['id'] = id;
    updateProductobj['orderType'] = orderType;
    updateProductobj['storage'] = storage;
    let option = {
      method: 'POST',
      body: new URLSearchParams(updateProductobj),
    };

    let [result, response] = await commonFetch(`/updateSalesProduct`, option);
    if (response.status === 200) {
      try {
        if (result.flag === true) {
          Swal.fire({
            title: '',
            text: 'Successfully Updated',
            icon: 'success',
            // toast: true,
            // position: 'top-end',
          });
        } else {
          Swal.fire({
            title: 'Oops!!!',
            text: `Sorry! Max Available Stock is ${result.stock}`,
            icon: 'error',
            // toast: true,
            // position: 'top-end',
          });
        }
        await fetching();
      } catch (err) {
        if (response.status == 400) {
          errorShow(result);
        }
      }
    }
  } else {
    obj = {};
    console.log(`editQuantity${id}`);
    obj[`editQuantity${id}`] = '*Enter Valid Input';
    errorShow(obj);
  }
}

async function OrderTypeCombo() {
  const response = await fetch(`/api/combos/orderType`);
  const result = await response.json();
  let str;
  result.forEach((data) => {
    str += `<option value="${data.opt_id}">${data.value}</option>`;
  });
  let arr = document.getElementsByClassName(`orderType`);
  console.log(arr);
  for (ele of arr) {
    ele.innerHTML = str;
    let type = ele.getAttribute('name').split('orderType')[1];
    console.log(type);
    for (op of ele) {
      op.value == type ? op.setAttribute('selected', true) : '';
    }
  }
}
