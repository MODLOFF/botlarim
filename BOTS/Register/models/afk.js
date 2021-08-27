const mongoose = require("mongoose");

const AfkStark = mongoose.Schema({
    guildID: String,
    userID: String,
    reason: String,
});

module.exports = mongoose.model("AfkSData", AfkStark);
