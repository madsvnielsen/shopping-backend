import express, { Express, Request, Response } from "express";


const app : Express = express();

let a : Number  = 2
let b : string = "2"

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
app.get('/', (req : Request, res : Response) => {
  res.send('Successful response!!');
});


app.get('/test', (req : Request, res : Response) => {
    res.send("<h1>Hej</h1>")
})
