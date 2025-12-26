const mongoose = require("mongoose");

// TEAM
const TeamSchema = new mongoose.Schema({
  id : String,
  team: { type: String, required: true, unique: true },
  team_s: String,
  logo: String
});
const Team = mongoose.model("Team", TeamSchema);

// PLAYER
const PlayerSchema = new mongoose.Schema({
  id : String,
  playerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  imageUrl: String
});
const Player = mongoose.model("Player", PlayerSchema);

// CAPTAIN
const CaptainSchema = new mongoose.Schema({
  id : String,
  name: String,
  team: String,
  team_s :String,
  avatar: String,
  profileUrl: String
});
const Captain = mongoose.model("Captain", CaptainSchema);

// MATCH
const MatchSchema = new mongoose.Schema({
  matchId : String,
  team1: String,
  team2: String,
  date: String,
  text: String,
  id : String
});
const Match = mongoose.model("Match", MatchSchema);

module.exports = { Team, Player, Captain, Match };
