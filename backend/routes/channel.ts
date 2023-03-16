import { Router } from "express";
import { getAllChannels, newChannel } from "../controllers/channel";
import requireAuth from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(requireAuth, newChannel);
router.route("/").get(requireAuth, getAllChannels);

export default router;
