const Joi = require('joi');

exports.deleteUrlsSchema = Joi.object({
    urls: Joi.array().min(1).max(3).items(Joi.string().uri().required()).error(() => new Error('El campo urls debe ser un arreglo de hileras de caracteres, con un mínimo de 1 y un máximo de 3, y el formato de las hileras debe ser una url.')),
});