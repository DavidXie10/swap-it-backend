const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Swap It - API',
        description: 'This is the API of the Web Application Development course project (CI-0137) of the Swap It application.',
        version: "1.0.0",
        contact: {
            name: "Swap it", 
            email: "swapitecci@gmail.com", 
            url: "https://swap-it-cr.netlify.com/", 
        },      
    },
    host: 'localhost:8000',
    schemes: ['http', 'https'],
    definitions: {
        LoginUser: {
            email: "john@correo.com",
            password: "password123",      
        },
        UpdateUser:{
            fullName: "John Doe",
            email: "john@correo.com",
            location: 1,
            phoneNumber: "86808521",
            photoUrl: "https://ci0137.s3.amazonaws.com/swap-it/uploads/anonymous_profile_photo.png"
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
        },
        ExchangeItems: {
            "userToId": 1,
            "proposedItemsNames": "Bicicletas",
            "receiveItemName": "Computadora"            
        },
        UploadFiles: {
            files: [
                {
                    file: "formData"
                }
            ],
        },
        DeleteUrls: {
            "urls": [
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.png",
                "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename2.png"
            ]
        },
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js');
});