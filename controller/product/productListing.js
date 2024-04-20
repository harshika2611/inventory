const { getProduct } = require('../../service/products/product');
let storage = 1;
const productListing = (req, res) => {
  res.render('product/listing');
};
const productInfo = async (req, res) => {
  try {
    if (req.query.id) {
      const [rows] = await getProduct(req.query.id, storage);
      console.log(rows);
      res.render('product/productInfo');
    } else {
      res.render('components/404');
    }
  } catch (err) {
    res.render('components/404');
  }
};
module.exports = { productListing, productInfo };
