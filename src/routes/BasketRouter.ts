import express, { Express, Request, Response } from "express";
import session from "express-session";
import {Order} from "../Models/DataModels/OrderModel";
import {Address} from "../Models/DataModels/AddressModel";
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";
import crypto from "crypto"
import { sendOrderConfirmationMail } from "../mailgun/MailgunApi";
import {Payment, PaymentMethod} from "../Models/DataModels/PaymentModel";
import {NUMBER} from "sequelize";


export const basketRouter = express.Router();
export const sessionManager = express();



const basketStorage: { [key: string]: BasketItem[] } = {};

interface BasketItem {
    id: string;
    quantity: number;
    card: Card;
    isLaminated: boolean;
}

basketRouter.use(express.json());
basketRouter.use(express.urlencoded({extended: false}));

basketRouter.use(session({ //session settings
    secret: "bishString",
    resave: false,
    saveUninitialized: true
}));




basketRouter.get("/:sessionId?", (req : Request<{sessionId?: string}>, res : Response) => {
    // #swagger.summary = 'Get basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.params.sessionId === undefined ? req.sessionID : req.params.sessionId; //Unique identifier,
    const item = req.body.itemId;
    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }
    return res.send({basket, sessionId})
})


basketRouter.post("/add", async (req: Request<{ itemId: string, quantity?: number, sessionId?: string}>, res: Response) => {
    console.log("add");
    const sessionId = req.body.sessionId === undefined? req.sessionID : req.body.sessionId; // Unique identifier
    const item = req.body.itemId;
    const quantity = req.body.quantity || 1;

    console.log(sessionId);

    // #swagger.summary = 'Add item to basket'
    // #swagger.tags = ["Basket"]

    try {
        let basket = basketStorage[sessionId];

        if (!basket) {
            basket = [];
            basketStorage[sessionId] = basket;
        }

        const existingItem = basket.find(existing => existing.id === item);
        const index = basket.findIndex(existing => existing.id === item)


        if (existingItem) {
            const quan: number = Number(existingItem.quantity) + Number(quantity);
            if(quan == null){
                return res.send({"Error" : "invalid value for quantity"})
            }

            basket[index].quantity = quan;
        } else {
            try{
                const pokemonCard = await PokemonAPI.getPokemonCard(item);
                basket.push({id: item, quantity: Number(quantity), card: pokemonCard, isLaminated: false});
            } catch (e) {
                return res.send({"Error" : e})
            }
            
        }

        basketStorage[sessionId] = basket;

        return res.send({ sessionId, basket });
    } catch (e) {
        console.error(e);
        const error = "fatalError";
        res.statusCode = 404;
        return res.send("fatal backend error" + e);
    }
});



basketRouter.delete("/:sessionId/:item_id", (req, res : Response) => {
    // #swagger.summary = 'Remove item from basket'
    // #swagger.tags = ["Basket"]
    const sessionId = req.params.sessionId;
    console.log(sessionId);
    let basket = basketStorage[sessionId];
    if(!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }

    for(let i = 0; i < basket.length; i++){
        if (basket[i].id == req.params.item_id){
            let itemToRemove = i;
            basket = basket.filter((e, j) => j !== itemToRemove)
            basketStorage[sessionId] = basket;
        }
    }

    // TODO:
    return res.send(basket)
})


basketRouter.delete("/:sessionId/", (req : Request, res : Response) => {
    let sessionId = req.params.sessionId;

    let basket = basketStorage[sessionId];
    basket = [];
    basketStorage[sessionId] = basket;



    // #swagger.summary = 'Delete basket'
    // #swagger.tags = ["Basket"]
    // TODO:


    return res.send(basket)
})

interface OrderRequestBody {
    fullName: string;
    companyName: string;
    phoneNumber: number;
    email: string;
    streetName: string;
    city: string;
    zipcode: number;
    paymentMethod: PaymentMethod;
    sessionId : string;

}
basketRouter.post("/order", (req : Request<OrderRequestBody>, res : Response) => {
    // #swagger.summary = 'Place order'
    // #swagger.tags = ["Basket"]
    const sessionId = req.body.sessionId === undefined? req.sessionID : req.body.sessionId; // Unique identifier

    let basket = basketStorage[sessionId];
    if (!basket){
        basket = [];
        basketStorage[sessionId] = basket;
    }

    if(basket.length == 0){
        return res.send("Basket is empty!")
    }

    PokemonAPI.getPokemonCardsFromIds(basket.map(val => val.id)).then(async (cards : Array<Card>) => {

        let totalPrice = 0;
        cards.forEach((card : Card) => {
            totalPrice += card.cardmarket.prices.averageSellPrice

        })
        const orderNumber = crypto.randomUUID();
        
        if(!Object.values(PaymentMethod).includes(req.body.paymentMethod)){
            res.send({"Error" : "Invalid payment method " + req.body.paymentMethod})
            return
        }
            

        const payment = await Payment.create({
            paymentMethod : req.body.paymentMethod
        })

        const address = await Address.create({
            streetName: req.body.streetName,
            city: req.body.city,
            zipCode: req.body.zipCode,
            orderNumber: orderNumber
        })

        const order = await Order.create({fullName: req.body.fullName,
            
            orderNumber: orderNumber,
            itemIds: basket,
            totalPrice: totalPrice,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            deliveryAddress: address.dataValues.id,
            billingAddress: address.dataValues.id,
            payment: payment.dataValues.id
        })

        sendOrderConfirmationMail(order, cards, address, address)


        basketStorage[sessionId] = []
        return res.send({"Order": orderNumber})

    }).catch(e => res.send({"Error" : e}))


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
