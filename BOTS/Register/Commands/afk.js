const Discord = require('discord.js');
const config = require("../../../setup/register.json")
const afkDataBase = require("../models/afk.js")
exports.execute = async (client, message, args) => {
if(message.author.id === message.guild.owner.user.id) return message.reply(`\`Sunucu Sahibi Olduğunuzdan Dolayı AFK Komutunu Kullanamazsın!\``).then(x => x.delete({timeout: 5000}));
let sebep = args.join(' ');
if (!sebep) sebep = "Belirtilmedi."
let afkData = await afkDataBase.findOne({ guildID: message.guild.id, userID: message.author.id})
if(!afkData) {
if(!afkData) { new afkDataBase({
  guildID : message.guild.id,
  userID: message.author.id,
  reason: sebep                
}).save() 
} else {
  afkData.reason = sebep;
  afkData.userID = message.author.id;
  afkData.save();
}
if(message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => { })
message.reply(`Başarılı şekilde ${sebep} Sebebiyle afk moduna geçiş yapılmıştır`).then(x => x.delete({timeout: 5000})).catch(e => { });
} else {
  message.reply(`Zaten Afk Modunda Bulunmaktasınız.`).then(x => x.delete({timeout: 5000})).catch(e => { });
}
};

exports.conf = {
  command: "afk",
  description: "",
  aliases: ["afk"]
}