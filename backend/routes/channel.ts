import { Router } from "express";
import {
    getAllChannels,
    getChannelById,
    getDefaultChannel,
    newChannel,
} from "../controllers/channel";
import requireAuth from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(requireAuth, newChannel);
router.route("/").get(requireAuth, getAllChannels);
router.route("/default").get(requireAuth, getDefaultChannel);
router.route("/:id").get(requireAuth, getChannelById);

export default router;
