import Express from "express";
import { getConversation, newConversation } from "../controllers/conversation.js";

const router = Express.Router();

router.post("/", newConversation);
router.get("/:userId", getConversation);

export default router;