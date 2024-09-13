import express from "express";
import { uploadFileUsingMulter } from "../middlewares/multer.js";
import { removeBg } from "../controllers/removeBg.controller.js";

const router = express.Router();

// image backround remove route
router.post("/removebg", uploadFileUsingMulter.single("image"), removeBg);

export default router;
