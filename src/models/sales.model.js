const connection = require('./db/connection');

const createSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );

  return insertId;
};

const createSalesProducts = async ({ saleId, productId, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

const getAllSalesProducts = async () => {
  const [result] = await connection.execute(
    `SELECT 
      SP.sale_id AS saleId, 
      S.date AS date, 
      SP.product_id AS productId, 
      SP.quantity AS quantity 
    FROM StoreManager.sales AS S 
      INNER JOIN 
        StoreManager.sales_products AS SP ON S.id = SP.sale_id 
      ORDER BY saleId ASC, productId ASC`,
  );

  return result;
};

const getSaleProductById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      S.date AS date,
      SP.product_id AS productId,
      SP.quantity AS quantity
    FROM
      StoreManager.sales AS S
      INNER JOIN
      StoreManager.sales_products AS SP ON S.id = SP.sale_id
    WHERE SP.sale_id = (?)
    ORDER BY productId ASC`,
    [id],
  );

  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [id],
  );
};

const updateSales = async (id, { productId, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products 
      SET quantity = (?) 
     WHERE sale_id = (?) AND product_id = (?)`,
    [quantity, id, productId],
  );

  return { productId, quantity };
};

module.exports = {
  createSales,
  createSalesProducts,
  getAllSalesProducts,
  getSaleProductById,
  deleteSale,
  updateSales,
};