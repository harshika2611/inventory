let id = new URLSearchParams(window.location.search).get('id');

const fetchApi = async (api) => {
  showLoader();
  let response = await fetch(api);
  let data = await response.json();
  hideLoader();
  return data;
};

const loadData = async () => {
  const productDetails = (await fetchApi(`api/productDetails/${id}`))[0] || {};

  const productBody = document.getElementById('productBody');
  productBody.innerHTML = JSON.stringify(productDetails);
};
