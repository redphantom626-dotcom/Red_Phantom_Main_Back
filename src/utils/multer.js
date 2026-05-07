import multer from "multer";

export const fileValidation = {
  images: ["image/png", "image/jpeg", "image/jpg"],
};

const storage = multer.diskStorage({});
const fileFilter = (validation) => {
  return (req, file, cb) => {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid File Type"), false);
    }
  };
};

export const uploadFile = ({ validation = [] }) => {
  return multer({
    storage,
    fileFilter: fileFilter(validation),
  });
};
