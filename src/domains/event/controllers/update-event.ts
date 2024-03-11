import { ulid } from "ulid";
import db from "../../../config/db";
import { Controller } from "../../../types";
import Event from "../models/event";
import logger from "../../../utils/logger";
import { eq } from "drizzle-orm";

const updateEvent:Controller = async (req,res)=>{
    if(!req.user) return res.status(403).send({status:"error", errors:["User not signed in"]})
    let eventId = ulid()

    //TODO: Check if there are no clashing EVENTS 

    await db.update(Event).set({
        description:req.body.description ?? undefined,
        title:req.body.title ?? undefined,
        date:req.body.date ?? undefined,
        time:req.body.time ?? undefined
    })
    .where(eq(Event.id, req.params.id))
    .then((e)=>{
        res.status(200).send({status:"success", data:{eventId}})
    })
    .catch((e:any)=>{
        res.status(500).send({status:"error", errors:["An internal error has occured"]})
        logger("update_event_failed", e)
    })
}

export default updateEvent