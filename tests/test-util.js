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

export const removeAllTestContact = async () => {
    await prisma.contact.deleteMany({
        where: {
            username: "aristwn"
        }
    });
}

export const createTestContact = async () => {
    await prisma.contact.create({
        data: {
            username: "aristwn",
            first_name: "Ari",
            last_name: "Setiawan",
            email: "aristwn@stwn.com",
            phone: "08123456789"
        }
    });
}

export const getTestContact = async () => {
    return prisma.contact.findFirst({
        where: {
            username: "aristwn"
        }
    });
}