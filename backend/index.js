require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const config = require('./config');
const users = require('./app/users');
const cocktails = require('./app/cocktails');

const app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/users', users);
app.use('/cocktails', cocktails);

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  exitHook(async callback => {
    await mongoose.disconnect();
    console.log('mongoose disconnected');
    callback();
  });
}

run().catch(console.error);
