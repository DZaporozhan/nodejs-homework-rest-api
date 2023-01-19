const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (_id, tempUpload, originalname) => {
  const avatarNewName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarNewName);

  const img = await Jimp.read(tempUpload);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", avatarNewName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  return avatarURL;
};

module.exports = updateAvatar;
