import express, { Express, Request, Response } from "express";
import {PokemonAPI} from "../PokemonAPI/PokemonCards";
import {Card} from "../Models/CardModel";

export const baseRouter = express.Router();




baseRouter.get('/test/', (req : Request, res : Response) =>{
    console.log("KEY: " + process.env.API_KEY)
    res.send(process.env.API_KEY);
});


baseRouter.get('/card/', (req : Request, res : Response) =>{
    PokemonAPI.getPokemonCard('xy1-1').then((result : Card) => {
        res.send(result);
    })
});