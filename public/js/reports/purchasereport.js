const fetchData = async () => {
  let productHeader = document.getElementById("productHeader");
  let productData = document.getElementById("productData");
  let api = await fetch("api/purchasereport/allproduct");
};
