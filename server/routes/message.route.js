import { Router } from "express";
import protectedAuth from "../middleware/auth.middleware.js";
import { deleteMessage, getAllUsers, getMessages, sendMessage, updateMessage } from "../controllers/message.controllers.js";

const router  = new Router();

router.get("/users",protectedAuth, getAllUsers)
router.get("/:id", protectedAuth, getMessages)

router.post("/send/:id",  protectedAuth, sendMessage)

router.patch("/:id", protectedAuth, updateMessage)
router.delete("/:id", protectedAuth, deleteMessage)


export default router;