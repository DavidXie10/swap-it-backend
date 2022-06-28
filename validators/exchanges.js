const Joi = require('joi');

exports.exchangeSchema = Joi.object({
    userToId: Joi.number().integer().positive().required().error(() => new Error('El id del usuario dueño del item deseado debe ser un número entero positivo y es un campo obligatorio.')),
    proposedItemsNames: Joi.string().required().error(() => new Error('Los items propuestos son obligatorios.')),
    receiveItemName: Joi.string().required().error(() => new Error('El item deseado es un campo obligatorio.')),
});
