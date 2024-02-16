import {Sequelize} from "sequelize"
export class ShoppingDb{
    static readonly sequelize = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string, {
      host: process.env.DB_HOST as string,
      dialect: 'mariadb'
    });


    static async initialize() {
        ShoppingDb.sequelize.authenticate().then(() => {
              console.log('Connection has been established successfully.')
        }).catch((error) => {
            console.error('Unable to connect to the database:',error);
        })

    };





}
