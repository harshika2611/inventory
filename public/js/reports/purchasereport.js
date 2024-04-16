let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');
// let firstpage = document.getElementById('firstpage');
// let prepage = document.getElementById('prepage');
// let page = document.getElementById('currentpage');
// let nextpage = document.getElementById('nextpage');
// let lastpage = document.getElementById('lastpage');
// let page_no = page.innerText;

const searchdata = async (input) => {
	let api = `api/purchasereport/allproduct?product=${input}`;
	let apiData = await fetchapi(api);
	showData(apiData);
};

const orderbyField = async (field, order) => {
	// let api = `api/purchasereport/allproduct?fieldName=${field}&order=${order}`;
	// let apiData = await fetchapi(api);
	// showData(apiData);
};

const fetchData = async () => {
	// let url = 'api/purchasereport/allproduct';
	// let data = await fetchapi(url);
	// if (page == undefined) {
	// 	pagination(data);
	// } else {
	// 	console.log(page);
	// 	pagination(data, page);
	// }
	let api = 'api/purchasereport/allproduct';
	let apiData = await fetchapi(api);
	showData(apiData);
};

const fetchapi = async (url) => {
	let api = await fetch(url);
	let { rows, header } = await api.json();
	return { rows, header };
};
const showData = (apiData) => {
	let data = [];
	apiData.rows.map((e) => {
		if (e.Total_Products == null) {
			e.Total_Products = 0;
		}
		if (e.Product_Cost == null) {
			e.Product_Cost = 0;
		}
		data.push(e);
	});
	if (data.length == 0) {
		productHeader.innerHTML = `<h1  class='text-center'>Enter valid Product name </h1>`;
		productData.innerHTML = `<h6 class='text-center'>Error</h6>`;
	} else {
		productHeader.innerHTML = apiData.header
			.map((e) => `<th>${e.replace('_', ' ')} </th>`)
			.join('');
		productData.innerHTML = data
			.map(
				(e) => `<tr>
      ${apiData.header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
			)
			.join('');
	}
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
// const show_data = (data) => {
// 	// console.log(data);
// 	productHeader.innerHTML = data.header
// 		.map((e) => `<th>${e.replace('_', ' ')}</th>`)
// 		.join('');
// 	productData.innerHTML = data.rows
// 		.map(
// 			(e) => `<tr>
// 	      ${data.header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
// 		)
// 		.join('');
// };

// const pagination = async (data, page, dataLimit) => {
// 	// console.log(data);
// 	page_no = page || 1;
// 	let view_per_page = dataLimit || 15;
// 	let page_first_ele = (page_no - 1) * view_per_page;
// 	let page_last_ele = page_no * view_per_page;

// 	data.rows = data.rows.slice(page_first_ele, page_last_ele);
// 	show_data(data, page_first_ele, page_last_ele);
// };

// const rightpage = () => {
// 	console.log(page_no);
// 	page_no = Number(page_no) + 1;
// 	if (page_no == 8) {
// 		nextpage.classList.add('d-none');
// 		prepage.innerText = page_no - 1;
// 		page.innerText = page_no;
// 		return 0;
// 	} else {
// 		firstpage.classList.remove('d-none');
// 		lastpage.classList.remove('d-none');
// 		nextpage.classList.remove('d-none');
// 		prepage.innerText = page_no - 1;
// 		page.innerText = page_no;
// 		nextpage.innerText = page_no + 1;
// 		fetchData(page_no);
// 	}
// };

// const leftpage = () => {
// 	console.log(page_no);
// 	page_no = Number(page_no) - 1;
// 	if (page_no == 1) {
// 		prepage.classList.add('d-none');
// 		page.innerText = page_no;
// 		nextpage.innerText = page_no + 1;
// 		return 0;
// 	} else {
// 		firstpage.classList.remove('d-none');
// 		lastpage.classList.remove('d-none');
// 		prepage.classList.remove('d-none');
// 		prepage.innerText = page_no - 1;
// 		page.innerText = page_no;
// 		nextpage.innerText = page_no + 1;
// 		fetchData(page_no);
// 	}
// };
