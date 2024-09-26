import express from "express";
import { uploadFileUsingMulter } from "../middlewares/multer.js";

import {
  removeBg,
  resizeImg,
} from "../controllers/toolsOperation.controllers.js";

const router = express.Router();

// image backround remove route
router.post("/removebg", uploadFileUsingMulter.single("image"), removeBg);

// image resize route
router.post("/resizeImg", uploadFileUsingMulter.single("image"), resizeImg);

export default router;
