// questo è il model del prodotto.

/* 
    interface Product {
    id:number;
    price:number;
    name:string;
    description?:string;
    imglink?:string;
    ingredients?:string[];
}
*/



 const mongoose = require('mongoose');
 
 const validTagsForFood = ['primo','secondo','contorno','dolce','pesce','carne','pizza','vegan','glutenfree'];


const ProductSchema = new mongoose.Schema({
    _id:String,
    name:String,
    price:Number,
    description:String,
    imglink:String,
    ingredients:{ type: [String]},
    tags:{
        type:[String],
        enum:validTagsForFood,
    }

}) 


ProductSchema.pre('save',function(){
    this._id = new mongoose.Types.ObjectId();
    console.log(this._id)
 })


module.exports = mongoose.model('Product',ProductSchema);



