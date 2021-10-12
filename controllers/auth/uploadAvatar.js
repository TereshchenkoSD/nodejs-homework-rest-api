const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models ");

const avatarsDir = path.join(__dirname, "../", "public/avatars");

const uploadAvatar = async (req, res) => {
  const { originalname, path: tempName } = req.file;
};
