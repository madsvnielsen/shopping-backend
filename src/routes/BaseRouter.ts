import express, { Express, Request, Response } from "express";
import {productsRouter} from "./ProductsRouter";
import {basketRouter} from "./BasketRouter";


export const baseRouter = express.Router();



baseRouter.use("/products", productsRouter)
baseRouter.use("/basket", basketRouter)


baseRouter.get('/test/', (req : Request, res : Response) =>{
    console.log("KEY: " + process.env.API_KEY)
    res.send(process.env.API_KEY);
});
