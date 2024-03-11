import db from "../../../config/db";
import type { Controller } from "../../../types";
import User from "../models/user";
import {ulid} from "ulid"
import bcrypt from "bcryptjs"
import UserSession from "../models/user-session";
import { SESSION_EXPIRES_IN } from "../../../consts";
import logger from "../../../utils/logger";
import { RequestHandler } from "express";

const registerUser:RequestHandler = async (req, res)=>{
        const userId = ulid();
        const sessionId = ulid();
     
        await db.batch([
            db.insert(User).values({
                createdAt:Date.now(),
                id:userId,
                email:req.body.email,
                passwordHash:await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))     
            }),
            db.insert(UserSession).values({
                createdAt:Date.now(),
                expiresAt:Date.now() + SESSION_EXPIRES_IN,
                id:sessionId,
                userId,
                userAgent:req.headers["user-agent"],
                ipAddress:req.ip ?? null,
            }) 
        ])
        .then(()=>{
            if (req.query.setCookie == "true") res.cookie("auth-token", sessionId, {
                httpOnly:true,
                maxAge:SESSION_EXPIRES_IN,
            })
            res.status(200).send({status:"success", data:{token:sessionId}})
        })
        .catch((e:any)=>{
            if (e.message?.includes('UNIQUE constraint failed: user.email'))  
                return res.status(409).send({status:"error", errors:["Email is already in use"]})
            logger("register_user_failed", e)
            res.status(500).send({status:"error", errors:["An internal error has occured"]})
        })
        
}

export default registerUser;