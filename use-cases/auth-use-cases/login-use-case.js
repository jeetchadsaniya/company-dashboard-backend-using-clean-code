const { makeUser } = require("../../entities");

module.exports = function makeLoginUseCase({ companyDb, userDb, bcrypt,jwt,CustomError }) {
  return async function loginUseCase({ companyId, email, password } = {}) {
    try {
      //validation
      makeUser({
        companyId,
        userName: null,
        email,
        password,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet : null
      });

      const company = await companyDb.getCompanyByCompanyId({ companyId });

      if (!company) {
        throw new CustomError(404, "Company Dont exists");
      }

      const user = await userDb.getUserByEmailAndCompanyId({
        companyId,
        email,
      });

      if (!user) {
        throw new CustomError(404, "User Dont exists");
      }

      //if user dont set password using mail or give format password request and try to login
      if (!user["password"] || user["isPasswordSet"] === 0 ) {
        throw new CustomError(400,"plz set password first than login");
      }

      const isPasswordValid = await bcrypt.compare(
        password,user["password"]
      );

      if (!isPasswordValid) {
        throw new CustomError(400, "enter valid password")
      }
      //update status
      await userDb.updateStatus({status : "active",userId : user["userId"]});

      const accessToken = jwt.sign({userId : user["userId"],companyId : user["companyId"], rollId : user["rollId"]},process.env.JWT_SECRET,{ expiresIn: "3d" });

      return {accessToken};
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
