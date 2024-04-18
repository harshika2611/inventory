let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');
const getData = async (api, tableHeader, tableData) => {
	let { rows, header } = await api.json();
	tableHeader.innerHTML = header
		.map((e) => `<th>${e.replace('_', ' ')}</th>`)
		.join('');
	tableData.innerHTML = rows
		.map(
			(e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
		)
		.join('');
};
const fetchData = async () => {
	paggination('api/salesreport/allproduct');
	// let api = await fetch('api/sallesreport/allproduct');
	// getData(api, productHeader, productData);
};
const dataTableGrid = (pagginationArray, startIndex) => {
	let header = Object.keys(pagginationArray[0]);
	pagginationArray = changesInApi(pagginationArray);
	// console.log(Object.keys(header));
	productHeader.innerHTML = header
		.map((e) => `<th>${e.replace('_', ' ')}</th>`)
		.join('');
	productData.innerHTML = pagginationArray
		.map(
			(e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
		)
		.join('');
};

const changesInApi = (array) => {
	array.map((e) => {
		if (e.Product_Cost != null) {
			let cost = String(e.Product_Cost);
			cost = cost.substring(0, 5);
			e.Product_Cost = cost;
		}
		if (e.Product_Cost == null) {
			e.Product_Cost = 0;
		}
		if (e.Product_Salles == null) {
			e.Product_Salles = 0;
		}
	});
	return array;
};
