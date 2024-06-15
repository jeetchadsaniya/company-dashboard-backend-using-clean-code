
module.exports = function makeGetAllUserUseCase({
  userDb,
  CustomError,
}) {
  return async function getAllUserUseCase({
    companyId,
    queryStringObj
  } = {}) {
    try {
        const users = await userDb.getAllUserByCompanyId({companyId,queryStringObj});
        return users;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
