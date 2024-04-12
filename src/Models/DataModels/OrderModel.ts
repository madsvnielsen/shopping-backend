import {Sequelize, DataTypes, Model} from "sequelize"
import { Address } from "./AddressModel"
import {Payment} from "./PaymentModel";



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

    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyVAT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Order.belongsTo(Address, {foreignKey: 'deliveryAddress'})
    Order.belongsTo(Address, {foreignKey: 'billingAddress'})
    Order.belongsTo(Payment, {foreignKey: 'payment'})


}
