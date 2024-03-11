import db from "../../../config/db";
import UserSession from "../models/user-session";
import logger from "../../../utils/logger";
import { RequestHandler } from "express";
import { eq } from "drizzle-orm";

const logoutUser:RequestHandler = async (req, res)=>{
    if(!req.user) return res.status(403).send({status:"error", errors:["User not signed in"]})

        await db.delete(UserSession).where(eq(UserSession.id, req.session?.id))
        .then(()=>{
            res.cookie("auth-token", "", {
                httpOnly:true,
                maxAge:1,
            })
            res.status(200).send({status:"success"})
        })
        .catch((e:any)=>{
            logger("register_user_failed", e)
            res.status(500).send({status:"error", errors:["An internal error has occured"]})
        })
        
}

export default logoutUser;