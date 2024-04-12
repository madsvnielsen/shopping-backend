import mailgun from "mailgun-js";
import { Order } from "../Models/DataModels/OrderModel";
import { Address } from "../Models/DataModels/AddressModel";
import { Card } from "../Models/CardModel";


const DOMAIN = process.env.MAILGUN_DOMAIN;
const KEY = process.env.MAILGUN_KEY;
const mg = mailgun({apiKey: KEY as string, domain: DOMAIN as string});



export async function testMail(){
    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox1b8408a2c6ad47ecac111fd804138bd8.mailgun.org>",
        to: "mads@hvn.dk",
        subject: "Hello",
        text: "Testing some Mailgun awesomness!",
        template: "order-confirmation"
    };
    const result = await mg.messages().send(data, function (error, body) {
        console.log(body);
    })
}

export async function sendOrderConfirmationMail(order: Order, cards : Array<Card>, billingAddress : Address, deliveryAddress : Address){
    const orderValues = order.dataValues
    const cardString = cards.map((card) => "<li>"+card.name + " - $" + card.cardmarket.prices.averageSellPrice + "</li>").join("\n")
    const orderString = "<ul>"+cardString+"</ul><br/><h2>Total $"+orderValues.totalPrice + "</h2><b>Delivery address</b><br/>"+
    deliveryAddress.dataValues.streetName + "<br/>" +
    deliveryAddress.dataValues.zipCode + "<br/>" +
    deliveryAddress.dataValues.city + "<br/>" +
    "<br/><b>Billing address</b><br/>" + 
    billingAddress.dataValues.streetName + "<br/>" +
    billingAddress.dataValues.zipCode + "<br/>" +
    billingAddress.dataValues.city + "<br/>" +
    "<br/><b>Contact information</b><br/>" + 
    orderValues.firstName + " " + orderValues.lastName + "<br/>" +
    orderValues.email + "<br/>" + 
    orderValues.phoneNumber;
    
    

    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox1b8408a2c6ad47ecac111fd804138bd8.mailgun.org>",
        to: orderValues.email,
        template: "order-confirmation",
        'h:X-Mailgun-Variables': JSON.stringify({firstName: orderValues.firstName, orderDetails: orderString, orderNumber: orderValues.orderNumber})
    };
    const result = await mg.messages().send(data, function (error, body) {
        console.log(body);
    })
}