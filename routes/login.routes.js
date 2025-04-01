import { Router } from "express";
import { login, register, updatePassword } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login/", login);
router.post("/register/", register);
router.put("/updatePassword/", updatePassword);

export default router;