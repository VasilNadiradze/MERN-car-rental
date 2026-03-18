import { carSchema } from "../controllers/validations/carValidation";

export const validateCar = (req, res, next) => {
  if (!req.body.carData) {
    return res.status(400).json({
      success: false,
      message: "carData is required",
    });
  }

  let carData;

  // JSON parse
  try {
    carData = JSON.parse(req.body.carData);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }

  // Joi validation
  const { error, value } = carSchema.validate(carData, {
    abortEarly: false, // ყველა error ერთდროულად
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }

  // 🔥 ძალიან კარგი პრაქტიკა
  req.carData = value;

  next();
};
