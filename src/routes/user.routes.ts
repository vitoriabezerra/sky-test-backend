import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Defining the routes
router.post("/signup", userController.createNewUser);
router.post("/signin", userController.autheticateUser);
router.get(
    "/buscar-usuario/:id",
    authMiddleware.checkTokenAndUser,
    (req: any, res: any) => {
        res.json(req.user);
    }
);

export default router;
