import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as bodyValidationMiddleware from "../middlewares/bodyValidation.middleware";

const router = Router();

// Defining the routes
router.post(
    "/signup",
    bodyValidationMiddleware.validateSignup,
    userController.createNewUser
);
router.post(
    "/signin",
    bodyValidationMiddleware.validateSignin,
    userController.autheticateUser
);
router.get(
    "/buscar-usuario/:id",
    authMiddleware.checkTokenAndUser,
    (req: any, res: any) => {
        res.json(req.user);
    }
);

export default router;
