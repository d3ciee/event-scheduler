import db from "../../../config/db";
import type { Controller } from "../../../types";
import {ulid} from "ulid"
import bcrypt from "bcryptjs"
import UserSession from "../models/user-session";
import { SESSION_EXPIRES_IN } from "../../../consts";
import logger from "../../../utils/logger";

const loginUser:Controller = async (req, res)=>{
        const sessionId = ulid();
     
        const user = await db.query.User.findFirst({columns:{passwordHash:true, id:true}, 
            where: (user, { eq }) => eq(user.email, req.body.email)
        });
        if(!user || (user && await bcrypt.compare(req.body.password, user.passwordHash))) 
            return res.status(403).send({ status: "error", errors: ["Invalid credentials"] })
        
        await db.insert(UserSession).values({
                createdAt:Date.now(),
                expiresAt:Date.now() + SESSION_EXPIRES_IN,
                id:sessionId,
                userId:user.id,
                userAgent:req.headers["user-agent"],
                ipAddress:req.ip ?? null,
            }) 
            .then(()=>{
                if (req.query.setCookie === "true") res.cookie("auth-token", sessionId, {
                    httpOnly:true,
                    maxAge:SESSION_EXPIRES_IN,
                })
                res.status(200).send({status:"success", data:{token:sessionId}})
        })
        .catch((e:any)=>{
            res.status(500).send({status:"error", errors:["An internal error has occured"]})
            logger("login_user_failed", e)
        })

}

export default loginUser;