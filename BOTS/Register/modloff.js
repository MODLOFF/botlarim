const { Discord, MessageEmbed, Client, Collection } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true });
const fs = require("fs");
const mongoose = require("mongoose");
const config = require("../../setup/register.json")
client.on('ready', async () => {
    client.user.setPresence({ activity: { name: config.footer }, status: "dnd" });
});
client.commands = new Collection();
client.aliases = new Collection();

fs.readdirSync("./Commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./Commands/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Command] ${file.replace(".js", "")} command loaded.`);
    command.conf.aliases.forEach(aliases => {
        client.aliases.set(aliases, command)  
    });
});

fs.readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./Events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")} event loaded.`);
});


let afkData = require("./models/afk.js")

client.on("message", async (message) => { 
  if(!message.guild || message.author.bot || message.content.toLowerCase().includes(`${config.prefix}afk`)) return;
  let afks = await afkData.findOne({ guildID: message.guild.id,  userID: message.author.id })
  await afkData.deleteOne({ guildID: message.guild.id,  userID: message.author.id })
  if(!afks) {
  } else {
    if(message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK] ", "")).catch(e => { });
    message.channel.send(`${message.author} artık AFK değilsin!`).then(x => x.delete({timeout: 5000})).catch(e => { });
  }

})


mongoose.connect(`MONGO URL`, {useNewUrlParser: true, useUnifiedTopology: true}).then(c => console.log(`MDB Bağlantısı Kuruldu!`)).catch(err => console.error(`MDB Bağlantısı Kurulamadı!`));
client.login(config.token).then(console.log("Bot başarılı bir şekilde giriş yaptı.")).catch(e => console.error(e));
