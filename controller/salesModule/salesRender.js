const orderHistory = (req, res) => {
  res.render('salesModule/sales', { data: req.user });
};
const newOrder = (req, res) => {
  res.render('salesModule/form', { data: req.user });
};

const invoicePdf = (req, res) => {
  res.render('salesModule/invoice', { data: req.user });
};

module.exports = { orderHistory, newOrder, invoicePdf };
