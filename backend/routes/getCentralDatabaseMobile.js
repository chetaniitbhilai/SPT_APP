import express from "express"
import { getCentralDatabase } from "../controller/getCentralDatabase.controller.js";
import { getCompaniesAll } from "../controller/getCompaniesAll.controller.js";


const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.get("/getcdb",getCentralDatabase);
router.get("/getcdbweb",getCompaniesAll);

export default router;