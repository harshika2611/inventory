async function fetching() {
  let orderby = document.getElementById('orderby').value
  let order = document.getElementById('order').value
  let url = `/salesorder?order=${order}`
  
  if(orderby != ''){
    url = url+`&orderby=${orderby}`;
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
        <td>${data.name}</td>
        <td>${data.amount}</td>
        <td>${data.shipping_address}</td>
        <td>${data.payment_status}</td>
        <td>${data.created_at.split(' ')[0]}</td>
        <td>${data.created_at.split(' ')[1]}</td>
        </tr>`;
  });
  document.getElementById("tbody").innerHTML = body;
}