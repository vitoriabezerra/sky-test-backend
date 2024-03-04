import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Defining the routes
router.post("/signup", userController.createNewUser);
router.post("/signin", userController.autheticateUser);
router.get("/buscar-usuario", authMiddleware.checkTokenAndUser, (req, res) => {
    // All validations are done in the middleware, since we dont need to update any info, we wont need a controller and service
    res.json({ req });
});

export default router;
