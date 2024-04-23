

const orderHistory = (req, res) => {
  res.render('salesModule/sales');
};
const newOrder = (req, res) => {
  res.render('salesModule/form');
};

const invoicePdf = (req, res) => {
  res.render('salesModule/invoice');
};

module.exports = { orderHistory, newOrder, invoicePdf };
