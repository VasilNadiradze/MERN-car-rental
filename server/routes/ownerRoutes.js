import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateProfileImage,
} from "../controllers/ownerController.js";
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
ownerRouter.post("/toggle-car-availability", protect, toggleCarAvailability);
ownerRouter.delete("/delete-car/:carId", protect, deleteCar);

ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-profile-image', upload.single("image"), protect, updateProfileImage)

export default ownerRouter;
