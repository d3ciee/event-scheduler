import { z, type AnyZodObject, ZodObject, ZodEffects } from "zod";
import type { NextFunction, Request, Response } from "express";

const validateRequestBody = (schema:ZodObject<any> | ZodEffects<any>) => (req:Request,res:Response, next:any)=>{
    const body = schema.safeParse(req.body)
    if(body.success === false) return res.status(400).send({status:"error", errors:body.error.errors.map(e=>e.message)})
    next()
}

export default validateRequestBody;