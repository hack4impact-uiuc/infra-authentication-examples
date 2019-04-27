const mongoose = require("mongoose");
const uri = "mongodb://product:infra28@ds159840.mlab.com:59840/auth-infra-api";
const db = mongoose.connect(uri, { useNewUrlParser: true });

module.exports = {
  db,
  mongoose
};
