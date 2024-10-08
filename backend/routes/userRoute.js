import express from "express";
import { login, logout, signup } from "../controller/user.controller.js"; // .js is important here
import { getProfile } from "../controller/getProfile.controller.js"; // .js is important here
import { authenticate } from "../middleware/authenticate.js";
import { getVolunteer } from "../controller/getVolunteer.controller.js";
import { getEmail } from "../controller/getEmail.controller.js";
import { sendEmail } from "../controller/sendEmail.controller.js";

const router = express.Router();

// Rather than using complete code of APIs here, we can make their different files known as controllers
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authenticate, getProfile);
router.get("/volunteer", authenticate, getVolunteer);
router.get("/email", authenticate, getEmail);
router.get("send-email",authenticate,sendEmail);

export default router;
