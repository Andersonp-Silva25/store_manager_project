const statusCode = require('../utils/statusCode');

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = statusCode;

const {
  productIsRequired,
  quantityIsRequired,
  amoutGreatThanZero,
} = require('../utils/salesMessages');

const validateSales = (req, res, next) => {
  const sales = req.body;
  const hasProductId = sales.some(({ productId }) => productId === undefined);
  const hasQuantity = sales.some(({ quantity }) => quantity === undefined);
  const checkQuantity = sales.some(({ quantity }) => quantity <= 0);

  if (hasProductId) return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: productIsRequired });
  if (hasQuantity) return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: quantityIsRequired });
  if (checkQuantity) {
    return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ message: amoutGreatThanZero });
  }

  return next();
};

module.exports = {
  validateSales,
};