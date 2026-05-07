import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { updateProfile } from "./user.controller.js";
import { uploadFile, fileValidation } from "../../utils/multer.js";

const router = Router();

router.patch(
  "/update-profile",
  authentication(),
  uploadFile({
    validation: fileValidation.images,
  }).single("image"),
  updateProfile,
);

export default router;
