const { mongoose, db } = require("./../utils/index");

const schema = mongoose.Schema({
  userId: "string",
  username: "string"
});

const User = mongoose.model("User", schema);

module.exports = User;
