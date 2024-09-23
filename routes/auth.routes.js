import express from "express";
import {
  userRegister,
  userContactUs,
  userLogin,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/contact-us", userContactUs);
router.post("/sign-up", userRegister);
router.post("/login", userLogin);

export default router;
