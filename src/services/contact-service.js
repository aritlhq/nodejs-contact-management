import { prisma } from "../applications/database.js";
import { ResponseError } from "../error/response-error.js";
import { createContactValidation, getContactValidation, updateContactValidation } from "../validations/contact-validation.js"
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

const get = async (user, contactId) => {
    contactId  = validate(getContactValidation, contactId);

    const contact = await prisma.contact.findFirst({
        where: {
            id: contactId,
            username: user.username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if(!contact) {
        throw new ResponseError(404, "Contact not found");
    }

    return contact;
}

const update = async (user, request) => {
    const contact = validate(updateContactValidation, request);

    const countContact = await prisma.contact.count({
        where: {
            id: contact.id,
            username: user.username
        },
    });

    if(countContact !== 1) {
        throw new ResponseError(404, "Contact not found");
    }

    return prisma.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        },
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
    create,
    get,
    update
}