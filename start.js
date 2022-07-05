const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Swap It - API',
        description: 'Este es el API del proyecto del curso de Desarrollo de Aplicaciones Web (CI-0137) de la aplicación Swap It.',
        version: "1.0.0",
        contact: {
            name: "Swap it team", 
            email: "swapitecci@gmail.com", 
            url: "https://github.com/DavidXie10/swap-it-ui", // TODO: change to netlify url
        },      
    },
    host: 'https://swap-it-api.herokuapp.com',
    schemes: ['http', 'https'],
    definitions: {
        LoginUser: {
            email: "john@correo.com",
            password: "password123",      
        },
        DeleteUrls: {
            "urls": [
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.png",
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename2.png"
            ]
        },
        ExchangeItems: {
            "userToId": 1,
            "proposedItemsNames": "Bicicletas",
            "receiveItemName": "Computadora"            
        },
        // TODO: check if this is correct
        UploadFiles: {
            files: [
                {
                    file: "formData"
                }
            ],
        },
        CreateItem: {
            name: "Cartucho de tinta HP 63",
            location: 1,
            acquisitionDate: "2021-12-30",
            description: "Tengo este cartucho de tinta negra HP 63 que no uso porque cambié de impresora",
            wishlist: "Cartucho de tinta negra o de algún color HP 65",
            itemState: 1,
            category: 2,
            photoUrls: ["https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg"]            
        },
        EditItem: {
            name: "Cartucho de tinta HP 63",
            location: 1,
            acquisitionDate: "2021-12-30",
            description: "Este cartucho de tinta negra HP 63 es único en el mundo. No busques más e intercambiemos",
            wishlist: "Cartucho de tinta negra o de algún color HP 65",
            itemState: 1,
            category: 2,
            photoUrls: [
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg",
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename2.jpg"
            ]
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js');
});
