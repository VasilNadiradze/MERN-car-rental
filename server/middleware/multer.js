import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // 🔥 ეს არის სწორი
});

export default upload;
