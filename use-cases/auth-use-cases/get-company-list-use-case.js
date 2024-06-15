const { makeCompany } = require("../../entities");

module.exports = function makeGetCompanyListUseCase({ userDb, companyDb, CustomError}) {
    return async function getCompanyListUseCase({ email } = {}) {
      try {
        //validation
        makeCompany({companyName : null,email});

        const companysId = await userDb.getCompanysIdByEmail({email});

        if (!companysId) {
          throw new CustomError(404,"Company Not exists");
        }

        const allCompany = [];

        for (let i = 0; i < companysId.length; i++) {
          const company = await companyDb.getCompanyByCompanyId({companyId : companysId[i]["companyId"]});
          allCompany.push(company);
        }
        return allCompany;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };