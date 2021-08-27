const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("../../setup/MODsettings.json");
client.setup = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./setup/handlers/MODcommandHandler");
require("./setup/handlers/MODeventHandler");
require("./setup/handlers/MODmongoHandler");
require("./setup/handlers/MODfunctionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot Baglandi!"))
  .catch(() => console.log("[BOT] Bot Baglanamadi!"));
