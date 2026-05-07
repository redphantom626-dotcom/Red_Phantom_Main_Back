import jwt from "jsonwebtoken";
import UserModel from "../DB/models/User.model.js";

export const authentication = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.json({
          message: "Token Required",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.json({
          message: "User Not Found",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.json({
        message: error.message,
      });
    }
  };
};
