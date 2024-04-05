import {Sequelize, Dialect} from "sequelize"
import {initOrder}  from "../Models/DataModels/OrderModel"
import { initGiftCard } from "Models/DataModels/GiftcardModel";

export class ShoppingDb{
    static readonly sequelize = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string, {
      host: process.env.DB_HOST as string,
      dialect: process.env.DB_DIALECT as Dialect,
      logging : false
  });


    static async initialize() {
        ShoppingDb.sequelize.authenticate().then(() => {
            initOrder(ShoppingDb.sequelize)
            initGiftCard(ShoppingDb.sequelize)
            ShoppingDb.sequelize.sync({alter: true})


        }).catch((error) => {
            console.error('Unable to connect to the database:',error);
        })

    };





}
