import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body";
import { createEventValidationSchema } from "../validators";
import createEvent from "../controllers/create-event"
import getEvent from "../controllers/get-event";
import getEvents from "../controllers/get-events"
import deleteEvent from "../controllers/delete-event";
const router = express.Router();


router.post("/new", validateRequestBody(createEventValidationSchema), createEvent)
router.get("/all", getEvents)
router.get("/:id", getEvent)
router.delete("/:id", deleteEvent)


export default router;
