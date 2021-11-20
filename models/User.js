const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a valid name!"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  isAdmin: { type: Boolean, default: false },
});

//prima di salvare nel database fai qualcosa: usa bcrypt per salvare nel database
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // il this qua dentro non ha contesto
});

//metodo di istanza per creare un jwt con le informazioni nome id e edmail
UserSchema.methods.generateJWT = function () {
  const object = {  userId: this._id,isAdmin:this.isAdmin };  //con il token posso vedere se è un admin o no e in base a quello faccio le verifiche
  const token = jwt.sign(object, process.env.JWT_SECRET, { expiresIn: "10h" });
  return token;
};

UserSchema.methods.controlPassword = function (password) {
  const stessapass = bcrypt.compareSync(password, this.password);
  return stessapass;
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);


