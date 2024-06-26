import {Card} from "../Models/CardModel"


export class PokemonAPI{
    static readonly apiURL : string = "https://api.pokemontcg.io/v2";
    static readonly token : string = process.env.API_KEY as string;
    static async getPokemonCard(cardid : string) : Promise<Card>  {
        try {
            const response = await fetch(
                PokemonAPI.apiURL + '/cards/'+cardid,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + PokemonAPI.token,
                    }
                }

            );
            const json = await response.json();
            //console.log(json);
            if(!response.ok){
                if(response.status === 404){
                    throw new Error ("card not found");
                }else if(response.status === 429){
                    throw new Error ("Rate exceeded")
                }else{
                    throw new Error ("Fatal error " + response.body);
                }
            }
            console.log("no errors present")
            return json.data as Card
        } catch (error) {
            console.log("fatal error: " + error)
            return Promise.reject("Couldn't get Card: " + error)
        }
    };

    static async searchPokemonCard(se: string, pageNumber: number) : Promise<Array<Card>> {
        try {
            const response = await fetch(
                PokemonAPI.apiURL + '/cards?q=name:' + se+`*&page=${pageNumber}&pageSize=10`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + PokemonAPI.token,
                    }
                }
            );
            const json = await response.json();
            //console.log(json);
            if(!response.ok){
                if(response.status === 404){
                    throw new Error ("card not found");
                }else if(response.status === 429){
                    throw new Error ("Rate exceeded")
                }
                else{
                    throw new Error ("Fatal error: " + response.body);
                }
            }
            return json.data
        } catch (error) {
            console.log("error")
            return Promise.reject("Couldn't get Card: " + error)

        }
    }
    static async listOfCards(pagenumber: number) : Promise<Array<Card>> {
        try {
            const response = await fetch(
                PokemonAPI.apiURL + `/cards?page=${pagenumber}&pageSize=10`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + PokemonAPI.token,
                        
                    }
                }
            );
            const json = await response.json();
            //console.log(json);
            if(!response.ok){
                if(response.status === 404){
                    throw new Error ("card not found");
                }else if(response.status === 429){
                    throw new Error ("Rate exceeded")
                }
                else{
                    throw new Error ("Fatal error" + response.body);
                }
            }
            return json.data
        } catch (error) {
            return Promise.reject("Couldn't get Card " + error)

        }
    }
    static async getPokemonCardsFromIds(cardIds: Array<string>) : Promise<Array<Card>>{
        try {
             const result : Array<Card> = []


             for await (const id of cardIds) {
                 const card : Card = await PokemonAPI.getPokemonCard(id)
                 result.push(card)
             }
            return result
        } catch (error) {
            return Promise.reject("Couldn't get Cards " + error)

        }

    }
}
