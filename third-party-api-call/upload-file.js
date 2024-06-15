const CustomError = require("../utils/custom-error")
const {cloudinary} = require("../configs/cloudinary-config");
const util = require("util");

const upload = util.promisify(cloudinary.uploader.upload);

async function uploadImageAndSendImageUrl({file}) {
    try {
        const uploadedFile = await upload(file.filepath, {
            public_id: file.originalFilename,
          });
          console.log("file upload success");

          return uploadedFile.secure_url;
    } catch (error) {
        throw new CustomError(503,error.message);    
    }
}

module.exports = Object.freeze({uploadImageAndSendImageUrl})