//When you upload a file, the file will be accessible from req.files
/* 
req.files.foo.name: "car.jpg"
req.files.foo.mv: A function to move the file elsewhere on your server. Can take a callback or return a promise.
req.files.foo.mimetype: The mimetype of your file
req.files.foo.data: A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true.
req.files.foo.tempFilePath: A path to the temporary file in case useTempFiles option was set to true.
req.files.foo.truncated: A boolean that represents if the file is over the size limit
req.files.foo.size: Uploaded size in bytes
req.files.foo.md5: MD5 checksum of the uploaded file */

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const BadRequestError = require("../Errors/BadRequestError");

//funzione per verificare immagine e se è presente un errore.
//questa funzione restituisce un oggetto con
const verifyFile = (file, maxsize) => {
  let isValid = true;
  let errorMsg = "";
  if (!file) {
    return { isValid: false, errorMsg: "inserire file valido" };
  }
  if (!file.mimetype.toString().startsWith("image")) {
    return { isValid: false, errorMsg: "scegliere un immagine!!" };
  }
  if (file.size > maxsize) {
    return {
      isValid: false,
      errorMsg: `massima dimensione del file supportata: ${maxsize}`,
    };
  }
  return { isValid, errorMsg };
};

const uploadProductImage = async (req, res) => {
  //se per adesso mi restituisce il file
  const file = req.files.immagine;
  const { isValid, errorMsg } = verifyFile(file, 1024 * 1024 * 10); //un file da 10 mb è il massimo supportato;

  if (!isValid) {
    throw new BadRequestError(errorMsg);
  }

  const filePath = file.tempFilePath;
  const result = await cloudinary.uploader.upload(filePath, {
    // public_id: "immagine_"+Math.random().toString(), //uso public_id per dare un nome al file. salvo il nome del file in una proprietà del request
    use_filename: true, // uso questo per avere un filename quasi sicuramente univoco!
    folder: "restaurantpics",
  });
  console.log(result);

  const secure_url = result.secure_url;
  fs.unlinkSync(filePath); //rimuovo il file temp una volta ricevuto l'url dell immagine caricata sul database

  res.status(200).json({ secure_url: secure_url });
};

module.exports = uploadProductImage;
