import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner, getOwnerCars } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import { validateCar } from "../validations/carValidation.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);

ownerRouter.post(
  "/add-car",
  upload.single("image"),
  validateCar, 
  protect,
  addCar,
);

ownerRouter.get("/cars", protect, getOwnerCars);

export default ownerRouter;
