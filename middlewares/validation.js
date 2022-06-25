exports.validateSchema = (validSchema) => {
    return (req, res, next) => {
        const userPayload = req.body;
        const validationResult = validSchema.validate(userPayload);
        if(validationResult.error){
            res.status(422).json({
                body: userPayload,
                error: validationResult.error.message,
            });
        }else{
            next();
        }
    }
}