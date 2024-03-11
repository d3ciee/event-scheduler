import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body";
import { authUserValidationSchema } from "../validators";
import registerUser from "../controllers/register-user";
import loginUser from "../controllers/login-user";
import logoutUser from "../controllers/logout-user";
const router = express.Router();

router.post("/register", validateRequestBody(authUserValidationSchema), registerUser)
router.post("/login", validateRequestBody(authUserValidationSchema), loginUser)
router.post("/logout", logoutUser)


export default router;
