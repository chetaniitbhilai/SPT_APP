import express from "express"
import { getCentralDatabase } from "../controller/getCentralDatabase.controller.js";


const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.get("/getcdb",getCentralDatabase);

export default router;