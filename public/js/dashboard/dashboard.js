let productData = [];
let orderData = [];

const onloadData = async () => {
  let date = new Date();
  let dayData = await fetchapi(
    `/api/orderreport/allorder?day=${date.getDate()}`
  );
  let monthData = await fetchapi(
    `/api/orderreport/allorder?month=${date.getMonth() + 1}`
  );
  let daySales = 0;
  let monthSales = 0;
  dayData.forEach((e) => (daySales += e.Order_Amount));
  monthData.forEach((e) => (monthSales += e.Order_Amount));
  let options = {
    series: [daySales, monthSales],
    colors: ['#003C43', '#453F78'],
    labels: ['Day Sales', 'Month Sales'],
    dataLabels: {
      dropShadow: {
        blur: 3,
        opacity: 1,
      },
    },
    chart: {
      type: 'donut',
    },

    dataLabels: {
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              label: 'Total',
              showAlways: true,
              show: true,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return monthSales;
                }, 0);
              },
            },
          },
        },
      },
    },
    chart: {
      type: 'donut',
      height: 350,
      width: 350,
    },
  };

  let chart = new ApexCharts(document.getElementById('daySales'), options);
  chart.render();

  let products = await fetchapi(`/api/productStock`);
  let orders = await fetchapi(`/api/orderreport/allorder`);
  productData = [...products];
  orderData = [...orders];
  showQuantityData();
  showData();
};
const fetchapi = async (apiurl) => {
  let api = await fetch(apiurl);
  let apiData = await api.json();
  return apiData;
};

const changeproductQuantity = () => {
  lowStockMark = document.getElementById('lowProduct').value;
  showQuantityData(lowStockMark);
};

const showQuantityData = async (lowvalue) => {
  let lowStockMark = lowvalue || document.getElementById('lowProduct').value;
  let lowStock = [];
  let header = Object.keys(productData[0]);
  productData.map((e) => {
    if (e.stock < lowStockMark) {
      lowStock.push(e);
    }
  });

  document.getElementById('totalStock').innerText = productData.length;
  document.getElementById('outStock').innerText = lowStock.length;

  // var options = {
  // 	chart: {
  // 		height: 350,
  // 		width: 350,
  // 		type: 'donut',
  // 	},
  // 	series: [productData.length, lowStock.length],
  // 	chartOptions: {
  // 		labels: ['Products', 'Low Products'],
  // 	},
  // };

  // var chart = new ApexCharts(document.getElementById('outStock'), options);
  // chart.render();

  lowStock = lowStock.slice(0, 5);

  document.getElementById('lowQuantityStockTableHead').innerHTML = header
    .map((e) => `<th class="text-center">${e.replace('_', ' ')}</th>`)
    .join('');

  document.getElementById('lowQuantityStockTableBody').innerHTML = lowStock
    .map(
      (e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
    )
    .join('');
};

const showData = () => {
  let header2 = [
    'Order_Id',
    'Order_Name',
    'Order_Amount',
    'order_date',
    'created_Time',
  ];

  let orderSum = 0;
  orderData.forEach((el) => (orderSum += el.Order_Amount));

  document.getElementById('totalOrder').innerText = orderData.length;
  document.getElementById('orderCost').innerText = orderSum;
  orderData = orderData.slice(0, 5);

  document.getElementById('orderTableHead').innerHTML = header2
    .map((e) => `<th class="text-center">${e.replace('_', ' ')}</th>`)
    .join('');
  // console.log(orderData);
  document.getElementById('orderTableBody').innerHTML = orderData
    .map(
      (e) => `<tr onclick="productlist('${e.Order_Id}')">
	      ${header2.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
    )
    .join('');
};
const productlist = (id) => {
  window.location = `/orderProduct/${id}`;
  console.log(product);
};
onloadData();
