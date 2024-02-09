import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './ApiDocs/swagger.json';
import {baseRouter} from "./routes/BaseRouter";


const app : Express = express();


app.listen(3000, () => console.log('Shopping backend is listening on port 3000.'));


app.use("/", baseRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

