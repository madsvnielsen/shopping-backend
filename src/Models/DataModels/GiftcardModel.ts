import {Sequelize, DataTypes, Model} from "sequelize"

export class giftcard extends Model {}

export function initGiftCard(sequelize : Sequelize) : void {
    giftcard.init({
      // Model attributes are defined here
      giftcardId: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
      },
      amount : {
          type: DataTypes.DOUBLE,
          allowNull: false
      }
    }, {
      sequelize
    })

}
