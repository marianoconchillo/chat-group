import { Router } from "express";
import {
    updateUser,
    loginUser,
    registerUser,
    loginUserFirebase,
    getMe,
} from "../controllers/users";
import requireAuth from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/loginFirebase").post(loginUserFirebase);
router.route("/me").get(requireAuth, getMe);
router.route("/:id").patch(requireAuth, updateUser);

export default router;
