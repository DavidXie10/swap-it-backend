exports.uploadFiles = (req, res) => {
    const files = req.files;
    
    if(files.length > 0){
        let urls = [];
    
        files.map(file => {
            urls.push(file.location);
        });
    
        res.status(200).send({
            message: "Uploaded files!",
            urls: urls,    
        });
    }else{
        res.status(500).send({
            error: true,
            message: 'Internal Server Error',    
        });
    }
};