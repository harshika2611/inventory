let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');
let input = window.location.pathname.split('/')[2];

const fetchData = async () => {
	let api = await fetch(`/api/orderreport/allproduct/${input}`);
	let rows = await api.json();
	dataTableGrid(rows);
};

const dataTableGrid = (pagginationArray, startIndex) => {
	if (pagginationArray.length == 0) {
		productHeader.innerHTML = `<h1  class='text-center'>NO Data </h1>`;
		productData.innerHTML = `<h6 class='text-center'>found...</h6>`;
	} else {
		let header = Object.keys(pagginationArray[0]);
		console.log(pagginationArray);
		let data = changesInApi(pagginationArray);
		productHeader.innerHTML = header
			.map((e) => `<th>${e.replace('_', ' ')} </th>`)
			.join('');
		productData.innerHTML = data
			.map(
				(e) => `<tr>
      ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
			)
			.join('');
	}
};
const changesInApi = (array) => {
	array.map((e) => {
		if (e.Payment_Status == 0) {
			e.Payment_Status = 'Pending';
		} else if (e.Payment_Status == 1) {
			e.Payment_Status = 'Pead';
		}
	});
	return array;
};
