import validator from "validator";
import { isExists, sanitization } from "./sanitization.js";

const dataValid = async (valid, dt) => {
    const errors = [];
    const data = await sanitization(dt);

    for (const [key, value] of Object.entries(data)) {
        if (!isExists(valid[key])) continue;
        const rules = valid[key].split(",");
        for (const rule of rules) {
            switch (rule) {
                case "required":
                    if (isExists(data[key]) && validator.isEmpty(data[key])) {
                        errors.push(`${key} is required`);
                    }
                    break;
                case "isEmail":
                    if (isExists(data[key]) && !validator.isEmail(data[key])) {
                        errors.push(`${key} is invalid email`);
                    }
                    break;
                case "isStrongPassword":
                    if (isExists(data[key]) && !validator.isStrongPassword(data[key])) {
                        errors.push(
                            `${key} must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol`
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return { message: errors, data };
};

export { dataValid };