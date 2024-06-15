const { makeUser, makeRollObj } = require("../../entities");

module.exports = function makeUpdateUserUseCase({
  userDb,
  permissionDb,
  rollDb,
  CustomError,
}) {
  return async function updateUserUseCase({
    userName,
    companyId,
    userId,
    roll,
  } = {}) {
    try {
      //validation
      makeUser({
        companyId,
        userName,
        email : null,
        password: null,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet: null,
      });
      makeRollObj(roll);

      //check user already exist or not
      let user = await userDb.getUserByUserIdAndCompanyId({ userId, companyId });

      if (!user) {
        throw new CustomError(404, "user dont exists in your Company");
      }

      if (user["userId"] === user["createdBy"]) {
        throw new CustomError(400, "dont allow to edit admin user");
      }

      let readPermission = roll["channelPermission"]["read"];
      let writePermission = roll["channelPermission"]["write"];
      let deletePermission = roll["channelPermission"]["delete"];

      const channelPermission = await permissionDb.getPermissionByPermissions({
        read: readPermission,
        write: writePermission,
        delete: deletePermission,
      });

      readPermission = roll["userPermission"]["read"];
      writePermission = roll["userPermission"]["write"];
      deletePermission = roll["userPermission"]["delete"];

      const userPermission = await permissionDb.getPermissionByPermissions({
        read: readPermission,
        write: writePermission,
        delete: deletePermission,
      });

      readPermission = roll["productPermission"]["read"];
      writePermission = roll["productPermission"]["write"];
      deletePermission = roll["productPermission"]["delete"];

      const productPermission = await permissionDb.getPermissionByPermissions({
        read: readPermission,
        write: writePermission,
        delete: deletePermission,
      });

      if (!channelPermission || !userPermission || !productPermission) {
        throw new CustomError(400, "enter right permission");
      }

      const rollId = await rollDb.getRollIdByPermissions({
        channelPermissionId: channelPermission["permissionId"],
        productPermissionId: productPermission["permissionId"],
        userPermissionId: userPermission["permissionId"],
      });

      await userDb.updateUserNameAndRollIdByUserId({userId,rollId,userName});
      user = await userDb.getUserByUserIdAndCompanyId({userId,companyId});
      return user;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
