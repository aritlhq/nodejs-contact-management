import { prisma } from "../applications/database.js";
import { createContactValidation } from "../validations/contact-validation.js"
import { validate } from "../validations/validation.js"

const create = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prisma.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

export default {
    create
}