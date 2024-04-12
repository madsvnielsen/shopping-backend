import {Sequelize, Dialect} from "sequelize"
import {initOrder, Order} from "../Models/DataModels/OrderModel"
import {Address, initAddress} from "../Models/DataModels/AddressModel";


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
            initAddress(ShoppingDb.sequelize)
            Order.hasOne(Address, { foreignKey: "addressId" });
            //Address.belongsTo(Order);
            ShoppingDb.sequelize.sync({force: true})


        }).catch((error) => {
            console.error('Unable to connect to the database:',error);
        })

    };

}
