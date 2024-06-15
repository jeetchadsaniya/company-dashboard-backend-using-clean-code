const { makeUser, makeRollObj } = require("../../entities");

module.exports = function makeCreateUserUseCase({
  userDb,
  permissionDb,
  rollDb,
  jwt,
  sendSetPasswordMailForNewUser,
  CustomError,
}) {
  return async function createUserUseCase({
    userName,
    email,
    companyId,
    userId,
    roll,
  } = {}) {
    try {
      //validation
      makeUser({
        companyId,
        userName,
        email,
        password: null,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet: null,
      });
      makeRollObj(roll);

      //check user already exist or not
      let user = await userDb.getUserByEmailAndCompanyId({ email, companyId });

      if (user) {
        throw new CustomError(400, "User already exists in your Company");
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

      const insertedUserId = await userDb.insertUser({
        companyId,
        userName,
        email,
        password: null,
        status: "invited",
        isPasswordSet: 0,
        createdBy: userId,
        rollId,
      });
      const accessToken = jwt.sign({userId : insertedUserId},process.env.JWT_SECRET,{ expiresIn: "24h" });
      
      await sendSetPasswordMailForNewUser({accessToken,email});
      return {accessToken};
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
