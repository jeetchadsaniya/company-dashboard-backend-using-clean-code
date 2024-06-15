
module.exports = function makeGetUserUseCase({
  userDb,
  permissionDb,
  rollDb,
  CustomError,
}) {
  return async function getUserUseCase({
    userId,
    companyId,
  } = {}) {
    try {
        //check user already exist or not
      let user = await userDb.getUserByUserIdAndCompanyId({ userId, companyId });

      if (!user) {
        throw new CustomError(404, "user dont exists in your Company");
      }
      const roll = await rollDb.getRollByRollId({rollId : user["rollId"]});
      const channelPermission = await permissionDb.getPermissionByPermissionId({
        permissionId: roll["channelPermissionId"],
      });
      const productPermission = await permissionDb.getPermissionByPermissionId({
        permissionId: roll["productPermissionId"],
      });
      const userPermission = await permissionDb.getPermissionByPermissionId({
        permissionId: roll["userPermissionId"],
      });

      const rollObj = {
        channelPermission : {
            read : channelPermission["read"],
            write : channelPermission["write"],
            delete : channelPermission["delete"],
        },
        userPermission : {
            read : userPermission["read"],
            write : userPermission["write"],
            delete : userPermission["delete"],
        },
        productPermission : {
            read : productPermission["read"],
            write : productPermission["write"],
            delete : productPermission["delete"],
        },
      };

      user["roll"] = rollObj;
      return user;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
