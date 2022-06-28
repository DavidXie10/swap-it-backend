const Joi = require('joi');

exports.deleteSingleUrlSchema = Joi.object({
    urls: Joi.string().uri().required().error(() => new Error('El campo urls es inválido o está vacío. Debe ser una hilera de caracteres.')),
});

exports.deleteMultipleUrlSchema = Joi.object({
    urls: Joi.array().min(2).max(5).items(Joi.string().uri().required()).error(() => new Error('El campo urls debe ser un arreglo de hileras de caracteres, con un mínimo de 2 y un máximo de 3, y el formato de las hileras debe ser una url.')),
});