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
      StreetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyVAT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethod: {
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

}
