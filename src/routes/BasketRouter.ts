import express, { Express, Request, Response } from "express";

export const basketRouter = express.Router();



basketRouter.post("/", (req : Request, res : Response) => {
    // #swagger.summary = 'Add item to basket'

    // TODO:
    return res.send("Not yet implemented")

})



basketRouter.delete("/:item_id", (req : Request<{card_id : string}>, res : Response) => {
    // #swagger.summary = 'Remove item from basket'

    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.delete("/", (req : Request, res : Response) => {
    // #swagger.summary = 'Delete basket'
    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.post("/order", (req : Request, res : Response) => {
    // #swagger.summary = 'Place order'
    // TODO:
    return res.send("Not yet implemented")
})

basketRouter.get("/order/receipt", (req : Request, res : Response) => {
    // #swagger.summary = 'Get receipt  basket'
    // #swagger.description = 'Maybe this should be post idk?'

    // TODO:
    return res.send("Not yet implemented")
})
