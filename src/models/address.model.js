import sequelize from '../config/database.js';
import Contact from './contact.model.js';
import { DataTypes } from 'sequelize';

const Address = sequelize.define(
    "Address",
    {
        addressId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        addressType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        zipCode: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "address",
        underscored: true,
    }
);

Contact.hasMany(Address, {
    foreignKey: "contactId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

Address.belongsTo(Contact, {
    foreignKey: "contactId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

sequelize.sync();

export default Address;