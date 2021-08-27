const Discord = require('discord.js');
exports.execute = async (client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setColor('#000000').setTitle('**Bu Komutu Kullanman için `Yönetici` Yetkin Olmalı**'));
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('#000000').setTitle('Silinecek miktar giriniz pls.'));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setColor('#000000').setTitle('Mesaj silme limitim `100` '));
message.channel.bulkDelete(args[0]);
return message.channel.send(new Discord.MessageEmbed().setTitle('Kanaldan Toplam '+`${args[0]}`+' Adet Mesaj Uzaya Uçuruldu.')).then(m => m.delete({timeout: 5000}));
};
exports.conf = {
    command: "sil",
    description: "",
    aliases: ["clear", "temizle"]
  }