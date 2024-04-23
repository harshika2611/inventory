const {
  getProduct,
  checkProductSevice,
  insertProductService,
} = require('../../service/products/product');
const logger = require('../../logs');
const { insertProduct } = require('../../service/salesModule/salesService');

const productListing = (req, res) => {
  res.render('product/product', { data: req.user });
};

const manageProduct = async (req, res) => {
  try {
    const result0 = await checkProductSevice(req.body);
    if (result0.length) {
      return res.status(409).send('product already exist');
    } else {
      try {
        const result = await insertProductService(req.body);
        return res.status(200).send('product added');
      } catch (error) {
        logger.logError(error);
        return res.status(500).json({ message: 'can`t fetch user controller' });
      }
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const productInfo = async (req, res) => {
  try {
    if (req.query.id) {
      res.render('product/productInfo', { data: req.user });
    } else {
      res.render('components/errorPage');
    }
  } catch (err) {
    res.render('components/errorPage');
  }
};
const getApiproduct = async (req, res) => {
  try {
    let id = req.query.id || '';
    let order = req.query.order || 'asc';
    let field = req.query.field || 'id';
    let storage = req.user.storageId || 1;
    console.log(storage);
    const [rows] = await getProduct(id, order, field, storage);
    return res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
module.exports = { manageProduct, productListing, productInfo, getApiproduct };
