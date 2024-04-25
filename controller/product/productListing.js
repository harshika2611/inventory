const {
  deleteMainProductService,
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
    const result0 = await checkProductSevice(req.body);

    if (result0.length) {
      return res.status(409).send('product already exist');
    } else {
      try {
        const result = await insertProductService(req.body);

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

    const [rows] = await getProduct(id, order, field, storage);
    return res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};

const deleteMainProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, 'get');
    const result = await deleteMainProductService(id);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Product is deleted' });
    } else {
      return res.status(404).json({ message: 'error' });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

module.exports = {
  deleteMainProduct,
  productListing,
  getApiproduct,
  manageProduct,
};
