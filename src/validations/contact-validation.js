import Joi from "joi";

const createContactValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().max(100).required(),
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).optional(),
})

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation
}