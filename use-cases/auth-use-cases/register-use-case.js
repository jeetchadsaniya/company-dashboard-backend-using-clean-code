const { makeCompany, makeUser } = require("../../entities");

module.exports = function makeRegisterUseCase({
  userDb,
  companyDb,
  channelDb,
  permissionDb,
  rollDb,
  bcrypt,
  CustomError,
}) {
  return async function registerUseCase({
    companyName,
    email,
    userName,
    password,
  } = {}) {
    try {
      //validation
      makeCompany({ companyName, email });
      makeUser({
        companyId: null,
        userName,
        email,
        password,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet: null,
      });

      //check company already exist or not
      const company = await companyDb.getCompanyByEmail({ email });
      if (company) {
        throw new CustomError(400, "Company already exists");
      }

      const insertedCompanyId = await companyDb.insertCompany({
        companyName,
        email,
      });

      const permission = await permissionDb.getPermissionByPermissions({
        read: 1,
        write: 1,
        delete: 1,
      });

      const permissionId = permission["permissionId"];

      const rollId = await rollDb.getRollIdByPermissions({
        channelPermissionId: permissionId,
        productPermissionId: permissionId,
        userPermissionId: permissionId,
      });

      const hashPassword = await bcrypt.hash(password, 10);

      const insertedUserId = await userDb.insertUser({
        companyId: insertedCompanyId,
        userName,
        email,
        password: hashPassword,
        status: "active",
        isPasswordSet: 1,
        createdBy: null,
        rollId: rollId,
      });

      await userDb.updateCreatedBy({
        createdBy: insertedUserId,
        userId: insertedUserId,
      });

      //create en channel
      await channelDb.insertChannel({
        channelName: "english",
        channelCode: "en",
        companyId: insertedCompanyId,
      });

      return { userId: insertedUserId, compantId: insertedCompanyId };
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
