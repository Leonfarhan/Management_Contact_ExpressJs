import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from './user.model.js';

const Contact = sequelize.define(
    "Contact",
    {
        contactId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.firstName + " " + this.lastName;
            },
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            },
        },
        phone: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "contact",
        underscored: true,
    }
);

User.hasMany(Contact, {
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

Contact.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

sequelize.sync();

export default Contact;