async function fetching(offset) {
  // let orderby = document.getElementById('orderby').value;
  // let order = document.getElementById('order').value;
  let storage = '';
  if (document.getElementById('storageCombo') != null) {
    storage = document.getElementById('storageCombo').value;
  }
  url = `/salesorder?storage=${storage}`;
  // if (offset != ''||offset) {
    url = url + offset;
  // }
  paggination(url);
}

let count = 1;
function dataTableGrid(result) {
  allRecords = result;
  console.log(result);
  let head = `<tr>`;
  for (let key in result[0]) {
    if (
      key != 'created_at' &&
      key != 'customer_id' &&
      key != 'storage_id' &&
      key != 'is_delete'
    ) {
      head += `<th scope="col"> <span class="d-inline-flex flex-row align-items-center">${key} <span class="d-inline-flex flex-column align-items-center ms-2">
      <span style="cursor: pointer" onclick="onclickOrderby('${key}','asc')">^</span>
      <span style="rotate: 180deg; cursor: pointer" onclick="onclickOrderby('${key}','desc')">^</span></span>
    </span></th>`;
    }
  }
  head += `<th scope="col" style="text-align: center;">Actions</th>`;
  head += `</tr>`;
  document.getElementById('thead').innerHTML = head;

  let body = ``;
  result.forEach((data) => {
    body += `<tr>
        <td scope="row">${data.ID}</td>
        <td>${data.FirstName}</td>
        <td>${data.LastName}</td>
        <td>${data.Amount}</td>
				<td>${data.OrderType == 8 ? 'Sales' : 'Return'}</td>
        <td>${data.ShippingAddress}</td>
        <td>${data.PaymentStatus == 10 ? 'Pending' : 'Paid'}</td>
        <td>${data.Date.split('T')[0]}</td>
        ${
          data.is_delete == 0
            ? `<td><a class="btn btn-outline-primary" onclick="viewOrder(${data.ID})">View</a>
      <a class='btn btn-success' id=${data.storage_id}edit${data.ID} onclick="updateOrder('edit',event,'order')">EDIT</a>
       <a class="btn btn-danger" id=${data.storage_id}delete${data.ID} onclick="updateOrder('delete',event,'order')">DELETE</a></td>
        `
            : `<td><p class="deleted">DELETED</p></td>`
        }</tr>`;
    count++;
  });
  document.getElementById('tbody').innerHTML = body;
}

/* <td><a class="btn btn-outline-primary" onclick="generatePdf(${data.ID})">Invoice</a></td> */

// function generatePdf(id) {
//   console.log(id);
//   window.location.href = `/getPdf?id=${id}`
// }
function viewOrder(id) {
  console.log(id);
  window.location.href = `/salesOrderView?invoiceId=${id}&type=invoice`;
}

function searchFilter() {
  let searchbar = document.getElementById('searchbar').value.toLowerCase();
  if (searchbar == '') {
    paggination(null, dataArray);
  } else {
    filteredResult = dataArray.filter((ele) => {
      return (
        ele.FirstName.toLowerCase().includes(searchbar) ||
        ele.LastName.toLowerCase().includes(searchbar) ||
        ele.ShippingAddress.toLowerCase().includes(searchbar) ||
        // ele.amount.toString().includes(searchbar) ||
        ele.Date.includes(searchbar)
      );
    });
    console.log(filteredResult);
    paggination(null, filteredResult);
  }
}

function onclickOrderby(col, type) {
  fetching(`&orderby=${col}&order=${type}`);
}

async function onLoad() {
  if (document.getElementById('storageCombo') != null) {
    const storageOptionos = await generateWarehousesDropDown(1);
    document.getElementById('storageCombo').innerHTML = storageOptionos;
  }
  fetching();
}
onLoad();

function generateWarehousesDropDown(id = null) {
  return fetch('api/purchase/warehouses')
    .then((res) => res.json())
    .then((data) => {
      let content = '';

      Object.entries(Object.groupBy(data, ({ value }) => value)).forEach(
        (arr) => {
          content += `<optgroup label="${arr[0]}">`;
          arr[1].forEach((o) => {
            content += `<option value="${o.id}" ${
              o.id == id ? 'selected="selected"' : ''
            }>${o.name} (${o.city_name})</option>`;
          });
          content += `</optgroup>`;
        }
      );

      return content;
    })
    .catch(() => '');
}
