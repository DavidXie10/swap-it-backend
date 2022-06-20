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
    
        res.status(200).send({
            message: "Uploaded files!",
            uploadedFiles: uploadedFiles,    
        });
    }else{
        res.status(500).send({
            error: true,
            message: 'Internal Server Error',    
        });
    }
};