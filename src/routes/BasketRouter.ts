import express, { Express, Request, Response } from "express";
import session from "express-session";

export const basketRouter = express.Router();
export const sessionManager = express();

const basketStorage : {[key: string]: any[]} = {};

basketRouter.use(express.json());
basketRouter.use(express.urlencoded({extended: false}));

basketRouter.use(session({ //session settings
    secret: "bishString",
    resave: false,
    saveUninitialized: true
}));

basketRouter.post("/add", (req : Request<{itemId : string}>, res : Response) => {
    const sessionId = req.sessionID; //Unique identifier,
    console.log(req.body)
    const item = req.body.itemId;

    // #swagger.summary = 'Add item to basket'
    // #swagger.tags = ["Basket"]
    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }
    basket.push(item);
    // TODO:
    return res.send({sessionId, basket})
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
    // #swagger.description = 'Maybe this should be post idk?' IS THIS FOR RETRIEVING ThE BASKET?????!??!?!?!


    const sessionId = req.sessionID;
    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }
    return res.send(basket)
})


