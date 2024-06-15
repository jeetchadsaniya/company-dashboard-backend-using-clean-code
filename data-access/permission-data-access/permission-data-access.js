module.exports = function makePermissionDb({ connection, util, CustomError }) {
  const query = util.promisify(connection.query).bind(connection);

  async function getPermissionByPermissions({
    read,
    write,
    delete: deletePermission,
  } = {}) {
    try {
      const getpermissionQuery = `SELECT * FROM permission WHERE \`read\` = ? AND \`write\` = ? AND \`delete\`  = ?`;
      const result = await query(getpermissionQuery, [
        read,
        write,
        deletePermission,
      ]);

      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  async function getPermissionByPermissionId({ permissionId } = {}) {
    try {
      const getpermissionQuery = `SELECT * FROM permission WHERE permissionId  = ?`;
      const result = await query(getpermissionQuery, [permissionId]);

      if (!result.length) {
        return false;
      }
      return result[0];
    } catch (error) {
      throw new CustomError(500, error.message);
    }
  }

  return Object.freeze({
    getPermissionByPermissions,
    getPermissionByPermissionId,
  });
};
