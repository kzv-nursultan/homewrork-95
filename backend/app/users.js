const fs = require('fs').promises;
const express = require('express');
const Users = require('../models/Users');
const config = require('../config');
const axios = require("axios");
const path = require("path");
const {nanoid} = require("nanoid");
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(config.google.clientId);
const router = express.Router();

router.post('/',  async (req, res) => {
  try {
    const {email, password, username, avatar} = req.body;
    const user = new Users({
      email,
      password,
      username,
      avatar,
    });

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await Users.findOne({email: req.body.email});

  if (!user) {
    return res.status(401).send({message: 'User not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Credentials are wrong'});
  }

  user.generateToken();
  await user.save();
  return res.send(user);
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await Users.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();

  await user.save();

  return res.send(success);
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data?.user_id) {
      return res.status(401).send({message: 'Wrong user ID'});
    }

    let user = await Users.findOne({email: req.body.email});

    if (!user) {
      user = new Users({
        email: req.body.email,
        password: nanoid(),
        username: req.body.name,
        avatar: req.body.picture.data.url,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post('/googleLogin', async (req, res) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.tokenId,
      audience: config.google.clientId
    });
    const {name, picture, sub: ticketUserId, email} = ticket.getPayload();

    if(req.body.googleId !== ticketUserId) {
      res.status(401).send('User ID is incorrect');
    }

    let user = await Users.findOne({email});
    if (!user) {
      user = new Users({
        email,
        password: nanoid(),
        username: name,
        avatar: picture,
      });
    }

    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (e) {
    res.send(e);
  }
})

module.exports = router;