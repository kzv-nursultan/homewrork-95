const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CocktailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  ingredients: [
    {
      name: String,
      amount: String,
    }
  ],
});

const Cocktails = mongoose.model('Cocktails', CocktailsSchema);
module.exports = Cocktails;