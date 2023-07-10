// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

const utils = require("./utils.js")


const botDefinition = utils.loadBotDefinition('writers_assistant_nonfiction')
let conversation = [{ role: 'system', content: botDefinition }]
const apiKey = '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';
const apiUrl ='https://api.openai.com/v1/chat/completions'

async function initBot() {
  var response = ""
  var prevMessages = utils.loadConversation('writers_assistant_nonfiction');
  if (prevMessages.length > 0 ) {
    conversation = conversation.concat(JSON.parse(prevMessages))
    for (i in conversation) {
      response = response + conversation[i].role + '\n';
      response = response + conversation[i].content + '\n';
      response = response + '\n';
    }
  } else {
    response = await sendMessage();
  }
  return response
}

async function sendMessage(message = '') {
    var prevMessages = utils.loadConversation('writers_assistant_nonfiction');
    var botResponse = 'Something went wrong'
    if (prevMessages.length > 0 ) {
      conversation = JSON.parse(prevMessages)
    }

    if (message.length > 0) {
      conversation = conversation.concat({ role: 'user', content: message })
    }
    
    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: conversation,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
  
      botResponse = response.data.choices[0].message.content.trim();
      conversation = conversation.concat({ role: 'assistant', content: botResponse })
    } catch (error) {
      console.error('Error:', error.message);
    }
    utils.saveConversation('writers_assistant_nonfiction', JSON.stringify(conversation))
    return botResponse;
  }

  module.exports = {
    initBot,
    sendMessage
};


// Call the async function
async function main() {
  try {
    // const msg = await sendMessage('Expand on the personality conflicts');
    const msg = await initBot();
    console.log(msg)
  } catch (error) {
    console.error(error);
  }
}

main()