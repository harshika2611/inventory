let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');

const searchdata = async (input) => {
	console.log(input);
	input = input.trim();
	setTimeout(() => {
		paggination(`api/purchasereport/allproduct?product=${input}`);
	}, 5000);
};

const fetchData = async () => {
	paggination('api/purchasereport/allproduct');
};

const dataTableGrid = (pagginationArray, startIndex) => {
	if (pagginationArray.length == 0) {
		productHeader.innerHTML = `<h1  class='text-center'>Enter valid Product name </h1>`;
		productData.innerHTML = `<h6 class='text-center'>Error</h6>`;
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
		if (e.Product_BuyPrice != null) {
			let cost = String(e.Product_BuyPrice);
			cost = Number(cost.substring(0, 5));
			e.Product_BuyPrice = cost;
		}
		if (e.Total_Products == null) {
			e.Total_Products = 0;
		}
		if (e.Product_BuyPrice == null) {
			e.Product_BuyPrice = 0;
		}
	});
	return array;
};

const orderbyField = async (field, order) => {
	// let api = `api/purchasereport/allproduct?fieldName=${field}&order=${order}`;
	// let apiData = await fetchapi(api);
	// showData(apiData);
};

{
	/* <span>
	<span
	class="btn btn-dark btn-sm float-end mx-1"
	onclick="orderbyField('${e}','asc')"
	>
	&#8593;
	</span>
	<span
	class="btn btn-dark btn-sm float-end mx-1"
	onclick="orderbyField('${e}','desc')"
	>
	&#8595;
	</span>
	</span> */
}
