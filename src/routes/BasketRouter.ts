import express, { Express, Request, Response } from "express";
import session from "express-session";
import {Order} from "../Models/DataModels/OrderModel";
import {Address} from "../Models/DataModels/AddressModel";
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";
import crypto from "crypto"
import { sendOrderConfirmationMail } from "../mailgun/MailgunApi";
import {Payment, PaymentMethod} from "../Models/DataModels/PaymentModel";


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




basketRouter.get("/", (req : Request, res : Response) => {
    // #swagger.summary = 'Get basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.sessionID; //Unique identifier,
    const item = req.body.itemId;
    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }
    return res.send({"basket": basket})
})


basketRouter.post("/add", (req : Request<{itemId : string}>, res : Response) => {
    console.log("add");
    const sessionId = req.sessionID; //Unique identifier,
    const item = req.body.itemId;
    console.log(sessionId);
    // #swagger.summary = 'Add item to basket'
    // #swagger.tags = ["Basket"]
    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }
    PokemonAPI.getPokemonCard(item).then((result : Card) => {
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



basketRouter.delete("/:item_id", (req, res : Response) => {
    // #swagger.summary = 'Remove item from basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.sessionID;
    console.log(sessionId);
    let basket = basketStorage[sessionId];
    if(!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }

    for(let i = 0; i < basket.length; i++){
        if (basket[i] == req.params.item_id){
            let itemToRemove = i;
            basket = basket.filter((e, j) => j !== itemToRemove)
            basketStorage[sessionId] = basket;
        }
    }

    // TODO:
    return res.send(basket)
})

basketRouter.delete("/", (req : Request, res : Response) => {
    let sessionId = req.sessionID;
    let basket = basketStorage[sessionId];
    basket = [];
    basketStorage[sessionId] = basket;



    // #swagger.summary = 'Delete basket'
    // #swagger.tags = ["Basket"]
    // TODO:


    return res.send(basket)
})

interface OrderRequestBody {
    firstName: string;
    lastName: string;
    companyName: string;
    phoneNumber: number;
    email: string;
    streetName: string;
    city: string;
    zipcode: number;
    paymentMethod: PaymentMethod;

}
basketRouter.post("/order", (req : Request<OrderRequestBody>, res : Response) => {
    // #swagger.summary = 'Place order'
    // #swagger.tags = ["Basket"]
    const sessionId = req.sessionID

    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }

    if(basket.length == 0){
        return res.send("Basket is empty!")
    }

    PokemonAPI.getPokemonCardsFromIds(basket as Array<string>).then(async (cards : Array<Card>) => {

        let totalPrice = 0;
        cards.forEach((card : Card) => {
            totalPrice += card.cardmarket.prices.averageSellPrice

        })
        const orderNumber = crypto.randomUUID();

        const payment = await Payment.create({
            paymentMethod : req.body.paymentMethod
        })

        const address = await Address.create({
            streetName: req.body.streetName,
            city: req.body.city,
            zipCode: req.body.zipCode,
            orderNumber: orderNumber
        })

        const order = await Order.create({firstName: req.body.firstName,
            lastName: req.body.lastName,
            orderNumber: orderNumber,
            itemIds: basket,
            totalPrice: totalPrice,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            deliveryAddress: address.dataValues.id,
            billingAddress: address.dataValues.id,
            payment: payment.dataValues.id
        }).then(() =>{


        })

        sendOrderConfirmationMail(order, cards, address, address)


        basketStorage[sessionId] = []
        return res.send({"Order": orderNumber})

    })


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
