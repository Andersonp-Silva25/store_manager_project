const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = require('./statusCode');

const salesMessages = {
  productIsRequired: { type: HTTP_STATUS_BAD_REQUEST, message: '"productId" is required' },
  quantityIsRequired: { type: HTTP_STATUS_BAD_REQUEST, message: '"quantity" is required' },
  amoutGreatThanZero: {
    type: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    message: '"quantity" must be greater than or equal to 1',
  },
  productNotFound: { type: HTTP_STATUS_NOT_FOUND, message: 'Product not found' },
};

module.exports = salesMessages;