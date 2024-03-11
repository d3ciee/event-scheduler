import db from "../../../config/db";
import { Controller } from "../../../types";
import logger from "../../../utils/logger";

const getEvent:Controller = async (req,res)=>{
    if(!req.user.id) return res.status(403).send({status:"error", errors:["User not signed in"]})

    await db.query.Event.findFirst({
        columns:{
            createdBy:false
        },
        with:{
            createdBy:{
                columns:{email:true, id:true}
            }
        }
        
    }).then((e)=>res.status(200).send({status:"success", data:{event:e}}))
    .catch((e:any)=>{
        res.status(500).send({status:"error", errors:["An internal error has occured"]})
        logger("create_event_failed", e)
    })
}

export default getEvent