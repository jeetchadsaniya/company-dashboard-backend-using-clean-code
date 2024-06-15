module.exports = function makeRollDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function getRollIdByPermissions({
    channelPermissionId,
    productPermissionId,
    userPermissionId,
  } = {}) {
    try {
      const getrollQuery = `SELECT * FROM rolls WHERE channelPermissionId = ? AND productPermissionId = ? AND userPermissionId  = ?`;
      const result = await query(getrollQuery, [
        channelPermissionId,
        productPermissionId,
        userPermissionId,
      ]);
      if (!result.length) {
        return false;
      }
      return result[0]["rollId"];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getRollByRollId({ rollId } = {}) {
    try {
      const getrollQuery = `SELECT * FROM rolls WHERE rollId = ?`;
      const result = await query(getrollQuery, [rollId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    getRollIdByPermissions,
    getRollByRollId,
  });
};
