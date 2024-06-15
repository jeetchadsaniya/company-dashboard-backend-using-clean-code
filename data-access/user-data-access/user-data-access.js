module.exports = function makeUserDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function getCompanysIdByEmail({ email } = {}) {
    try {
      const getCompanysIdQuery = `SELECT companyId FROM users WHERE email = ?`;
      const result = await query(getCompanysIdQuery, [email]);
      if (!result.length) {
        return false;
      }
      return result;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getUserByEmailAndCompanyId({ email, companyId } = {}) {
    try {
      const getUserQuery = `SELECT * FROM users WHERE email = ? AND companyId = ?`;
      const result = await query(getUserQuery, [email, companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getUserByUserId({ userId } = {}) {
    try {
      const getUserQuery = `SELECT * FROM users WHERE userId = ?`;
      const result = await query(getUserQuery, [userId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getUserByUserIdAndCompanyId({ userId,companyId } = {}) {
    try {
      const getUserQuery = `SELECT * FROM users WHERE userId = ? AND companyId = ?`;
      const result = await query(getUserQuery, [userId,companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getAllUserByCompanyId({ queryStringObj ,companyId } = {}) {
    try {
      let getUsersQuery;
      if (queryStringObj.count && queryStringObj.orderByColumn) {
        getUsersQuery = `SELECT * FROM users WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy} LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else if (queryStringObj.orderByColumn) {
        getUsersQuery = `SELECT * FROM users WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy}`;
      } else if (queryStringObj.count) {
        getUsersQuery = `SELECT * FROM users WHERE companyId = ?  LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else {
        //for authorization pass in headers
        getUsersQuery = `SELECT * FROM users WHERE companyId = ?`;
      }
      const result = await query(getUsersQuery, [companyId]);
      return result;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function updateStatus({ status, userId } = {}) {
    try {
      const updateStatusQuery = `UPDATE users SET status = ? WHERE userId = ?;`;
      const result = await query(updateStatusQuery, [status, userId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function deleteUser({ companyId, userId } = {}) {
    try {
      const deleteUserQuery = `DELETE FROM users WHERE userId = ? AND companyId = ?`;
      const result = await query(deleteUserQuery, [userId,companyId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function updateUserNameAndRollIdByUserId({  userName,rollId,userId } = {}) {
    try {
      const updateUserQuery = `UPDATE users SET userName = ?, rollId =? WHERE userId = ?;`;
      const result = await query(updateUserQuery, [userName, rollId,userId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function insertUser({
    companyId,
    userName,
    email,
    password,
    status,
    isPasswordSet,
    createdBy,
    rollId,
  } = {}) {
    try {
      const insertUserQuery = `INSERT INTO users (companyId, userName , email, password, status, isPasswordSet, createdBy,rollId) VALUES (?, ?, ? , ?, ?, ? , ?,?)`;
      const result = await query(insertUserQuery, [
        companyId,
        userName,
        email,
        password,
        status,
        isPasswordSet,
        createdBy,
        rollId,
      ]);

      return result.insertId;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function updateCreatedBy({ createdBy, userId } = {}) {
    try {
      const updateCreatedByFiledQuery = `UPDATE users SET createdBy = ? WHERE userId = ?;`;
      const result = await query(updateCreatedByFiledQuery, [
        createdBy,
        userId,
      ]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function setPassword({ password, isPasswordSet, userId } = {}) {
    try {
      const updatePasswordQuery = `UPDATE users SET password = ?, isPasswordSet = ? WHERE userId = ?;`;
      const result = await query(updatePasswordQuery, [
        password,
        isPasswordSet,
        userId,
      ]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function changeIsPasswordSet({ isPasswordSet, userId } = {}) {
    try {
      const updatePasswordQuery = `UPDATE users SET isPasswordSet = ? WHERE userId = ?;`;
      const result = await query(updatePasswordQuery, [isPasswordSet, userId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    getCompanysIdByEmail,
    getUserByEmailAndCompanyId,
    getUserByUserIdAndCompanyId,
    getAllUserByCompanyId,
    getUserByUserId,
    updateUserNameAndRollIdByUserId,
    deleteUser,
    updateStatus,
    insertUser,
    updateCreatedBy,
    setPassword,
    changeIsPasswordSet,
  });
};
