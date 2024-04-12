import {DataTypes, Model, Sequelize} from "sequelize";
import {Order} from "./OrderModel";

export class Address extends Model {
}

export function initAddress(sequelize: Sequelize): void {
    Address.init({
        addressId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        city : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Address'
    });
}