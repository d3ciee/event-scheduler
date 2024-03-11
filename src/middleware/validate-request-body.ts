import { z, type AnyZodObject } from "zod";
import type { NextFunction, Request, Response } from "express";

const validateRequestBody = (schema:AnyZodObject) => (req:Request,res:Response, next:NextFunction)=>{
    const body = schema.safeParse(req.body)
    if(body.success === false) return res.status(400).send({status:"error", errors:body.error.errors.map(e=>e.message)})
    next()
}

export default validateRequestBody;