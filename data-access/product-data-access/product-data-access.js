module.exports = function makeProductDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function insertProduct({ price, imageUrl, companyId } = {}) {
    try {
      const insertProductQuery = `INSERT INTO products (price,companyId, imageUrl) VALUES (?, ?, ?);`;
      const result = await query(insertProductQuery, [
        price,
        companyId,
        imageUrl,
      ]);
      return result.insertId;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function updateProduct({ price, imageUrl, productId } = {}) {
    try {
      const updateProductQuery = `UPDATE products SET  imageUrl = ?, price = ?  WHERE productId = ?;`;
      const result = await query(updateProductQuery, [
        imageUrl,
        price,
        productId,
      ]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function deleteProduct({ companyId, productId } = {}) {
    try {
      const deleteProductQuery = `DELETE FROM products WHERE productId = ? AND companyId = ?`;
      const result = await query(deleteProductQuery, [productId, companyId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getProductByProductIdAndCompanyId({
    productId,
    companyId,
  } = {}) {
    try {
      const getProductQuery = `SELECT * FROM products WHERE productId = ? AND companyId = ?`;
      const result = await query(getProductQuery, [productId, companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getAllProductByCompanyId({ companyId, queryStringObj } = {}) {
    try {
      let getProductsQuery;
      if (queryStringObj.count && queryStringObj.orderByColumn) {
        getProductsQuery = `SELECT * FROM products WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy} LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else if (queryStringObj.orderByColumn) {
        getProductsQuery = `SELECT * FROM products WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy}`;
      } else if (queryStringObj.count) {
        getProductsQuery = `SELECT * FROM products WHERE companyId = ?  LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else {
        //for authorization pass in headers
        getProductsQuery = `SELECT * FROM products WHERE companyId = ?`;
      }
      const result = await query(getProductsQuery, [companyId]);

      return result;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    insertProduct,
    updateProduct,
    deleteProduct,
    getProductByProductIdAndCompanyId,
    getAllProductByCompanyId
  });
};
