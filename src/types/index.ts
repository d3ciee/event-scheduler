import { Request, Response } from "express"

type Controller = (req:Request, res:Response)=>Promise<void>

export type {
    Controller
}