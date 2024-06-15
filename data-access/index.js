const util = require('util');
const { connection } = require("../configs/db-config");

const connectDB = util.promisify(connection.connect).bind(connection);

const channelDb = require("./channel-data-access")
const companyDb = require("./company-data-access")
const permissionDb = require("./permission-data-access")
const rollDb = require("./roll-data-access")
const userDb = require("./user-data-access")
const productDb = require("./product-data-access")
const subProductDb = require("./sub-product-data-access.js")

async function connectToDb() {
  try {
    await connectDB();
    console.log("Connected to MySQL database");
  } catch (err) {
    console.log("Error connecting to MySQL database:", err.message);
  }
}


module.exports = Object.freeze({ connectToDb,channelDb,companyDb, permissionDb,rollDb,userDb,productDb,subProductDb });
