async function fetching() {
  let orderby = document.getElementById("orderby").value;
  let order = document.getElementById("order").value;
  let url = `/salesorder?order=${order}`;

  if (orderby != "") {
    url = url + `&orderby=${orderby}`;
  }
  console.log(url);
  const response = await fetch(url);
  const result = await response.json();
  grid(result);
}
fetching();

function grid(result) {
  let head = `<tr>`;
  result.header.forEach((ele) => {
    head += `<th scope="col">${ele}</th>`;
  });
  head += `<th scope="col">Time</th>`;
  head += `</tr>`;
  document.getElementById("thead").innerHTML = head;

  let body = ``;
  result.rows.forEach((data) => {
    console.log(data);
    body += `<tr>
        <th scope="row">${data.id}</th>
        <td>${data.customer_id}</td>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.amount}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status}</td>
        <td>${data.created_at.split(" ")[0]}</td>
        <td>${data.created_at.split(" ")[1]}</td>
        <td><a class='btn btn-success' onclick="updateOrder('edit',event)">EDIT</a></td>
        <td><a class="btn btn-danger" onclick="updateOrder('delete',event)">DELETE</a></td>
        </tr>`;
  });
  document.getElementById("tbody").innerHTML = body;
}

async function productGrid() {
  let orderId = document.getElementById("productOrderId").value;
  let response = await fetch(`/getProductGrid?orderId=${orderId}`);
  let result = await response.json();

  let head = `<tr>`;
  result.header.forEach((ele) => {
    if (ele != "id") {
      head += `<th scope="col">${ele}</th>`;
    }
  });

  head += `</tr>`;
  document.getElementById("productListHead").innerHTML = head;

  let body = ``;
  result.rows.forEach((data) => {
    console.log(data);

    body += `<tr>
    <td hidden>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.Category}</td>
    <td>${data.quantity}</td>
    <td><a class='btn btn-success'>EDIT</a></td>
    <td><a class="btn btn-danger">DELETE</a></td>
    </tr>`;
  });

  document.getElementById("productListBody").innerHTML = body;
}
