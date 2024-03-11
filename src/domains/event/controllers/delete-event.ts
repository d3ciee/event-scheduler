import { eq } from "drizzle-orm";
import db from "../../../config/db";
import { Controller } from "../../../types";
import Event from "../models/event";
import logger from "../../../utils/logger";

const deleteEvent:Controller=async (req,res)=>{
    if(!req.user.id) return res.status(403).send({status:"error", errors:["User not signed in"]})

    await db.delete(Event).where(eq(Event.id, req.query.id.toString()))
    .then((e)=>res.status(200).send({status:"success"}))
    .catch((e:any)=>{
        res.status(500).send({status:"error", errors:["An internal error has occured"]})
        logger("delete_event_failed", e)
    })
}

export default deleteEvent