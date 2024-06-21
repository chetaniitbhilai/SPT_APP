import express from "express"
import { login, logout, signup } from "../controller/user.controller.js";                        //.js is important here
import {  getProfile } from "../controller/getProfile.controller.js";                             //.js is important here
import {authenticate} from "../middleware/authenticate.js"
// import { getVolunteer} from "../controller/getVolunteer.controller.js"      

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authenticate, getProfile);
// router.get("/volunteer", authenticate, getVolunteer);

export default router;