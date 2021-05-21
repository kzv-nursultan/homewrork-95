const express = require("express");
const path = require("path");
const multer = require("multer");
const {nanoid} = require("nanoid");
const Cocktails = require("../models/Cocktails");
const auth = require("../middleware/auth");
const config = require("../config");
const permit = require("../middleware/permit");
const router = express.Router();


const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename:(req, file, cb) => {
    cb(null, nanoid(4) + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
      const ingredients = [];
        req.body.ingredients.map(obj => {
          return ingredients.push(JSON.parse(obj))
        });

      const {name, author, recipe} = req.body;
      const image = req?.file ? '/uploads/' + req.file.filename : null;

      const cocktail = new Cocktails({
        name,
        author,
        ingredients,
        image,
        recipe,
      });
      await cocktail.save();
      res.send(cocktail);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktails.find();
    res.send(cocktails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Cocktails.find({author: id});
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/one/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktails.findById(id);
    res.send(cocktail);
  } catch (e) {
    res.status(500).send(e);
  }
})

router.patch('/', auth, permit('admin'), async (req, res) => {
  try {
    const id = ''
    await Cocktails.findByIdAndUpdate(id, {published: true});
    res.send('published successfully');
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/rating', auth, async (req, res) => {
  try {
    const {user, cocktail, rate} = req.body;
    const drinks = await Cocktails.findById(cocktail);
    drinks.rating = [...drinks.rating, {user, rate}];
    await drinks.save();
  } catch {
    res.status(400).send('Error')
  }
});

router.delete('/delete/:id', auth, permit('admin'), async (req, res) => {
  try {
    await Cocktails.findByIdAndDelete(req.params.id);
    const data = await Cocktails.find();
    res.send(data)
  } catch (e){
    console.log(e);
    res.sendStatus(400);
  }
});

router.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    await Cocktails.findByIdAndUpdate(req.params.id, {published: true});
    const cocktails = await Cocktails.find();
    res.send(cocktails);
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;