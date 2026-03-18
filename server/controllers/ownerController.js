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
