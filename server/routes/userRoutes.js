import express from "express";
import { protect } from "../middleware/auth.js";
import { registerUser, loginUser, getUserData } from "../controllers/userController.js";
import { validateRegister, validateLogin } from "../validations/userValidation.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegister, registerUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.get("/me", protect, getUserData);

export default userRouter;