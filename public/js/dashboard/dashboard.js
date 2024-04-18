let totalStock = document.getElementById('totalStock');
let outStock = document.getElementById('outStock');
let totalOrder = document.getElementById('totalOrder');
let orderCost = document.getElementById('orderCost');
let lowQuantityStockTableHead = document.getElementById(
	'lowQuantityStockTableHead'
);
let lowQuantityStockTableBody = document.getElementById(
	'lowQuantityStockTableBody'
);
let orderTableHead = document.getElementById('orderTableHead');
let orderTableBody = document.getElementById('orderTableBody');
let productData = [];
let orderData = [];

const fetchData = async () => {
	let api = await fetch(`/api/productStock`);
	let api2 = await fetch(`/api/orderreport/allorder`);
	let apiData = await api.json();
	let apiData2 = await api2.json();
	productData = [...apiData];
	orderData = [...apiData2];
	// console.log(data);
	showData();
};

function sideClose() {
	document.getElementById('sidebar').style.display = 'none';
}

function show() {
	document.getElementById('sidebar').style.display = 'block';
}

const changeproductQuantity = () => {
	lowStockMark = document.getElementById('lowProduct').value;
	showData(lowStockMark);
};

const showData = async (lowvalue) => {
	let lowStockMark = lowvalue || document.getElementById('lowProduct').value;
	let lowStock = [];
	let header = Object.keys(productData[0]);
	productData.map((e) => {
		if (e.stock < lowStockMark) {
			lowStock.push(e);
		}
	});

	totalStock.innerText = productData.length;
	outStock.innerText = lowStock.length;

	lowStock = lowStock.slice(0, 5);

	lowQuantityStockTableHead.innerHTML = header
		.map((e) => `<th class="text-center">${e.replace('_', ' ')}</th>`)
		.join('');

	lowQuantityStockTableBody.innerHTML = lowStock
		.map(
			(e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
		)
		.join('');
	let header2 = ['Order_Id', 'Order_Name', 'Order_Amount', 'order_date'];

	let orderSum = 0;
	orderData.forEach((el) => (orderSum += el.Order_Amount));

	totalOrder.innerText = orderData.length;
	orderCost.innerText = orderSum;
	orderData = orderData.slice(0, 5);

	orderTableHead.innerHTML = header2
		.map((e) => `<th class="text-center">${e.replace('_', ' ')}</th>`)
		.join('');
	console.log(orderData);
	orderTableBody.innerHTML = orderData
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
fetchData();
