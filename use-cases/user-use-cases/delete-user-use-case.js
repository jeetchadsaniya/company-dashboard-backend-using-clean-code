module.exports = function makeDeleteUserUseCase({ userDb, CustomError }) {
  return async function deleteUserUseCase({ userId, companyId } = {}) {
    try {
      //check user already exist or not
      let user = await userDb.getUserByUserIdAndCompanyId({
        userId,
        companyId,
      });

      if (!user) {
        throw new CustomError(404, "user dont exists in your Company");
      }
      if (user["userId"] === user["createdBy"]) {
        throw new CustomError(400, "dont allow to delete admin user");
      }
      await userDb.deleteUser({ userId, companyId });
      return user;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
