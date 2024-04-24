const { updateProduct } = require('../../service/products/product');
const logger = require('../../logs');

const patterns = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
};

const productValid = {
  productname: {
    required: true,
  },
  skuid: {
    required: true,
    pattern: patterns.numberOnly,
  },
  category: {
    required: true,
    pattern: patterns.numberOnly,
  },
  cost: {
    required: true,
    pattern: patterns.numberOnly,
  },
  stock: {
    required: true,
    pattern: patterns.numberOnly,
  },
  description: {
    required: false,
    pattern: patterns.textOnly,
  },
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

const productInfoPost = async (req, res) => {
  try {
    let storage = req.user.storageId || '1';
    await updateProduct({ ...req.body, id: req.query.id }, storage);
    res.status(200).json({ message: 'Product Updated...' });
  } catch (err) {
    res.status(500).json({ message: 'Product not Updated...' });
    logger.logError(err);
  }
};

function productInfoValid(valid) {
  return ({ body }, res, next) => {
    for (let arr of Object.entries(valid)) {
      const field = arr[0];
      const obj = arr[1];
      if (obj.required) {
        if (!body[field]) {
          res.status(400).json({
            status: 'error',
            message: `${field} is required!`,
            field,
          });
          return false;
        }
      }

      // Note pattern is optional property
      if (obj?.pattern && body[field]) {
        if (!body[field].match(obj?.pattern)) {
          res.status(404).json({
            status: 'error',
            message: `Invalid input for ${field}!`,
            field,
          });
          return false;
        }
      }
    }
    next();
  };
}

module.exports = {
  productInfo,
  productInfoPost,
  productInfoValid,
  productValid,
};
