const { MessageEmbed } = require('discord.js');
const modloff = require("../../../setup/register.json");

exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);

    message.channel.send(embed.setDescription(`
    ${modloff.prefix}avatar
    ${modloff.prefix}afk
    ${modloff.prefix}çek
    ${modloff.prefix}e
    ${modloff.prefix}k
    ${modloff.prefix}git
    ${modloff.prefix}isim
    ${modloff.prefix}isimler
    ${modloff.prefix}kayıtsız
    ${modloff.prefix}info
    ${modloff.prefix}komutlar
    ${modloff.prefix}sil
    ${modloff.prefix}top
    `));
    
};

exports.conf = {
    command: "komutlar",
    description: "",
    aliases: ["komutlar", "help"]
  }