require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const { Team, Player, Captain, Match } = require("./models"); // import models

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    importData();
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

async function importData() {
  try {
    await Team.deleteMany();
    await Player.deleteMany();
    await Captain.deleteMany();
    await Match.deleteMany();

    await Team.insertMany(data.teams);
    await Player.insertMany(data.players);
    await Captain.insertMany(data.captains);
    await Match.insertMany(data.matches);

    console.log("✅ All data imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
}
