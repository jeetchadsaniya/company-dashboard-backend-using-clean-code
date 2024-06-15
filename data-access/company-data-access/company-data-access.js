module.exports = function makeCompanyDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function getCompanyByEmail({ email } = {}) {
    try {
      const getCompanyQuery = `SELECT * FROM companies WHERE email = ?`;
      const result = await query(getCompanyQuery, [email]);
      if (result.length > 0) {
        return result[0];
      }
      return false;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getCompanyByCompanyId({ companyId } = {}) {
    try {
      const getCompanyQuery = `SELECT * FROM companies WHERE companyId = ?`;
      const result = await query(getCompanyQuery, [companyId]);
      if (result.length > 0) {
        return result[0];
      }
      return false;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function insertCompany({ companyName, email } = {}) {
    try {
      const insertCompanyQuery = `INSERT INTO companies (companyName, email) VALUES (?, ?);`;
      const result = await query(insertCompanyQuery, [companyName, email]);
      return result.insertId;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    getCompanyByEmail,
    getCompanyByCompanyId,
    insertCompany,
  });
};
