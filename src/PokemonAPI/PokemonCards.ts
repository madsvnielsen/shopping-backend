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
            //console.log(outJSON);
            return json.data as Card
        } catch (error) {
            return Promise.reject("Couldn't get Card")

        }
    };
}