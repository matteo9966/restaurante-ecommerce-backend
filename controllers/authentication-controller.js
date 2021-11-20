//authentication
//login
const User = require('../models/User')
const BadRequestError = require('../Errors/BadRequestError')
const jwt = require('jsonwebtoken')
const register = async (req,res)=>{
     
    const {name,password,email} = req.body; // nel body del request mi immagino un oggetto con questi tre campi.
    // lascio fare a mongoose il controllo dei valori:
    const user = await User.create({name,email,password});
     console.log("user",user)
    const token = user.generateJWT();
	
	var decoded = jwt.decode(token, {complete: true});
    console.log("il decoded header:: ",decoded.header);
    console.log("il decoded payload:: ",decoded.payload)
	
    res.status(201).json({user_data:user , token:token,expires_in:decoded.payload.exp});

}


const login = async (req,res)=> { 
// console.log("il body ricevuto da axios è",req.body)
// res.status(400).json({error:"questo è l'errore che il server ti sta mandando!!!"});
    const {password,email} = req.body;
    if(!password || !email){
        throw new BadRequestError("Email o password non valida!! inserire valori validi");
    }
    const user = await User.findOne({email});
    console.log(user);


    const isValid = user.controlPassword(password);

    console.log(
        "is valid: ", isValid
    )
  
    if(isValid){
		//se è valido basta dire che è valido senza generare un token
        const token = user.generateJWT();
			var decoded = jwt.decode(token, {complete: true});
    console.log("il decoded header:: ",decoded.header);
    console.log("il decoded payload:: ",decoded.payload)
		
        res.status(200).json({user_data:user , token:token,expires_in:decoded.payload.exp})
    }else{
        throw new Error("PASSWORD SBAGLIATA")

    }
   

}

//fino a qui è tutto funzionante. Ora che ho il token ne creo unb o

module.exports = {register,login}