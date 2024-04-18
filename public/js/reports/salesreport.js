const showProduct = () => {
	// console.log("hii");
	window.location = `/salesReportallProducts`;
};
const getData = async (
	api,
	tableHeader,
	tableData,
	dataLength,
	countSalles
) => {
	let rows = await api.json();
	let header = Object.keys(rows[0]);
	if (countSalles == true) {
		let totalSalles = 0;
		let totalProcuctcost = 0;
		rows = changesInApi(rows);
		rows.map((e) => {
			totalSalles += e.Seling_Price * e.Product_Sales;
			totalProcuctcost += e.Product_Cost * e.Product_Sales;
		});
		document.getElementById('totalSalles').innerText = new Intl.NumberFormat(
			'en-IN'
		).format(totalSalles);
		document.getElementById('totalProfit').innerText = new Intl.NumberFormat(
			'en-IN'
		).format(totalSalles - totalProcuctcost);
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
	let api = await fetch('api/salesreport/allproduct');
	let api2 = await fetch('api/salesreport/allcategory');
	getData(api, productHeader, productData, 5, true);
	getData(api2, categoryHeader, categoryData, 3, false);
};

const changesInApi = (array) => {
	array.map((e) => {
		if (e.Product_Cost != null) {
			let cost = String(e.Product_Cost);
			cost = Number(cost.substring(0, 5));
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
