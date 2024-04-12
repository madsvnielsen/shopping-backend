import {Sequelize, DataTypes, Model} from "sequelize"
import {Order} from "./OrderModel"


export class Address extends Model {}

export function initAddress(sequelize : Sequelize) : void {
    Address.init({
      // Model attributes are defined here
      streetName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
        },

        zipCode: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: false
      }
    }, {
      sequelize
    })

    


}
