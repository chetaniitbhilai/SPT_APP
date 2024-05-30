import express from "express"
import {addData} from '../controller/add.controller.js'

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.post("/add",addData);

export default router;