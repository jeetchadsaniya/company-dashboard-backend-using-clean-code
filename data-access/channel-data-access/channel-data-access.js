module.exports = function makeChannelDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function insertChannel({ channelName, channelCode, companyId } = {}) {
    try {
      const insertChannelQuery = `INSERT INTO channels (channelName, channelCode, companyId) VALUES (?, ?, ?)`;
      const result = await query(insertChannelQuery, [
        channelName,
        channelCode,
        companyId,
      ]);
      return result.insertId;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getChannelByChannelIdAndCompanyId({
    channelId,
    companyId,
  } = {}) {
    try {
      const getChannelQuery = `SELECT * FROM channels WHERE channelId = ? AND companyId = ?`;
      const result = await query(getChannelQuery, [channelId, companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getChannelByChannelCodeAndCompanyId({
    channelCode,
    companyId,
  } = {}) {
    try {
      const getChannelQuery = `SELECT * FROM channels WHERE channelCode = ? AND companyId = ?`;
      const result = await query(getChannelQuery, [channelCode, companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getChannelByChannelNameAndCompanyId({
    channelName,
    companyId,
  } = {}) {
    try {
      const getChannelQuery = `SELECT * FROM channels WHERE channelName = ? AND companyId = ?`;
      const result = await query(getChannelQuery, [channelName, companyId]);
      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function updateChannel({ channelName, channelCode, channelId } = {}) {
    try {
      const updateChannelQuery = `UPDATE channels SET channelName = ?, channelCode = ? WHERE channelId = ?;`;
      const result = await query(updateChannelQuery, [
        channelName,
        channelCode,
        channelId,
      ]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function deleteChannel({ channelId,companyId } = {}) {
    try {
      const deleteChannelQuery = `DELETE FROM channels WHERE channelId = ? AND companyId = ?`;
      const result = await query(deleteChannelQuery, [channelId,companyId]);
      return true;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getAllChannelByCompanyId({ companyId, queryStringObj } = {}) {
    try {
      let getChannelsQuery;
      if (queryStringObj.count && queryStringObj.orderByColumn) {
        getChannelsQuery = `SELECT * FROM channels WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy} LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else if (queryStringObj.orderByColumn) {
        getChannelsQuery = `SELECT * FROM channels WHERE companyId = ? ORDER BY ${queryStringObj.orderByColumn} ${queryStringObj.orderBy}`;
      } else if (queryStringObj.count) {
        getChannelsQuery = `SELECT * FROM channels WHERE companyId = ?  LIMIT ${queryStringObj.start},${queryStringObj.count}`;
      } else {
        //for authorization pass in headers
        getChannelsQuery = `SELECT * FROM channels WHERE companyId = ?`;
      }
      const result = await query(getChannelsQuery, [companyId]);

      return result;
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    insertChannel,
    getChannelByChannelIdAndCompanyId,
    getChannelByChannelCodeAndCompanyId,
    getChannelByChannelNameAndCompanyId,
    updateChannel,
    deleteChannel,
    getAllChannelByCompanyId
  });
};
