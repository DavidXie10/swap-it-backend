const { number } = require('joi');
const Joi = require('joi');

exports.loginSchema = Joi.object({
    email: Joi.string().email().required().error(() => new Error("El email debe tener el formato de un correo electrónico y es requerido.")),
    password: Joi.string().min(8).alphanum().required().error(() => new Error("La contraseña debe tener números y letras y al menos 8 dígitos y es requerida.")),
});

exports.updateUserSchema = Joi.object({
    fullName: Joi.string().required().error(() => new Error('El nombre es un campo obligatorio.')),
    email: Joi.string().email().required().error(() => new Error('El email es un campo obligatorio y debe tener el formato de un correo electrónico.')),
    phoneNumber: Joi.string().required().error(() => new Error('El número de teléfono es un campo obligatorio.')),
    location: Joi.number().integer().required().error(() => new Error('La ubicación es un campo obligatorio y debe ser un número entero.')),
    photoUrl: Joi.string().uri().required().error(() => new Error('La url de la foto es un campo obligatorio y debe tener el formato de un url.'))
});
