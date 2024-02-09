import express, { Express, Request, Response } from "express";

export const baseRouter = express.Router();




baseRouter.get('/test/', (req : Request, res : Response) =>{
    console.log("KEY: " + process.env.API_KEY)
    res.send(process.env.API_KEY);
});
