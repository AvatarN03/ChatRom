import { Router } from "express";
import { checkAuth, getProfileDetails, login, logout, signup, updateProfilePic } from "../controllers/auth.controllers.js";
import protectedAuth from "../middleware/auth.middleware.js";

const router =  Router();

router.post("/signup", signup)


router.post("/login", login)


router.post("/logout",logout )

router.put("/profilepic", protectedAuth, updateProfilePic)

router.get("/check", protectedAuth, checkAuth)

router.get("/:id", protectedAuth, getProfileDetails)

export default router;