// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const utils = require('./utils.js')
const bot = require('./bot.js')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Set up a basic route to serve the HTML page to the user
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/init', async (req, res) => {
  try {
    const botResponse = await bot.initBot();
    res.send(botResponse);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

// Handle user input and interaction with the bot
app.post('/interact', async (req, res) => {
  const userInput = req.body.userInput;
  try {
    const botResponse = await bot.sendMessage(userInput);
    res.send(botResponse);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
