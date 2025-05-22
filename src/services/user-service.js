import { registerUserValidation } from "../validations/user-validation.js"
import { validate } from "../validations/validation.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { prisma } from "../applications/database.js";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prisma.user.create({
        data: user,
        select: {
            username: true,
            name: true,
            password: true
        }
    });

}

export default { register };