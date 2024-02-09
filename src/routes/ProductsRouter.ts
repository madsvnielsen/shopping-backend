import express, { Express, Request, Response } from "express";
export const productsRouter = express.Router();
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";

productsRouter.get("/list", (req : Request, res : Response) => {
    // #swagger.summary = 'List cards'
    // #swagger.tags = ["Products"]
    // TODO:
    return res.send("Not yet implemented")
})

productsRouter.get("/search", (req : Request<{query : string}>, res : Response) => {
    // #swagger.summary = 'Search cards from string'
    // #swagger.tags = ["Products"]
    // TODO:
    return res.send("Not yet implemented")
})

productsRouter.get("/:id", (req : Request<{id : string}>, res : Response) => {
    // #swagger.summary = 'Get card details'
    // #swagger.tags = ["Products"]
    PokemonAPI.getPokemonCard(req.params.id).then((result : Card) => {
        res.send(result);
    })
})
