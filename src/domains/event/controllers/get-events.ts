import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";

const getEvents:Controller = async (req,res)=>{
    const limit:number = Math.min(Number(req.params.limit), 100) ?? 10 
    const offset:number = Number(req.params.offset) ?? 0
    const query:string = req.params.query
    //TODO add startDateTime and endDateTime

    await db.query.Event.findMany({
        limit,
        offset,
        columns:{
            createdBy:false
        },
        where:(e,{or, like})=>or(like(e.title,query), like(e.description,query)),

        with:{
            createdBy:{
                columns:{email:true, id:true}
            }
        }
        
    }).then((e)=>res.status(200).send({status:"success", data:{events:e}}))
    .catch((e:any)=>{
        res.status(500).send({status:"error", errors:["An internal error has occured"]})
        logger("create_event_failed", e)
    })
}

export default getEvents