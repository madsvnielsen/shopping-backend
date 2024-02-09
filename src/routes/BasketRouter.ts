import express, { Express, Request, Response } from "express";

export const basketRouter = express.Router();



basketRouter.post("/", (req : Request, res : Response) => {
    // #swagger.summary = 'Add item to basket'
    // #swagger.tags = ["Basket"]
    // TODO:
    return res.send("Not yet implemented")

})



basketRouter.delete("/:item_id", (req : Request<{card_id : string}>, res : Response) => {
    // #swagger.summary = 'Remove item from basket'
    // #swagger.tags = ["Basket"]

    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.delete("/", (req : Request, res : Response) => {
    // #swagger.summary = 'Delete basket'
    // #swagger.tags = ["Basket"]
    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.post("/order", (req : Request, res : Response) => {
    // #swagger.summary = 'Place order'
    // #swagger.tags = ["Basket"]
    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.get("/order/receipt", (req : Request, res : Response) => {

    // #swagger.summary = 'Get receipt  basket'
    // #swagger.tags = ["Basket"]
    // #swagger.description = 'Maybe this should be post idk?'

    // TODO:
    return res.send("Not yet implemented")
})
