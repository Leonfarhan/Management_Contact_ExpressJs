import sequelize from '../config/database.js';
import {DataTypes} from 'sequelize';
import { encrypt } from '../utils/bcrypt.js';

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("password", encrypt(value));
            },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expireTime: {
            type: DataTypes.DATE,
            set(value) {
                if (value !== null) {
                    const date = new Date(value);
                    date.setHours(date.getHours() + 1);
                    this.setDataValue("expireTime", date);
                } else {
                    this.setDataValue("expireTime", null);
                }
            },
        },
    },
);

sequelize.sync();

export default User;