const { MessageEmbed } = require('discord.js');
const moment = require("moment");
const modloff = require("../../../setup/register.json");
const RegisterData = require("../models/Register.js")

exports.execute = async  (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let Infodata = await RegisterData.findOne({ guildId: message.guild.id, userId: message.author.id });

    if(!Infodata) {
        let newInfodata = new RegisterData({
          guildId: message.guild.id, userId: member.id, toplamkayit: 0, kadinkayit: 0, erkekkayit: 0, isimgecmisi: [] }).save().then(x => {
            return message.channel.send(embed.addField(`❯ Kullanıcı Bilgisi`, `\`•\` Kullanıcı Adı: ${member.user.tag} \n\`•\` Sunucu İsmi: ${member.displayName} \n\`•\` Kullanıcı ID: ${member.id}`).addField(`❯ Kayıt Bilgisi`, `\`•\` Toplam: ${x.toplamkayit} \n\`•\` Erkek: ${x.erkekkayit} \n\`•\` Kız: ${x.erkekkayit}`))
        });
      } else {
        message.channel.send(embed.addField(`❯ Kullanıcı Bilgisi`, `\`•\` Kullanıcı Adı: ${member.user.tag} \n\`•\` Sunucu İsmi: ${member.displayName} \n\`•\` Kullanıcı ID: ${member.id}`).addField(`❯ Kayıt Bilgisi`, `\`•\` Toplam: ${Infodata.toplamkayit} \n\`•\` Erkek: ${Infodata.erkekkayit} \n\`•\` Kız: ${Infodata.erkekkayit}`))
      }
    
    
};

exports.conf = {
  command: "info",
  description: "",
  aliases: ["info"]
}