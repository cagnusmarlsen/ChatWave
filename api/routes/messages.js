import Express from "express";
import { getMessage, newMessage } from "../controllers/message.js";


const router = Express.Router();

router.post("/", newMessage);
router.get("/:conversationId", getMessage);

export default router;