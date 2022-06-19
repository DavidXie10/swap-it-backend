const Joi = require('joi');

exports.loginSchema = Joi.object({
    email: Joi.string().email().required().error(() => new Error("El email debe tener el formato de un correo electrónico.")),
    password: Joi.string().min(8).alphanum().required().error(() => new Error("La contraseña debe tener números y letras y al menos 8 dígitos.")),
})