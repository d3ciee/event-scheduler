import { ulid } from "ulid";
import db from "../../../config/db";
import { Controller } from "../../../types";
import Event from "../models/event";
import logger from "../../../utils/logger";

const getEvent:Controller = async (req,res)=>{
    let eventId = ulid()

    db.insert(Event).values({
        createdAt:Date.now(),
        description:req.body.description,
        id:eventId,
        title:req.body.title,
        date:req.body.date,
        time:req.body.time
    }).then((e)=>{
        res.status(200).send({status:"success", data:{eventId}})
    })
    .catch((e:any)=>{
        res.status(500).send({status:"error", errors:["An internal error has occured"]})
        logger("create_event_failed", e)
    })
}

export default getEvent