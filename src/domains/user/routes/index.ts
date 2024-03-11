import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body";
import { registerUserValidationSchema } from "../validators";
import registerUser from "../controllers/register-user";
const router = express.Router();

router.post("/register", validateRequestBody(registerUserValidationSchema), registerUser)

export default router;
