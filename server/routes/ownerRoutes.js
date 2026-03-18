import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import { validateCar } from "../middleware/validateCar.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);

ownerRouter.post(
  "/add-car",
  upload.single("image"),
  validateCar, // 🔥 აქ ხდება validation
  protect,
  addCar,
);

export default ownerRouter;
