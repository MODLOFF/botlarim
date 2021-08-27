const { MessageEmbed } = require("discord.js");
const modloff = require("../../../setup/register.json");

exports.execute = async(client, message, args, ayar, emoji) => {
	let modloffuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(modloff.renk).setFooter(modloff.footer);
     if (!message.member.roles.cache.has(modloff.transport) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak Gerekli Yetkiye Sahip Değilsin`)).then(x => x.delete({timeout: 10000}));
  if (!modloffuser) return message.channel.send(embed.setDescription("Ses odasına gidilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !modloffuser.voice.channel || message.member.voice.channelID == modloffuser.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
 else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === modloffuser.id;
    };
    message.channel.send(`${modloffuser}`, {embed: embed.setAuthor(modloffuser.displayName, modloffuser.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(modloffuser.voice.channelID);
          msj.delete();
	};
      });
    });
  };
};
exports.conf = {
  command: "git",
  description: "",
  aliases: ["git"]
}