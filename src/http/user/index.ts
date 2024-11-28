import { Router } from "express";

import LoginController from "../controllers/loginController";

const router = Router();

router.get("/", LoginController.user);
router.get("/info", LoginController.infoUser);
export { router as userRouter };
