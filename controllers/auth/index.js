const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const uploadAvatar = require("./uploadAvatar");
const verify = require("./verify");
const reverify = require("./reverify");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  uploadAvatar,
  verify,
  reverify,
};
