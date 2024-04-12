import express, {Express, Request, Response} from "express";
import session from "express-session";
import {Order} from "../Models/DataModels/OrderModel";
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";
import crypto from "crypto"
import {Address} from "../Models/DataModels/AddressModel";

export const basketRouter = express.Router();
export const sessionManager = express();


const basketStorage: { [key: string]: any[] } = {};

basketRouter.use(express.json());
basketRouter.use(express.urlencoded({extended: false}));

basketRouter.use(session({ //session settings
    secret: "bishString",
    resave: false,
    saveUninitialized: true
}));


basketRouter.get("/", (req: Request, res: Response) => {
    // #swagger.summary = 'Get basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.sessionID; //Unique identifier,
    const item = req.body.itemId;
    let basket = basketStorage[sessionId];
    if (!basket) {
        basket = [];
        basketStorage[sessionId] = basket;
    }
    return res.send({"basket": basket})
})

basketRouter.post("/add", (req: Request<{ itemId: string }>, res: Response) => {
    console.log("add");
    const sessionId = req.sessionID; //Unique identifier,
    const item = req.body.itemId;
    console.log(sessionId);
    // #swagger.summary = 'Add item to basket'
    // #swagger.tags = ["Basket"]
    let basket = basketStorage[sessionId];
    if (!basket) {
        basket = [];
        basketStorage[sessionId] = basket;
    }
    PokemonAPI.getPokemonCard(item).then((result: Card) => {
        console.log("no failure")
        basket.push(item)
        return res.send({sessionId, basket})
    }).catch((e) => {
        const error = "fatalError"
        res.statusCode = 404;
        return res.send("fatal backend error");
    })
    console.log(basket);
    // TODO:
})


basketRouter.delete("/:item_id", (req, res: Response) => {
    // #swagger.summary = 'Remove item from basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.sessionID;
    console.log(sessionId);
    let basket = basketStorage[sessionId];
    if (!basket) {
        basket = [];
        basketStorage[sessionId] = basket;
    }

    for (let i = 0; i < basket.length; i++) {
        if (basket[i] == req.params.item_id) {
            let itemToRemove = i;
            basket = basket.filter((e, j) => j !== itemToRemove)
            basketStorage[sessionId] = basket;
        }
    }

    // TODO:
    return res.send(basket)
})

basketRouter.delete("/", (req: Request, res: Response) => {
    let sessionId = req.sessionID;
    let basket = basketStorage[sessionId];
    basket = [];
    basketStorage[sessionId] = basket;


    // #swagger.summary = 'Delete basket'
    // #swagger.tags = ["Basket"]
    // TODO:


    return res.send(basket)
})

basketRouter.post("/order", (req: Request<{ firstName: string, lastName: string }>, res: Response) => {
    // #swagger.summary = 'Place order'
    // #swagger.tags = ["Basket"]
    // TODO:
    const sessionId = req.sessionID
    const orderNumber = crypto.randomUUID();
    const addressID = crypto.randomUUID();
    let basket = basketStorage[sessionId];
    if (!basket) {
        basket = [];
        basketStorage[sessionId] = basket;
    }

    if (basket.length == 0) {
        return res.send("Basket is empty!")
    }

    PokemonAPI.getPokemonCardsFromIds(basket as Array<string>).then(async (cards: Array<Card>) => {

        let totalPrice = 0;
        cards.forEach((card: Card) => {
            totalPrice += card.cardmarket.prices.averageSellPrice

        })
        await Address.create({
            addressId: addressID,
            city: "Test City",
        });

        await Order.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            addressId: addressID,
            orderNumber: orderNumber,
            itemIds: basket,
            totalPrice: totalPrice,
            orderComment: "test comment",
            marketingEmails: true
        });


        basketStorage[sessionId] = []

    })


    return res.send({"Order": orderNumber, "Address": addressID})
})

basketRouter.get("/order/receipt/:ordernumber", async (req: Request<{ ordernumber: string }>, res: Response) => {

    // #swagger.summary = 'Get receipt  basket'
    // #swagger.tags = ["Basket"]
    // #swagger.description = 'Maybe this should be post idk?' IS THIS FOR RETRIEVING ThE BASKET?????!??!?!?!

    const order = await Order.findOne({
        where: {
            orderNumber: req.params.ordernumber
        }
    });


    const sessionId = req.sessionID;
    let basket = basketStorage[sessionId];
    if (!basket) {
        basket = [];
        basketStorage[sessionId] = basket;
    }
    if (order == null) {
        return res.send("Order does not exist")
    } else {
        return res.send(order)
    }
})
