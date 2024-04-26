import express, {Express, Request, Response} from "express";

export const productsRouter = express.Router();
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";

productsRouter.get("/list", (req : Request<{},{},{},{pagenumber:number}>, res : Response) => {
    const {query} = req
    // #swagger.summary = 'List cards'
    // #swagger.tags = ["Products"]
    console.log(query.pagenumber)
    PokemonAPI.listOfCards(req.query.pagenumber).then((cards: Array<Card>) => {
        console.log(cards)
        res.send(cards);
    })
})

productsRouter.get("/search/:query", (req : Request<{},{},{},{query : string, pagenumber:number}>, res : Response) => {
    const {query} =req
    // #swagger.summary = 'Search cards from string'
    // #swagger.tags = ["Products"]
    PokemonAPI.searchPokemonCard(query.query,query.pagenumber).then((cards: Array<Card>) => {console.log(cards)
        res.send(cards);
    })
})

productsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
    // #swagger.summary = 'Get card details'
    // #swagger.tags = ["Products"]
    PokemonAPI.getPokemonCard(req.params.id).then((result: Card) => {
        res.send(result);
    })
})
