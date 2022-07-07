exports.uploadFiles = (req, res) => {
    // #swagger.tags = ['Uploads']
    /* 
    #swagger.description = 'Upload a minimum of 1 image and a maximum of 3 and get the urls, types and sizes of the uploaded images.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['multFiles'] = {
        in: 'formData',
        type: 'array',
        required: true,
        description: 'Image files to be uploaded',
        collectionFormat: 'multi',
        items: {type: 'file'},
        schema: { $ref: '#/definitions/UploadFiles' }
    } */
    /* #swagger.responses[200] = {
        description: 'Successfully uploaded the provided images. It returns an array of file attributes',
        schema: {
            message: "¡Archivos cargados exitosamente!",
            uploadedFiles: [
                {
                    "url": "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg",
                    "type": "image/jpeg",
                    "size": 34445
                },
            ]
        }
    } 
    #swagger.responses[400] = {
        description: 'Bad request. An image file is nedded',
        schema: {
            message: 'Se necesita subir al menos una imagen en formato .png, .jpg o .jpeg'
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            error: true,
            message: 'El usuario no está autenticado',
        }
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al subir las imágenes. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */
    try {
        const files = req.files;
        
        if(files.length > 0){
            let uploadedFiles = [];
        
            files.map(file => {
                uploadedFiles.push({
                    url: file.location,
                    type: file.mimetype,
                    size: file.size,
                });
            });
        
            res.status(200).json({
                message: '¡Archivos cargados exitosamente!',
                uploadedFiles: uploadedFiles,    
            });
        }else{
            res.status(400).json({ message: 'Se necesita subir al menos una imagen en formato .png, .jpg o .jpeg' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error al subir las imágenes. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error,    
        });   
    }
};

exports.deleteUrls = (req, res) => {
    // #swagger.tags = ['Uploads']
    /*  
    #swagger.description = 'Delete uploaded images by passing their urls.'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The array of urls to be deleted',
        schema: { $ref: '#/definitions/DeleteUrls' }
    } */
    /* #swagger.responses[200] = {
        description: 'Successfully deleted the provided images urls',
        schema: {
            message: "¡Archivos eliminados exitosamente!",
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            error: true,
            message: 'El usuario no está autenticado',
        }
    } 
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            body: {
                "urls": [
                    "Foto imaginaria"
                ]
            },
            message: "El campo urls debe ser un arreglo de hileras de caracteres, con un mínimo de 1 y un máximo de 3, y el formato de las hileras debe ser una url."
        }
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al eliminar las imágenes. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */

    // This function is to simulate the validation of the existence of an url
    const urlExists = (url) => true;

    // This function is to simulate the deletion of the url image in the S3 storage
    const deleteInS3 = (urls) => true;

    try {
        const userPayload = req.body;
        const urls = userPayload.urls;
        const arrayLength = urls.length;
        
        urls.forEach(url => {
            if(urlExists(url)){
                deleteInS3(url);
            }
        });

        res.status(200).json({
            message: `¡Archivo${arrayLength > 1 ? 's' : ''} eliminado${arrayLength > 1 ? 's' : ''} exitosamente!`,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error al eliminar las imágenes. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error,    
        });   
    }
};