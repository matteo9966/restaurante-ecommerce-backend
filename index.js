require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connect = require('./db/connect');
const authRouter = require('./routes/authentication-route');
const productRouter = require('./routes/products-route')
const errorHandlerM = require('./middleware/error-handler-middleware');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//configuro cloudinary

var cloudinary = require('cloudinary').v2 //ho messo cloudinary qui solo per poterlo configurare.
cloudinary.config({ 
    cloud_name: 'matteocloudimages', 
    api_key: '998984457198582', 
    api_secret: 'k4Yvt4p9OUBL2H_qulwuhwjDZLY' ,
    secure: true
  });



//middleware 


app.use(express.json());
app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));
app.post('/api/v1/dummy',(req,res)=>{console.log("ho ricevuto un post con: ",req.body);res.json({"messaggio":"TUTTO é STATO ESEGUITO"})});

app.use('/api/v1',authRouter); // questo è il primo route localhost:3000/api/v1/register
app.use('/api/v1',productRouter);
app.use(errorHandlerM);


const port = process.env.PORT || 3000

async function start(){
    try{
        await connect(process.env.CONNECTION);
        app.listen(3001,()=>console.log("ASCOLTO SULLA PORTA 3001"));

    }catch(err){
        console.log(err);
        process.exit(1);
    }

}



start();


//questa è la logica per creare e confrontare una password in modo sincrono. io provo a usare questo metodo
// const bcrypt = require('bcryptjs');


// const salt = bcrypt.genSaltSync(2);
// const hash = bcrypt.hashSync("password",salt);

// const stessapass = bcrypt.compareSync("passwo-rd", hash); 

// console.log(stessapass);
