const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public");

const uploadAvatar = async (req, res) => {
  const { originalname, path: tempDir } = req.file;
  const { _id } = req.user;

  try {
    const [extension] = originalname.split(".").reverse();
    const newAvatarName = `avatar-image_${_id}.${extension}`;
    const resultDir = path.join(avatarsDir, "avatars", newAvatarName);

    const initialAvatar = await Jimp.read(tempDir);
    const resizedAvatar = await initialAvatar.resize(250, 250);

    await resizedAvatar.write(resultDir);

    fs.unlink(tempDir);
    const avatar = path.join("avatars", newAvatarName);
    const userWithAvatar = await User.findByIdAndUpdate(
      _id,
      { avatarURL: avatar },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        userWithAvatar,
      },
    });
  } catch (error) {
    await fs.unlink(tempDir);
    throw error;
  }
};

module.exports = uploadAvatar;
