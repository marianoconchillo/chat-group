import { Router } from "express";
import { newChannel } from "../controllers/channel";
import requireAuth from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(requireAuth, newChannel);

export default router;
