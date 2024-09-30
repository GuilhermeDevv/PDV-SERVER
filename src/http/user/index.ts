import { Router } from "express";

import LoginController from "../controllers/loginController";

const router = Router();

router.get("/", LoginController.user);

export { router as userRouter };
