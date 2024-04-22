const { getProduct } = require('../../service/products/product');
const logger = require('../../logs');

const productListing = (req, res) => {
  res.render('product/listing');
};
const productInfo = async (req, res) => {
  try {
    if (req.query.id) {
      const [rows] = await getProduct(req.query.id, storage);
      res.render('product/productInfo');
    } else {
      res.render('components/404');
    }
  } catch (err) {
    res.render('components/404');
  }
};
const getApiproduct = async (req, res) => {
  try {
    let id = req.query.id || '';
    let storage = req.user.storageId;
    const [rows] = await getProduct(id, storage);
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
module.exports = { productListing, productInfo, getApiproduct };
