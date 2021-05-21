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
      _id: false,
      name: String,
      amount: String,
    }
  ],
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  image: String,
  recipe: {
    type: String,
    required: true,
  },
  rating: [
    {
      _id: false,
      user: String,
      rate: Number,
    }
  ]
});

const Cocktails = mongoose.model('Cocktails', CocktailsSchema);
module.exports = Cocktails;