async function fetching() {
  let orderby = document.getElementById('orderby').value;
  let order = document.getElementById('order').value;
  let storage = document.getElementById('storageCombo').value;
  url = `/salesorder?order=${order}&storage=${storage}`;
  if (orderby != '') {
    url = url + `&orderby=${orderby}`;
  }
  paggination(url);

  // let response = await fetch(url);
  // let result = await response.json();
  // grid(result);
}

let count = 1;
function dataTableGrid(result) {
  allRecords = result;
  console.log(result);
  let head = `<tr>`;
  for (let key in result[0]) {
    if (key == 'ID') {
      key = '#';
    }
    if (key != 'created_at' && key != 'customer_id') {
      head += `<th scope="col">${key}</th>`;
    }
  }
  head += `<th scope="col" style="text-align: center;">Actions</th>`;
  head += `</tr>`;
  document.getElementById('thead').innerHTML = head;

  let body = ``;
  result.forEach((data) => {
    body += `<tr>
        <th scope="row">${data.ID}</th>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.amount}</td>
				<td>${data.OrderType == 8 ? 'Sales' : 'Return'}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status == 10 ? 'Pending' : 'Paid'}</td>
        <td>${data.date.split('T')[0]}</td>
        
        <td><a class="btn btn-outline-primary" onclick="viewOrder(${
          data.ID
        })">View</a>

      <a class='btn btn-success' id=edit${
        data.ID
      } onclick="updateOrder('edit',event,'order')">EDIT</a>
       <a class="btn btn-danger" id=delete${
         data.ID
       } onclick="updateOrder('delete',event,'order')">DELETE</a></td>
        </tr>`;
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
        ele.firstname.toLowerCase().includes(searchbar) ||
        ele.lastname.toLowerCase().includes(searchbar) ||
        ele.shipping_address.toLowerCase().includes(searchbar) ||
        // ele.amount.toString().includes(searchbar) ||
        ele.date.includes(searchbar)
      );
    });
    console.log(filteredResult);
    paggination(null, filteredResult);
  }
}

async function onLoad() {
  const storageOptionos = await generateWarehousesDropDown(1);
  document.getElementById('storageCombo').innerHTML = storageOptionos;
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
