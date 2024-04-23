let productHeader = document.getElementById('productHeader');
let productData = document.getElementById('productData');


const fetchData = async () => {
  paggination(`api/products`)
};

const dataTableGrid = (pagginationArray, startIndex) => {
  console.log(pagginationArray);
	if (pagginationArray.length == 0) {
		productHeader.innerHTML = `<h1  class='text-center'>NO Data </h1>`;
		productData.innerHTML = `<h6 class='text-center'>found...</h6>`;
	} else {
		let header = Object.keys(pagginationArray[0]);
		productHeader.innerHTML = header
			.map((e) => `<th>${e.replace('_', ' ')} </th>`)
			.join('');
		productData.innerHTML = header
			.map(
				(e) => `<tr>
      ${header.map((h) => `<td>${e[h]}</td>`).join('')}</tr>`
			)
			.join('');
	}
};