import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './ApiDocs/swagger.json';
import {baseRouter} from "./routes/BaseRouter";
import {Sequelize} from "sequelize"
import {ShoppingDb} from "./database/ShoppingDb"


const app : Express = express();


ShoppingDb.initialize();

app.listen(3000, () => console.log('Shopping backend is listening on port 3000.'));


app.use("/", baseRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/dbtest", (req : Request, res : Response) => {

    // #swagger.summary = 'Test db autohentication'
    // #swagger.tags = ["Test"]
    // #swagger.description = 'Shows if the db is authentication'
    ShoppingDb.sequelize.authenticate().then(() => {
          res.send('Connection has been established successfully.')
    }).catch((error) => {
        res.send('Unable to connect to the database: ' + error);
    })



})
