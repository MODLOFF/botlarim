const { MessageEmbed } = require('discord.js');
const modloff = require("../../../setup/register.json");
const RegisterData = require("../models/Register.js")
exports.execute = async (client, message, args) => {
let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
if (!message.member.roles.cache.has(modloff.kayıtcı) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak Gerekli Yetkiye Sahip Değilsin`)).then(x => x.delete({timeout: 10000}));
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let isim = args[1]; let yaş = Number (args[2]);
if(!member || !isim || !yaş ) return message.channel.send(embed.setDescription(`\`Eksik Argüman Kullandınız. Örnek: ${modloff.prefix}kadın @MODLOFF\ID\``))
await member.roles.set([modloff.kadinkayit]).catch(e => { });
await member.setNickname(`${modloff.tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` ' ${yaş}` : ``}`).catch(e => { });
if(member.user.username.includes(modloff.tag)) {await member.roles.add(modloff.taglırol)} 
let UyeData = await RegisterData.findOne({ guildId: message.guild.id, userId: member.id });
let YetkiliData = await RegisterData.findOne({ guildId: message.guild.id, userId: message.author.id });
if(!YetkiliData){ let newYetkiliData = new RegisterData({ guildId: message.guild.id, userId: message.author.id, toplamkayit: 1, kadinkayit: 1, erkekkayit: 0, isimgecmisi: [] }).save(); } else { YetkiliData.kadinkayit++; YetkiliData.toplamkayit++; YetkiliData.save();}
if(!UyeData){ let newUyeData = new RegisterData({ guildId: message.guild.id, userId: member.id, isimgecmisi:  [{ isim: `${modloff.tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` ' ${yaş}` : ``}`, type: `Kadın`}] }).save(); }
message.channel.send(embed.setDescription(`\`•\` ${member} Sunucumuza **Kadın** Olarak Kayıt oldu. \n\n\`•\` Kayıt Eden Yetkili: ${message.author}; \n\n\`•\` Kadın Kayıt: ${YetkiliData.kadinkayit} \n\`•\` Toplam Kayıt: ${YetkiliData.toplamkayit}`))
}

exports.conf = {
    command: "kadin",
    description: "",
    aliases: ["kadin", "kadın", "k"]
  }