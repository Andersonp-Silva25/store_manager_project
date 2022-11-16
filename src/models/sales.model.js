const connection = require('./db/connection');

const createSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );

  return insertId;
};

const createSalesProducts = async ({ saleId, productId, quantity }) => {
  // const saleId = await createSales();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

module.exports = {
  createSales,
  createSalesProducts,
};