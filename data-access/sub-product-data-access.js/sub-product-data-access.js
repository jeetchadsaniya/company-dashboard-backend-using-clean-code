module.exports = function makeSubProductDb({ connection, util, CustomError }) {
    const query = util.promisify(connection.query).bind(connection);

    async function getSubProductByProductNameAndCompanyId({ productName, companyId } = {}) {
      try {
        const getSubProductQuery = `SELECT * FROM subProducts WHERE productName = ? AND companyId = ?`;
        const result = await query(getSubProductQuery, [
          productName,
          companyId,
        ]);
        if (!result.length) {
          return false;
        }
        return result[0];
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function getSubProductByChannelIdAndCompanyId({ channelId, companyId } = {}) {
      try {
        const getSubProductQuery = `SELECT * FROM subProducts WHERE channelId = ? AND companyId = ?`;
        const result = await query(getSubProductQuery, [
          channelId,
          companyId,
        ]);
        if (!result.length) {
          return false;
        }
        return result[0];
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function getSubProductByChannelIdAndProductId({ channelId, productId } = {}) {
      try {
        const getSubProductQuery = `SELECT * FROM subProducts WHERE channelId = ? AND productId = ?`;
        const result = await query(getSubProductQuery, [
          channelId,
          productId,
        ]);
        if (!result.length) {
          return false;
        }
        return result[0];
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function getSubProductBySubProductIdAndCompanyId({ subProductId, companyId } = {}) {
      try {
        const getSubProductQuery = `SELECT * FROM subProducts WHERE subProductId = ? AND companyId = ?`;
        const result = await query(getSubProductQuery, [
          subProductId,
          companyId,
        ]);
        if (!result.length) {
          return false;
        }
        return result[0];
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function insertSubProduct({ productName, description,productId, channelId,companyId } = {}) {
      try {
        const insertSubProductQuery = `INSERT INTO subProducts (productName, description,productId ,channelId, companyId) VALUES (?, ?, ?, ?, ?);`;
        const result = await query(insertSubProductQuery, [
          productName,
          description,
          productId,
          channelId,
          companyId,
        ]);
        return result.insertId;
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function updateSubProduct({ productName, description,subProductId } = {}) {
      try {
        const updateSubProductQuery = `UPDATE subProducts SET productName = ?, description = ? WHERE subProductId = ?;`;
        const result = await query(updateSubProductQuery, [
          productName,
          description,
          subProductId,
        ]);
        return true;
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }

    async function deleteSubProduct({ companyId,subProductId } = {}) {
      try {
        const deleteSubProductQuery = `DELETE FROM subProducts WHERE subProductId = ? AND companyId = ?`;
        const result = await query(deleteSubProductQuery, [
          subProductId,
          companyId,
        ]);
        return true;
      } catch (error) {
        throw new CustomError(500, error.message);
      }
    }
    
  
    return Object.freeze({
      getSubProductByProductNameAndCompanyId,
      getSubProductByChannelIdAndCompanyId,
      getSubProductBySubProductIdAndCompanyId,
      getSubProductByChannelIdAndProductId,
      insertSubProduct,
      updateSubProduct,
      deleteSubProduct
      });
    };
    