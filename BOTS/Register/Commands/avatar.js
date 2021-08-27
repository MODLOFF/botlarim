const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const ayar = require("../../../setup/register.json");
const modloff = require("../../../setup/register.json");

exports.execute = async  (client, message, args) => {
 let modloffuser = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
	 let avatar = modloffuser.avatarURL({ dynamic: true, size: 2048 });
    let embed = new MessageEmbed()
  .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`[Resim Adresi](${avatar})`)
	.setImage(avatar)
	message.channel.send(embed).then(x => x.delete({timeout:100})).catch(e => { })
};

exports.conf = {
  command: "avatar",
  description: "",
  aliases: ["pp"]
}