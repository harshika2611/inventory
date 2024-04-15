const gridComponent = document.getElementById("gridComponent");
const insertForm = document.getElementById("insertFormDiv");
const productForm = document.getElementById('productFormDiv');
const displayForm = () => {
  gridComponent.style.display = "none";
  insertForm.style.display = "block";
  // console.log(123);
};

const displayGrid = () => {
  gridComponent.style.display = "block";
  insertForm.style.display = "none";
};

const displayProductForm = () =>{
  productForm.style.display = "block";
  insertForm.style.display = "none";
}