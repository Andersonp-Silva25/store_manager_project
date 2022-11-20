const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const getProductByID = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)',
    [id],
  );
    
  return result;
};

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
  );
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );
};

const getProductByName = async (name) => {
  const searchName = `SELECT * FROM StoreManager.products WHERE name LIKE "%${name}%"`;
  const [result] = await connection.execute(searchName);
    
  return result;
};

module.exports = {
  getAll,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};