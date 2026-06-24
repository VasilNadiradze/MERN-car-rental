import express from "express";
import { protect } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getUserData,
  getCars,
} from "../controllers/userController.js";
import {
  validateRegister,
  validateLogin,
} from "../validations/userValidation.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegister, registerUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.get("/me", protect, getUserData);
userRouter.get("/cars", getCars);

export default userRouter;
