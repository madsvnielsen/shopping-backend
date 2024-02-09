import express, { Express, Request, Response } from "express";

export const baseRouter = express.Router();




baseRouter.get('/test/', (req : Request, res : Response) =>{
    res.send("hej");
});
