const { MessageEmbed } = require('discord.js');
const RegisterData = require("../models/Register.js")
const modloff = require("../../../setup/register.json");

exports.execute = async (client, message, args) => {

 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
 if (!message.member.roles.cache.has(modloff.kayıtcı) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak Gerekli Yetkiye Sahip Değilsin`)).then(x => x.delete({timeout: 10000}));
 let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

 let UyeData = await RegisterData.findOne({ guildId: message.guild.id, userId: member.id });
 if(!UyeData) {
    let newUyeData = new RegisterData({ guildId: message.guild.id,userId: member.id,toplamkayit: 0, kadinkayit: 0, erkekkayit: 0, isimgecmisi: [] }).save().then(x => {
        return message.channel.send(embed.setDescription(`${member} Adlı üyenin ${x.isimgecmisi.length} isim kayıtı bulundu. \n\n${x.isimgecmisi.map(x => `\`• ${x.isim}\` (${x.type.replace(`Erkek`, `<@&${modloff.erkekrol}>`).replace(`Kız`, `<@&${modloff.kadinrol}>`)})`)}`))
      });
    } else {
      message.channel.send(embed.setDescription(`${member} Adlı üyenin ${UyeData.isimgecmisi.length} isim kayıtı bulundu. \n\n${UyeData.isimgecmisi.map(x => `\`• ${x.isim}\` (${x.type.replace(`Erkek`, `<@&${modloff.erkekrol}>`).replace(`Kız`, `<@&${modloff.kadinrol}>`)})`).join("\n ")}`))
    }
    
};

exports.conf = {
  command: "isimler",
  description: "",
  aliases: ["isimler", "nicks"]
}