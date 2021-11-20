require('dotenv').config();
const connect = require('./db/connect');
const Product = require("./models/Product");

// {
//     _id:String,
//     name:String,
//     price:Number,
//     description:String,
//     imglink:String,
//     ingredients:{ type: [String]},
//     tags:{
//         type:[String],
//         enum:validTagsForFood,
//     }

const product_list = [
  {
    name: "Pizza Margherita",
    price: 5,
    description: "pizza lievitata 72 ore",
    ingredients: ["pomodoro", "mozzarella"],
    imglink:
      "http://www.nicolasalvatore.com/web/wp-content/uploads/2017/05/Pizza_Margherita_accademia_Barilla_1.jpg",
    tags: ["pizza"],
  },
  {
    name: "Pizza Diavola",
    price: 6.5,
    description: "pizza lievitata 72 ore molto piccante",
    ingredients: ["pomodoro", "mozzarella", "salametto"],
    imglink:
      "https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/03/d2.jpg",
    tags: ["pizza"],
  },
  {
    name: "Pizza Capricciosa",
    price: 7.5,
    description: "pizza lievitata 72 ore",
    ingredients: ["pomodoro", "mozzarella", "carciofi"],
    imglink:
      "https://primochef.it/wp-content/uploads/2018/05/SH_pizza_capricciosa.jpg",
    tags: ["pizza"],
  },
  {
    name: "Tagliata vitello",
    price: 15,
    description: "Scottona allevata al pascolo ",
    ingredients: ["scottona fresca", "sale", "pepe"],
    imglink:
      "https://static.cookist.it/wp-content/uploads/sites/21/2018/09/tagliata-di-manzo-segreti.jpg",
    tags: ["primo", "carne", "glutenfree"],
  },
  {
    name: "BBQ ribs",
    price: 25,
    description: "Costine affumicate con salsa bbq prestigiosa",
    ingredients: ["costine di maiale", "costine"],
    imglink:
      "https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/09/Spare-ribs-1111.jpg",
    tags: ["primo", "carne", "glutenfree"],
  },
  {
    name: "Salmone fresco",
    price: 25,
    description: "Salmone pescato nel mar baltico",
    ingredients: ["salmone", "sale"],
    imglink:
      "https://www.pescheriavarpescaolbia.it/wp-content/uploads/unnamed.jpg",
    tags: ["pesce", "glutenfree"],
  },
  {
    name: "Totano fritto",
    price: 25,
    description: "Totano fritto in olio di oliva",
    ingredients: ["Totano", "olio", "sale"],
    imglink: "https://www.manjoo.it/wp-content/uploads/1513196841_540_img.jpg",
    tags: ["pesce", "contorno", "glutenfree"],
  },
  {
    name: "Polpo",
    price: 25,
    description: "Polpo grosso e fresco",
    ingredients: ["Polpo", "Sale"],
    imglink:
      "https://www.oggi.it/cucina/wp-content/uploads/sites/19/2008/07/polpo_griglia-645-470x377.jpg",
    tags: ["pesce", "glutenfree"],
  },
];

let attempt = 0;

async function populate() {
    attempt = attempt + 1;
  try {
      console.log(attempt, "tentativo : ", attempt)
    
      await connect(process.env.CONNECTION);
      console.log("mi sono connesso!!!")
      const result = await Product.insertMany(product_list);
       console.log("tutto è andato a buon fine: ",result);
} catch (err) {
    if (attempt < 3) {
        console.log(err);
    } else {
        console.log("dopo 3 tentativi non sono riuscito a fare nulla!");
    }
}

}

populate();
