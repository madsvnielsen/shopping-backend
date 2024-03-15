import {Sequelize, DataTypes, Model} from "sequelize"



export class Order extends Model {}

export function initOrder(sequelize : Sequelize) : void {
    Order.init({
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
        },
        orderNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
      },
      itemIds: {
          type: DataTypes.JSON,
          allowNull: false,

      },
      totalPrice : {
          type: DataTypes.DOUBLE,
          allowNull: false
      }

    }, {
      sequelize
    })

}
