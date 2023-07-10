const fs = require('fs');
const { read } = require('fs/promises');
const botDefinitionDir = "bots"
const historyDir = "history"

function loadBotDefinition(bot) {
    const filePath = botDefinitionDir + '/' + bot + '.sudo' 
    // Read the file
    if (!fs.existsSync(filePath)) {
        throw new Error("Bot definition does no exist")
    }
    const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    return data;
}

function loadConversation(bot) {
    const filePath = historyDir + '/' + bot + '._converstation.txt' 
    if (fs.existsSync(filePath)) { 
        const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        return data;
    }
    return "";
}

function saveConversation(bot, conversation) {
    const filePath = historyDir + '/' + bot + '._converstation.txt' 
    fs.writeFileSync(filePath,conversation);
}

module.exports = {
    loadBotDefinition,
    loadConversation,
    saveConversation
};