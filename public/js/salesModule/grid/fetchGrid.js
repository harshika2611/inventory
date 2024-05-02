const colmap = new Map([
  ['id', 'ID'],
  ['firstname', 'FirstName'],
  ['lastname', 'LastName'],
  ['id', 'ID'],
  ['amount', 'Amount'],
  ['shipping_address', 'ShippingAddress'],
  ['payment_status', 'PaymentStatus'],
  ['order_date', 'Date'],
  ['type', 'OrderType'],
]);

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
  let head = `<tr>`;
  if (result.length === 0) {
    document.getElementById('error').innerHTML = 'No Data Found!!!';
    document.getElementById('thead').innerHTML = '';
    document.getElementById('tbody').innerHTML = '';

  } else {
    document.getElementById('error').innerHTML = '';
    for (let key in result[0]) {
      if (
        key != 'created_at' &&
        key != 'customer_id' &&
        key != 'storage_id' &&
        key != 'is_delete'
      ) {
        head += `<th scope="col"> <span class="d-inline-flex flex-row align-items-center">${colmap.get(
          key
        )} <span class="d-inline-flex flex-column align-items-center ms-2">
      <span style="cursor: pointer" onclick="onclickOrderby('${key}','asc')">^</span>
      <span style="rotate: 180deg; cursor: pointer" onclick="onclickOrderby('${key}','desc')">^</span></span>
    </span></th>`;
      }
    }
    head += `<th scope="col" colspan="3" style="text-align: center;">Actions</th>`;
    head += `</tr>`;
    document.getElementById('thead').innerHTML = head;

    let body = ``;
    result.forEach((data) => {
      body += `<tr>
        <td scope="row">${data.id}</td>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.amount}</td>
				<td>${data.type == 8 ? 'Sales' : 'Return'}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status == 10 ? 'Pending' : 'Paid'}</td>
        <td>${data.order_date.split('T')[0]}</td>
        ${
          data.is_delete == 0
            ? `<td><a class="btn btn-outline-primary" onclick="viewOrder(${data.id})">View</a></td><td>
      <a class='btn btn-success' id=${data.storage_id}edit${data.id} onclick="updateOrder('edit',event,'order')">EDIT</a></td><td>
       <a class="btn btn-danger" id=${data.storage_id}delete${data.id} onclick="updateOrder('delete',event,'order')">DELETE</a></td>
        `
            : `<td colspan="3"><p  class="deleted">DELETED</p></td>`
        }</tr>`;
      count++;
    });
    document.getElementById('tbody').innerHTML = body;
  }
}
async function paymentFilter() {
  let paymentStatus = document.getElementById('payment').value;
  console.log(paymentStatus == '');
  if (paymentStatus == '') {
    // let arr = dataArray
    paggination(null, dataArray);
  } else {
    filteredResult = dataArray.filter((ele) => {
      return ele.payment_status == paymentStatus;
    });
    console.log(filteredResult);
    paggination(null, filteredResult);
  }
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
        ele.firstname.toLowerCase().includes(searchbar) ||
        ele.lastname.toLowerCase().includes(searchbar) ||
        ele.shipping_address.toLowerCase().includes(searchbar) ||
        // ele.amount.toString().includes(searchbar) ||
        ele.order_date.includes(searchbar)
      );
    });
    console.log(filteredResult);
    paggination(null, filteredResult);
  }
}

function onclickOrderby(col, type) {
  fetching(`&orderby=${col.toLowerCase()}&order=${type}`);
}

async function onLoad() {
  if (document.getElementById('storageCombo') != null) {
    const storageOptionos = await generateWarehousesDropDown(1, true);
    document.getElementById('storageCombo').innerHTML = storageOptionos;
  }
  await generateCombo('paymentStatus', 'payment');
  await fetching();
}
onLoad();

async function generateCombo(name, id) {
  const response = await fetch(`/api/combos/${name}`);
  const result = await response.json();
  let str = `<option value="">Select</option>`;

  result.forEach((data) => {
    str += `<option value="${data.opt_id}">${data.value}</option>`;
  });
  document.getElementById(`${id}`).innerHTML = str;
}
