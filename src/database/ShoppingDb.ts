import {Sequelize, Dialect} from "sequelize"
import {initOrder}  from "../Models/DataModels/OrderModel"
import {initAddress}  from "../Models/DataModels/AddressModel"
import {initPayment} from "../Models/DataModels/PaymentModel";

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
            
            initAddress(ShoppingDb.sequelize)
            initPayment(ShoppingDb.sequelize)
            initOrder(ShoppingDb.sequelize)
            ShoppingDb.sequelize.sync({alter: true})


        }).catch((error) => {
            console.error('Unable to connect to the database:',error);
        })

    };
}
