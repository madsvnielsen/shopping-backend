import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './ApiDocs/swagger.json';
import {baseRouter} from "./routes/BaseRouter";
import {ShoppingDb} from "./database/ShoppingDb"
import cors from "cors"
import fs from 'fs'
import http from 'http'
import https from 'https'


export const app : Express = express();
app.use(cors())
ShoppingDb.initialize();





//export const server = app.listen(3000, () => console.log('Shopping backend is listening on port 3000.'));


app.use("/", baseRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/dbtest", (req : Request, res : Response) => {

    // #swagger.summary = 'Test db authentication'
    // #swagger.tags = ["Test"]
    // #swagger.description = 'Shows if the db is authentication'
    ShoppingDb.sequelize.authenticate().then(() => {
          res.send('Connection has been established successfully.')
    }).catch((error: Error) => {
        res.send('Unable to connect to the database: ' + error);
    })

})

var httpServer = http.createServer(app);
httpServer.listen(3000);