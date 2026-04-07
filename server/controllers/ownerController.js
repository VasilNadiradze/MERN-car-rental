import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import { toFile } from "@imagekit/nodejs";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });

    return res
      .status(200)
      .json({ success: true, message: "Now you can upload cars" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    const carData = req.carData; // უკვე ვალიდირებული
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadedImage = await imagekit.files.upload({
      file: await toFile(imageFile.buffer, imageFile.originalname),
      fileName: imageFile.originalname,
    });

    const car = await Car.create({
      ...carData,
      owner: _id,
      image: uploadedImage.url,
    });

    return res.status(201).json({
      success: true,
      car,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });

    return res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() != _id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;

    await car.save();

    return res
      .status(200)
      .json({ success: true, message: "Availability toggled" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params; // აქედან წამოიღე

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    car.owner = null;
    car.isAvailable = false;

    await car.save();

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const { _id } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadedImage = await imagekit.files.upload({
      file: await toFile(imageFile.buffer, imageFile.originalname),
      fileName: imageFile.originalname,
    });

    await User.findByIdAndUpdate(_id, { image: uploadedImage.url });

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
