const {
  getProduct,
  checkProductSevice,
  insertProductService,
  insertProductDetailService,
} = require('../../service/products/product');
const logger = require('../../logs');

const productListing = (req, res) => {
  res.render('product/product', { data: req.user });
};

const manageProduct = async (req, res) => {
  try {
    console.log(req.user, 'aaa');
    const result0 = await checkProductSevice(req.body);
    console.log(result0, 'aa');
    if (result0.length) {
      return res.status(409).send('product already exist');
    } else {
      try {
        const result = await insertProductService(req.body);
        console.log(result, 'id');
        const result1 = await insertProductDetailService(
          result,
          req.body,
          req.user
        );
        return res.status(200).send('product successfully added');
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

module.exports = {
  productListing,
  getApiproduct,
  manageProduct,
};
