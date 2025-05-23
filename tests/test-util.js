import { prisma } from "../src/applications/database.js"
import bcrypt from "bcrypt"

export const removeTestUser = async () => {
    await prisma.user.deleteMany({
        where: {
            username: "aristwn"
        }
    });
}

export const createTestUser = async () => {
    await prisma.user.create({
        data: {
            username: "aristwn",
            password: await bcrypt.hash("rahasia", 10),
            name: "Ari Setiawan",
            token: "123456789"
        }
    })
}

export const getTestUser = async () => {
    return prisma.user.findUnique({
        where: {
            username: "aristwn"
        }
    });
}