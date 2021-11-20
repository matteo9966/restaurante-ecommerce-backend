const {StatusCodes} = require('http-status-codes');
function errorHandlerMiddleware(err, req, res, next) {
    let errorMessage = err.message || "Errore del server "
    let code=400;
    if(err.name==="ValidationError"){
        console.log(err.name)
        errorMessage = err.message;
        code=StatusCodes.BAD_REQUEST;
        
    }
    if(err.code){
        if(err.code===11000){
         errorMessage = `valore già presente sul database: ${Object.keys(err.keyValue).concat(' ')}`

        }
    }
    

    res.status(code).json({errorMSG:errorMessage,completeError:err});
    
}

module.exports = errorHandlerMiddleware;