var productGridResult;
async function fetching() {
  let orderId = document.getElementById('productOrderId').value;
  let [result, response] = await commonFetch(
    `/getProductGrid?orderId=${orderId}`
  );
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
    <td>${data.quantity}</td>
		<td>${data.UnitPrice}</td> 
		<td>${data.Total}</td>
    <td><a class='btn btn-success' id="edit${data.id}" onclick="updateOrder('edit', event,'product')">EDIT</a></td>
    <td><a class="btn btn-danger" id="delete${data.id}" onclick="updateOrder('delete', event,'product')">DELETE</a></td>
    </tr>`;
    totalAmount += data.Total;
  });
  document.getElementById(
    'totalAmount'
  ).innerHTML = `Total Amount Is ${totalAmount}`;

  document.getElementById('productListBody').innerHTML = body;
}

let allProduct = [];
async function getallProducts() {
  let [result, response] = await commonFetch(`/getSalesProducts`);
  allProduct = result.rows;
  getProducts('');
}

async function getProducts(type) {
  let categoryId = document.getElementById(`${type}productCategory`).value;
  console.log(categoryId);
  let filterdResult = allProduct.filter((ele) => {
    console.log(ele.category_id, categoryId);
    if (ele.category_id == categoryId) {
      return ele;
    }
  });
  console.log(filterdResult);
  generateCombo(filterdResult, `${type}product`);
}

async function addProduct() {
  const productFormData = formData('productForm');
  const productValidation = productFormValidation(productFormData);
  // const productValidation = true;
  // if (Object.keys(productValidation).length > 0) {
  //   //----client side validation error
  //   errorShow(productValidation);
  // } else {
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
        fetching();
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        
        errorShow(result);
      }
    }
  }
// }

async function allocateProductEdit(id) {
  let data;
  productGridResult.forEach((ele) => {
    if (ele.id == id) {
      data = ele;
    }
  });
  let editcategory = document.getElementById('editcategory');
  for (op of editcategory) {
    if (op.innerHTML == data.Category) {
      op.setAttribute('selected', true);
    }
  }
  await getProducts('edit');
  let editproduct = document.getElementById('editproduct');
  for (op of editproduct) {
    if (op.innerHTML == data.name) {
      op.setAttribute('selected', true);
    }
  }
  document.getElementById('editQuantity').value = data.quantity;
}
async function editProduct(id) {
  const updateProduct = formData('updateProduct');
  let option = {
    method: 'POST',
    body: new URLSearchParams(updateProduct),
  };
  let [result, response] = await commonFetch(`/updateSalesProduct`, option);

  modelHide('productEdit');
  await fetching();
}
