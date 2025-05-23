import sequelize from '../config/database.js';
import User from '../models/user.model.js';
import { dataValid } from '../validations/data.validation.js';
import { sendMail } from "../utils/send-mail.js";

const setUser = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        name: "required",
        email: "required,isEmail",
        password: "required,isStrongPassword",
    };

    try {
        // const user = req.body;
        const user = await dataValid(valid, req.body);
        if (user.message.length > 0) {
            return res.status(400).json({
                errors: user.message,
                message: "Register Field",
                data: null,
            });
        }

        const userExists = await User.findAll({
            where: {
                email: user.data.email,
            },
        });

        if (userExists.length > 0 && userExists[0].isActive) {
            return res.status(400).json({
                errors: ["Email already activated"],
                message: "Register Field",
                data: null,
            });
        } else if (
            userExists.length > 0 &&
            !userExists[0].isActive &&
            Date.parse(userExists[0].expireTime) > new Date()
        ) {
            return res.status(400).json({
                errors: ["Email already registered, please check your email"],
                message: "Register Field",
                data: null,
            });
        } else {
            await User.destroy(
                {
                    where: {
                        email: user.data.email,
                    },
                },
                {
                    transaction: t,
                }
            );
        }

        const newUser = await User.create(
            {
                ...user.data,
                expireTime: new Date(),
            },
            {
                transaction: t,
            }
        );

        const result = await sendMail(newUser.email, newUser.userId);
        if (!result) {
            await t.rollback();
            return res.status(500).json({
                errors: ["Send email failed"],
                message: "Register Field",
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: "User created, please check your email",
                data: {
                    userId: newUser.userId,
                    name: newUser.name,
                    email: newUser.email,
                    expireTime: newUser.expireTime,
                },
            });
        }
    } catch (error) {
        await t.rollback();
        next(new Error("controllers/user.controller.js:setUser - " + error.message));
    }
};

export { setUser };