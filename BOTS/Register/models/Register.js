  
const mongoose = require("mongoose");

const RegisterData = mongoose.Schema({
  guildId: String,
  userId: String,
  toplamkayit: { type: Number, default: 0 },
  kadinkayit: { type: Number, default: 0 },
  erkekkayit: { type: Number, default: 0 },
  isimgecmisi: { type: Array, default: [] }
});

module.exports = mongoose.model("KayitData", RegisterData);