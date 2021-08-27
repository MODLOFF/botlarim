const { MessageEmbed } = require('discord.js');
const modloff = require("../../../setup/register.json");
exports.execute = async (client, message, args) => {

 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
    if (!message.member.roles.cache.has(modloff.kayıtcı) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 5000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(embed.setDescription(`\`Eksik Argüman Kullandınız. Örnek: ${modloff.prefix}kayıtsız @MODLOFF\ID\``))
  await  member.roles.set([modloff.kayıtsız])
  await  member.setNickname(`• İsim | Yaş`).catch();
  await    message.channel.send(embed.setDescription(`${member} (\`${member.id}\`) adlı **Kayıtsız**a Başarılı olarak Atılmıştır..`)).then(x => x.delete({timeout: 5000}));
    
}

exports.conf = {
  command: "kayıtsız",
  description: "",
  aliases: ["kayıtsız"]
}