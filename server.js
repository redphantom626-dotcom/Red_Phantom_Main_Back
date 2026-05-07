import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/DB/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/users/user.router.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Red Phantom Backend Running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});
