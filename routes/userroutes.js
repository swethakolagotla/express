import express from "express"
import { johnspath, welcomeuser } from "../controllers/usercontroller.js"

const router=express.Router()
router.get("/",welcomeuser);
router.get("/john",johnspath)
export default router;