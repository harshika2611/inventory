async function insertOrder(){
    const response = await fetch(`/insertSalesOrder`, {
      method: 'POST',
      body: new URLSearchParams(new FormData(document.getElementById('insertSalesData'))),
    });
    const result = await response.json();
    console.log(result);
}

async function generateCombo(){
  const response = await fetch('/getCustomers');
  const result = await response.json();

  let str= '';
  result.rows.forEach(data => {
    str += `<option value="${data.customer_id}">${data.name}</option>`
  });
  document.getElementById('customer').innerHTML = str;
}
generateCombo();