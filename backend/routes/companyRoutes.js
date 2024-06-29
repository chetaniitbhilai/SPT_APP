import express from "express"
import { authenticate } from "../middleware/authenticate.js";
import { getCompanies } from "../controller/getCompanies.controller.js";
import { updateCompany } from "../controller/updateCompany.js";
import { getCompaniesCoordi } from "../controller/getCompanyCoordi.controller.js";
import { assignVolunteer } from "../controller/assignVolunteer.controller.js";

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.get("/volunteer", authenticate, getCompanies);
router.get("/coordinator", authenticate, getCompaniesCoordi);
router.post('/update', updateCompany);
router.post("/assign", assignVolunteer)

export default router;