const getData = async (api, tableHeader, tableData) => {
  let { rows, header } = await api.json();
  tableHeader.innerHTML = header
    .map((e) => `<th>${e.replace("_", " ")}</th>`)
    .join("");
  tableData.innerHTML = rows
    .map(
      (e) => `<tr>
        ${header.map((h) => `<td>${e[h]}</td>`).join("")}</tr>`
    )
    .join("");
};
const fetchData = async () => {
  let productHeader = document.getElementById("productHeader");
  let productData = document.getElementById("productData");
  let api = await fetch("api/sallesreport/allproduct");
  getData(api, productHeader, productData);
};
