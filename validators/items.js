const Joi = require('joi');

exports.loginSchema = Joi.object({
    email: Joi.string().email().required().error(() => new Error("El email debe tener el formato de un correo electrónico.")),
    password: Joi.string().min(8).alphanum().required().error(() => new Error("La contraseña debe tener números y letras y al menos 8 dígitos.")),
})

exports.itemSchema = Joi.object({
    name: Joi.string().required().error(() => new Error('El nombre del item es un campo obligatorio y debe ser una hilera de caracteres.')),
    wishlist: Joi.string().required().error(() => new Error('Debe especificar los items que desea que le ofrezcan y debe ser una hilera de caracteres.')),
    acquisitionDate: Joi.date().max('now').required().error(() => new Error('Debe especificar la fecha de adquisición del item utilizando el formato AAAA-MM-DD (por ejemplo, 2022-02-04). Debe ser una hilera de caracteres y no puede ser una fecha futura.')),
    description: Joi.string().required().error(() => new Error('Debe especificar la descripción del item y debe ser una hilera de caracteres.')),
    itemState: Joi.number().integer().strict().min(1).max(2).required().error(() => new Error('Debe especificar el estado del item con un número: Nuevo[1], Usado[2].')),
    category: Joi.number().integer().strict().positive().min(1).max(10).required().error(() => new Error('Debe especificar la categoría a la que pertenece el item con un número: Deportes [1], Electrónica[2], Hogar[3], Libros[4], Oficina[5], Películas[6], Ropa[7], Videojuegos[8], Vehículos[9], Otros[10].')),
    location: Joi.number().strict().integer().positive().required().error(() => new Error('Debe especificar la provincia en la que se encuentra con un número: San José[1], Alajuela[2], Cartago[3], Heredia[4], Guanacaste[5], Puntarenas[6], Limón[7].')),
    photoUrls: Joi.array().min(1).max(3).items(Joi.string().uri().required()).error(() => new Error('El campo photoUrls debe ser un arreglo de hileras de caracteres, con un mínimo de 1 y un máximo de 3, y el formato de las hileras debe ser una url.')),
});