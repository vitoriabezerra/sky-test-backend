import { Router } from "express";
import * as userController from "../controllers/user.controllers";

const router = Router();

// Defining the routes
router.post("/signup", userController.createNewUser);
router.post("/signin", userController.autheticateUser);
// router.post("/search", userController.createNewUser);

export default router;
