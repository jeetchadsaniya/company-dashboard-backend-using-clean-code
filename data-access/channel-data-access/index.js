const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makeChannelDb = require("./channel-data-access");

const channelDb = makeChannelDb({ connection, util,CustomError });

module.exports = channelDb;
