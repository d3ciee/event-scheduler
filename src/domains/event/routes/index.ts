import express from "express"
import validateRequestBody from "../../../middleware/validate-request-body";
import { createEventValidationSchema,updateEventValidationSchema } from "../validators";
import createEvent from "../controllers/create-event"
import getEvent from "../controllers/get-event";
import getEvents from "../controllers/get-events"
import deleteEvent from "../controllers/delete-event";

import updateEvent from "../controllers/update-event";
const router = express.Router();


router.post("/new", validateRequestBody(createEventValidationSchema), createEvent)
router.get("/get/all", getEvents)
router.get("/get/:id", getEvent)
router.patch("/patch/:id", validateRequestBody(updateEventValidationSchema), updateEvent)
router.delete("/delete/:id", deleteEvent)


export default router;
