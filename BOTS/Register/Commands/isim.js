const { MessageEmbed } = require('discord.js');
const modloff = require("../../../setup/register.json");
const RegisterData = require("../models/Register.js")
exports.execute = async (client, message, args) => {
 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
    if (!message.member.roles.cache.has(modloff.kayıtcı) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];let yaş = Number (args[2]);
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Kayıt etmeye çalıştığın kişi seninle aynı yetkide veya senden daha üstte olduğu için işlemi gerçekleştiremedim.`)).then(x => x.delete({timeout: 5000}));
    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${modloff.prefix}isim @modloff\ID Isım Yaş\``)).then(x => x.delete({timeout: 5000}));
   await message.channel.send(embed.setDescription(`${member} adlı üyenin ismi \`${modloff.tag} ${isim} ' ${yaş}\` olarak değiştirildi.`)).then(x => x.delete({timeout: 5000}));
   await member.setNickname(`${modloff.tag} ${isim} ' ${yaş}`).catch(e => { })
   let UyeData = await RegisterData.findOne({ guildId: message.guild.id, userId: member.id });
   if(!UyeData){ let newUyeData = new RegisterData({ guildId: message.guild.id, userId: member.id, isimgecmisi:  [{ isim: `${modloff.tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` ' ${yaş}` : ``}`, type: `Isım Değiştirme`}] }).save(); }


};

exports.conf = {
    command: "isim",
    description: "",
    aliases: ["isim", "nick"]
  }