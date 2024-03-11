import { ulid } from "ulid";
import db from "../../../config/db";
import { Controller } from "../../../types";
import Event from "../models/event";
import logger from "../../../utils/logger";

const createEvent:Controller = async (req,res)=>{
    if(!req.user) return res.status(403).send({status:"error", errors:["User not signed in"]})
    let eventId = ulid()

    /*
        Theres probably a better way to do this,
        out of refactoring time :(
    */
    const [durationH, durationM] = (req.body.duration as string).split(":").map(Number)

    const dateOffset = new Date(`${req.body.date} ${req.body.time}`)
    dateOffset.setHours(dateOffset.getHours()+durationH)
    dateOffset.setMinutes(dateOffset.getMinutes()+ durationM)



    const e = await db.query.Event.findFirst({
        where:(event, {between, sql})=>between(sql`strftime('%Y-%m-%d %H:%M', date || ' ' || time)`,`${req.body.date} ${req.body.time}`,
        `${dateOffset.getFullYear()}-${dateOffset.getMonth()}-${dateOffset.getDay()} ${dateOffset.getHours()}:${dateOffset.getMinutes()}` )
    })
  
    if(e) return res.status(400).send({status:"error", errors:["There is already an event booked for that slot.  Look for another"]})


    await db.insert(Event).values({
        createdAt:Date.now(),
        createdBy:req.user.id,
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

export default createEvent