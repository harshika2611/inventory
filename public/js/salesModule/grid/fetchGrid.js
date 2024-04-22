async function fetching() {
  let orderby = document.getElementById('orderby').value;
  let order = document.getElementById('order').value;
  url = `/salesorder?order=${order}`;
  if (orderby != '') {
    url = url + `&orderby=${orderby}`;
  }
  paggination(url);

  // let response = await fetch(url);
  // let result = await response.json();
  // grid(result);
}
fetching();
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
  head += `<th scope="col">Edit</th>
  <th scope="col">Delete</th>`;
  head += `</tr>`;
  document.getElementById('thead').innerHTML = head;
 
  let body = ``;
  result.forEach((data) => {
    body += `<tr>
        <th scope="row">${count}</th>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.amount}</td>
				<td>${data.OrderType == 8 ? 'Sales' : 'Return'}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status == 10 ? 'Pending' : 'Paid'}</td>
        <td>${data.date.split(' ')[0]}</td>
        <td><a class='btn btn-success' id=edit${
          data.ID
        } onclick="updateOrder('edit',event,'order')">EDIT</a></td>
        <td><a class="btn btn-danger" id=delete${
          data.ID
        } onclick="updateOrder('delete',event,'order')">DELETE</a></td>
        </tr>`;
    count++;
  });
  document.getElementById('tbody').innerHTML = body;
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
