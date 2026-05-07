import UserModel from "../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.json({
        message: "Email Already Exists",
      });
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    const user = await UserModel.create({
      userName,
      email,
      password: hashPassword,
    });
    return res.json({
      message: "Done",
      user,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid Account",
      });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: "Login Success",
      token,
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
