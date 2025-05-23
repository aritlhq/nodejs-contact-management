import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validations/user-validation.js"
import { validate } from "../validations/validation.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { prisma } from "../applications/database.js";
import { v4 as uuidv4 } from 'uuid';

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

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prisma.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(400, "Username or password is wrong!");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
        throw new ResponseError(400, "Username or password is wrong!");
    }

    const token = uuidv4();
    return prisma.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
        }
    });

    if (!user) {
        throw new ResponseError(404, "User not found!");
    }

    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser !== 1) {
        throw new ResponseError(404, "User not found!");
    }

    const data = {}
    if (user.name) {
        data.name = user.name;
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prisma.user.update({
        data: data,
        where: {
            username: user.username
        },
        select: {
            username: true,
            name: true,
        }
    });


}

export default {
    register,
    login,
    get,
    update
};