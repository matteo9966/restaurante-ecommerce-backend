const BadRequestError = require("../Errors/BadRequestError");
const NotFoundError = require("../Errors/NotFoundError");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const result = await Product.find({});
  if (!result) {
    throw new NotFoundError("nessun prodotto disponibile!!");
  }
  res.status(200).json({ products: result });
};

const createSingleProduct = async (req, res) => {
  const { price, name, description, imglink, tags, ingredients } = req.body; 
  //il middleware app.json() converte il body in un oggetto quindi posso estrarre i dati prima di crearlo
  if (price && name && description) {
    //questi sono i dati necessari di cui ho bisogno per ora
    const product = await Product.create({
      price: price,
      name: name,
      description: description,
      imglink: imglink || "",
      tags: tags || [],
      ingredients: ingredients || [],
    });
    //tutto valido, posso fare il create!
    console.log('----|---------------|-------------|---')
      console.log(product);
      res.status(200).json(product);

  } else {
    throw new BadRequestError("valori inseriti non validi");
  }

  // const result = await Product.create(req.body);
};

module.exports = { getAllProducts, createSingleProduct };
