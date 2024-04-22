pageSize = 4;

const modal = new bootstrap.Modal('#deleteModal');

const mapping = {
  'Supplier Name': 'fname',
  'Company Name': 'company',
  Phone: 'phone',
  GST: 'gst',
  Amount: 'amount',
  Date: 'date',
};

async function initial() {
  let head = `<tr>`;
  for (let key of [
    'No.',
    'Supplier Name',
    'Company Name',
    'Phone',
    'GST',
    'Amount',
    'Date',
  ]) {
    head += `<th scope="col" class="align-middle">
      <span class="d-inline-flex flex-row align-items-center">
        ${key}
        ${
          mapping[key]
            ? `
        <span class="d-inline-flex flex-column align-items-center ms-2">
          <span style="cursor: pointer" onclick="paggination('api/purchases?key=${mapping[key]}&value=asc')">^</span>
          <span style="rotate: 180deg; cursor: pointer" onclick="paggination('api/purchases?key=${mapping[key]}&value=desc')">^</span>
        </span>
        `
            : ``
        }
      </span>
    </th>`;
  }

  head += `<th scope="col" colspan="3">Action</th>`;

  head += `</tr>`;

  document.getElementById('thead').innerHTML = head;

  const paymentOptions = await generateDropDown('paymentStatus', 10);

  document.getElementById('floatingPaymentStatus').innerHTML = paymentOptions;
}

async function dataTableGrid(records) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  records.forEach((obj, index) => {
    let tr = document.createElement('tr');

    let noTd = document.createElement('td');
    noTd.innerText = index + 1;

    let suppTd = document.createElement('td');
    suppTd.innerText = obj.fname;

    let comTd = document.createElement('td');
    comTd.innerText = obj.company;

    let phTd = document.createElement('td');
    phTd.innerText = obj.phone;

    let gstTd = document.createElement('td');
    gstTd.innerText = obj.gst;

    let amountTd = document.createElement('td');
    amountTd.innerText = obj.amount;

    let dateTd = document.createElement('td');
    dateTd.innerText = obj.date;

    let viewTd = document.createElement('td');
    viewTd.innerHTML = `<button class="btn btn-outline-dark">View</button>`;

    let editTd = document.createElement('td');
    editTd.innerHTML = `<button class="btn btn-secondary" onclick="window.location.href = '/purchaseOrder?orderId=${obj?.id}'">Edit</button>`;

    let deleteTd = document.createElement('td');
    deleteTd.innerHTML = `<button class="btn btn-danger" onclick="deletePurchaseOrder(${obj.id})">Delete</button>`;

    [
      noTd,
      suppTd,
      comTd,
      phTd,
      gstTd,
      amountTd,
      dateTd,
      viewTd,
      editTd,
      deleteTd,
    ].forEach((e) => tr.appendChild(e));

    tbody.append(tr);
  });
}

function triggerPaymentStatus(e) {
  const query = new URLSearchParams(location?.search);
  query.set('payment', e.target.value);
  paggination(`api/purchases?${query.toString()}`);
}

function searchAnything(e) {
  let filteredOrders = dataArray.filter((obj) =>
    Object.values({
      fname: obj.fname,
      company: obj.company,
      phone: obj.phone,
      gst: obj.gst,
    }).some((v) =>
      new RegExp(`.*${e.target.value.toLowerCase().trim()}.*`).test(
        v.toLowerCase()
      )
    )
  );

  paggination(null, filteredOrders);
}

async function deletePurchaseOrder(orderId) {
  modal.show();

  // Setting onclick so that we don't need to explicity remove click listener once called.
  document.getElementById('confirm').onclick = async () => {
    if (orderId) {
      const orderDetails = await getOrderDetails(orderId);
      orderDetails?.products.forEach(({ purchaseProductId }) => {
        fetch(`api/purchase/product/${purchaseProductId}`, {
          method: 'DELETE',
        });
      });

      await fetch(`api/purchase/${orderId}`, {
        method: 'DELETE',
      });

      modal.hide();
      paggination('api/purchases');
    }
  };
}

async function getOrderDetails(id) {
  if (id) {
    const response = await fetch(`api/order/${id}`);
    return await response.json();
  }
}

function modelHide() {
  modal.hide();
}

initial();
paggination('api/purchases');
