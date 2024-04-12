import {Sequelize, DataTypes, Model} from "sequelize"
import {Order} from "./OrderModel"

enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    MOBILE_PAY = 'mobile_pay',
    GIFT_CARD = 'gift_card',
    INVOICE = 'invoice'
}

export class Payment extends Model {}

export function initPayment(sequelize : Sequelize) : void {
    Payment.init({
        // Model attributes are defined here
        paymentMethod: {
            type: DataTypes.ENUM(...Object.values(PaymentMethod)),
            allowNull: false
        },
        cardNum: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cvv: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNum: {
            type: DataTypes.STRING,
            allowNull: true
        },
        giftCardAmount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        giftCardNum: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyVAT: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        sequelize
    })

}

export { PaymentMethod };
