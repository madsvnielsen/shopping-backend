import express, { Express, Request, Response } from "express";

export const productsRouter = express.Router();



productsRouter.get("/list", (req : Request, res : Response) => {
    // #swagger.summary = 'List cards'
    // TODO:
    return res.send("Not yet implemented")
})

productsRouter.get("/search", (req : Request<{query : string}>, res : Response) => {
    // #swagger.summary = 'Search cards from string'
    // TODO:
    return res.send("Not yet implemented")
})

productsRouter.get("/:id", (req : Request<{id : string}>, res : Response) => {
    // #swagger.summary = 'Get card details'
    // TODO:
    return res.send("Not yet implemented")
})
