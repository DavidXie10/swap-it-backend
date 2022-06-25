exports.uploadFiles = (req, res) => {
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
        res.status(500).json({
            message: 'Error interno del servidor',    
        });
    }
};

exports.deleteUrls = (req, res) => {
    // This function is to simulate the deletion of the url image in the S3 storage
    const deleteInS3 = (urls) => true;

    try {
        const userPayload = req.body;
        const urls = userPayload.urls;
        const result = deleteInS3(urls);        
        if(result){
            res.status(200).json({
                message: `Archivos eliminados exitosamente`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor ' + error,    
        });   
    }
};