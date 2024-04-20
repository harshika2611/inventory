pageSize = 4;

async function dataTableGrid(records) {
  document.querySelector('form').innerHTML = '';
  for (const obj of records) {
    generateAddProductRows(
      await generateProductsDropDown(obj.categoryId, obj.productId),
      await generateDropDown('productCategory', obj.categoryId),
      obj.purchaseProductId,
      { ...obj }
    );
  }
}
