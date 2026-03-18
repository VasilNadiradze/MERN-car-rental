import Joi from "joi";

const carSchema = Joi.object({
  brand: Joi.string().trim().required(),
  model: Joi.string().trim().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  category: Joi.string().trim().required(),
  seating_capacity: Joi.number().integer().min(1).required(),
  fuel_type: Joi.string().valid("Petrol", "Diesel", "Electric", "Hybrid").required(),
  transmission: Joi.string().valid("Automatic", "Manual").required(),
  pricePerDay: Joi.number().min(0).required(),
  location: Joi.string().trim().required(),
  description: Joi.string().trim().min(5).required(),
  isAvailable: Joi.boolean().optional(),
});

export const validateCar = (req, res, next) => {
  // req.body თავად შეიძლება undefined იყოს
  const rawCarData = req?.body?.carData;

  if (!rawCarData) {
    return res.status(400).json({ 
      success: false, 
      message: "carData is required" 
    });
  }

  let carData;
  try {
    carData = JSON.parse(rawCarData);
  } catch {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid JSON format" 
    });
  }

  const { error, value } = carSchema.validate(carData, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((e) => e.message),
    });
  }

  req.carData = value;
  next();
};