let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');
const fetchData = async () => {
  paggination('api/orderreport/allorder');
};

const dataTableGrid = (pagginationArray, startIndex) => {
  if (pagginationArray.length == 0) {
    productHeader.innerHTML = `<h1  class='text-center'>Enter valid Product name </h1>`;
    productData.innerHTML = `<h6 class='text-center'>Error</h6>`;
  } else {
    let header = Object.keys(pagginationArray[0]);
    productHeader.innerHTML = header
      .map((e) => `<th>${e.replace('_', ' ')} </th>`)
      .join('');
    productData.innerHTML = pagginationArray
      .map(
        (e) => `<tr onclick="productlist('${e.Order_Id}')">
      ${header.map((h) => `<td>${e[h] ? e[h] : '-'}</td>`).join('')}</tr>`
      )
      .join('');
  }
};

const productlist = (id) => {
  window.location = `/orderProduct/${id}`;
};

const searchdata = () => {
  let fromDate = document.getElementById('fromDate').value;
  let toDate = document.getElementById('toDate').value;

  // let date = new Date();
  // let currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let currentDate = new Date().toISOString().slice(0, 10);
  if (fromDate.length == 0) {
    fromDate = currentDate;
  }
  if (toDate.length == 0) {
    toDate = currentDate;
  }
  console.log(fromDate);
  console.log(toDate);
  paggination(
    `/api/orderreport/allorder?fromDate=${fromDate}&&toDate=${toDate}`
  );
};
