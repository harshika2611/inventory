const showProduct = () => {
	// console.log("hii");
	window.location = `/sallesReportallProducts`;
};
const getData = async (
	api,
	tableHeader,
	tableData,
	dataLength,
	countSalles
) => {
	let { rows, header } = await api.json();
	if (countSalles == true) {
		let totalSalles = 0;
		let totalProcuctcost = 0;
		rows.map((e) => {
			totalSalles += e.Selling_Price * e.Product_Salles;
			totalProcuctcost += e.Product_Cost * e.Product_Salles;
		});

		document.getElementById('totalSalles').innerText = totalSalles;
		document.getElementById('totalProfit').innerText =
			totalSalles - totalProcuctcost;
	}
	let count = 0;
	let letestdata = [];
	for (let e of rows) {
		// console.log(e);
		if (count == dataLength) {
			break;
		}
		letestdata.push(e);
		count++;
	}
	tableHeader.innerHTML = header
		.map((e) => `<th>${e.replace('_', ' ')}</th>`)
		.join('');
	tableData.innerHTML = letestdata
		.map(
			(e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
		)
		.join('');
};
const fetchData = async () => {
	let productHeader = document.getElementById('productHeader');
	let productData = document.getElementById('productData');
	let categoryHeader = document.getElementById('categorytHeader');
	let categoryData = document.getElementById('categoryData');
	let api = await fetch('api/sallesreport/allproduct');
	let api2 = await fetch('api/sallesreport/allcategory');
	getData(api, productHeader, productData, 5, true);
	getData(api2, categoryHeader, categoryData, 3, false);
};
