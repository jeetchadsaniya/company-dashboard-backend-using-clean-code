const { makeUser } = require("../../entities");

module.exports = function makeChangePasswordUseCase({ userDb, jwt,bcrypt,CustomError}) {
    return async function changePasswordUseCase({ accessToken,newPassword }= {}) {
      try {
        //validation
      makeUser({
        companyId : null,
        userName: null,
        email : null,
        password : newPassword,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet : null
      });

      let decode;
      try {
        decode = jwt.verify(accessToken, process.env.JWT_SECRET);
      } catch (error) {
        throw new CustomError(401,"enter valid jwt token")
      }

      const userId = decode.userId;

      const user = await userDb.getUserByUserId({
        userId
      });

      if (!user) {
        throw new CustomError(404, "User Dont exists");
      }
      if (user["isPasswordSet"]) {
        throw new CustomError(400,"You Already Set Password");
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      await userDb.setPassword({password : hashPassword,userId : user["userId"] , isPasswordSet : 1});

      user["password"] = hashPassword;
      user["isPasswordSet"] = 1;
      return user;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };