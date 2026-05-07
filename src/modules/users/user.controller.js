import UserModel from "../../DB/models/User.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.userName) {
      updateData.userName = req.body.userName;
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `Red-Phantom/users/${req.user._id}`,
      });
      updateData.profileImage = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const user = await UserModel.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });

    return res.json({
      message: "Done",
      user: {
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage?.secure_url,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
