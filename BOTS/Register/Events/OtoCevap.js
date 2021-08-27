const Discord = require('discord.js');
const modloff = require("../../../setup/register.json")
exports.execute = async(message) => {

    if (message.content.toLowerCase() == "tag" || message.content.toLowerCase() === "Tag" || message.content.toLowerCase() === ".tag" || message.content.toLowerCase() === "!tag") {
        message.channel.send(`${modloff.tag}`)
    };

 if (message.content.toLowerCase() == ".link" || message.content.toLowerCase() === "link" ) {
        message.channel.send(`${modloff.link}`)
    };

};

exports.conf = {
    event: "message"
  }