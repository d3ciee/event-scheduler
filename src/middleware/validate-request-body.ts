import { z, type AnyZodObject, ZodObject, ZodEffects } from "zod";
import type { NextFunction, Request, Response } from "express-serve-static-core";

const validateRequestBody = (schema:ZodObject<any> | ZodEffects<any>) => (req:Request,res:Response, next:any)=>{
    const contentType = req.headers["content-type"]
    if(contentType !== "application/json") 
        return res.status(400).send({status:"error", errors:["Content type must be 'application/json'"]})
    const body = schema.safeParse(req.body)

    if(body.success === false) return res.status(400).send({status:"error", errors:body.error.errors.map(e=>e.message)})
    next()
}

export default validateRequestBody;