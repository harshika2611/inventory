function updateOrderForm(result, id) {

  let customer = document.getElementById('customer');
  let shippingAddress = document.getElementById('shippingAddress');
  let paymentStatus = document.getElementsByName('paymentStatus');
  let date = document.getElementById('date');
  let orderid = document.getElementById('orderid');
  orderid.value = id;

  if (document.getElementById('storageCombo') != null) {
  
    let storageCombo = document.getElementById('storageCombo')
    for (op of storageCombo) {
      console.log(123);
     console.log(op);
      console.log(op.value == result[0].storage_id);
      if (op.value == result[0].storage_id) {
        op.setAttribute('selected', true);
      }
    }
  }
  for (op of customer) {
    if (op.value == result[0].customer_id) {
      op.setAttribute('selected', true);
    }
  }
  shippingAddress.innerHTML = result[0].ShippingAddress;
  for (op of paymentStatus) {
    if (op.value == result[0].PaymentStatus) {
      op.setAttribute('selected', true);
    }
  }
  date.value = result[0].Date.split('T')[0];
}
// we will use grid fetch function for edit and delete
