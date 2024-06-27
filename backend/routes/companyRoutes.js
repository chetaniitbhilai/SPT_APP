import express from "express"
import { authenticate } from "../middleware/authenticate.js";
import { getCompanies } from "../controller/getCompanies.controller.js";
import { updateCompany } from "../controller/updateCompany.js";

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.get("/volunteer", authenticate, getCompanies);
router.post('/update', updateCompany);

export default router;