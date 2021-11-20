const jwt = require('jsonwebtoken');
const BadRequestError = require('../Errors/BadRequestError')

const OrdinaryUserAuth = async (req,res,next)=>{
    const authorization = req.headers.authorization;
    console.log(authorization); //fino a qui funziona ora devo fare verifica utente poi verifica admin prima di andare su questa pagina.
    
    if(!authorization){
        throw new BadRequestError('Autenticazione non valida!');
    }
    if(authorization.startsWith('Bearer'))
    {
        const token =authorization.split(' ')[1]; // il token arriva ora devo verificarlo se è verificato passo 
        console.log(token);
        //verificare il token
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload) // nel payload c'è isAdmin e userId questo l'ho settato nel momento del login 
        req.isAdmin = payload.isAdmin;
        req.userId=payload.userId;
        next();

    }else{
        throw new  BadRequestError('Token non valido!');
    }
    
    

}

const AdminUserAuth = (req,res,next)=>{
    if(req.isAdmin){
        next()
    }
    else {
        throw new BadRequestError('Non Sei un ADMIN torna alla HOME!!')
    }
}

module.exports ={ OrdinaryUserAuth,AdminUserAuth};