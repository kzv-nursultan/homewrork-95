const mongoose = require("mongoose");
const config = require("./config");
const Users = require("./models/Users");
const Cocktails = require("./models/Cocktails");
const {nanoid} = require("nanoid");


const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await Users.create({
    email: 'user@mail.com',
    password: '123',
    token: nanoid(),
    role: 'user',
    username: 'user',
    avatar: null
  }, {
    email: 'admin@mail.ru',
    password: '123',
    token: nanoid(),
    role: 'admin',
    username: 'admin',
  });

  await Cocktails.create({
    name: 'Martini',
    author: user,
    ingredients: [
      {name: 'Gin', amount: '50ml'},
      {name: 'Dry Vermouth', amount: '10ml'},
      {name: 'Lemon Twist', amount: '1pc'}
    ],
    published: true,
    image: '/fixtures/martini.jpeg',
    recipe: 'Chill martini glass with soda water and ice. Fill mixing glass to top with ice. ' +
      'Add the dry vermouth to the mixing glass, giving a small stir to coat the ice with the vermouth. ' +
      'Drain out glass, leaving just the coating on the ice. Add the gin to the mixing glass. Stir for 15 seconds, ' +
      'always making sure that the glass is full to the brim with ice. ' +
      'Taste. Fine strain into chilled martini glass. Zest with lemon peel and add twist unto drink.'

  }, {
    name: 'Cuba Libre',
    author: user,
    ingredients: [
      {name: 'Anejo Rum', amount: '50ml'},
      {name: 'Lime wedges', amount: '8pc'},
      {name: 'Cola', amount: '100ml'},
      {name: 'Lime wedge', amount: '1pc'}
    ],
    published: false,
    image: '/fixtures/cubalibre.jpeg',
    recipe: 'Add rum into rocks glass and squeeze the lime wedges over the top. ' +
      'Give quick churn with bar spoon and top up with ice. ' +
      'Fill to brim with cola and add in lime wedge as garnish.'
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));