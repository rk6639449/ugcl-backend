require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// 🧱 Player Schema
const PlayerSchema = new mongoose.Schema({
  playerId: String,
  name: String,
  team: String,
  imageUrl: String
});

const Player = mongoose.model("Player", PlayerSchema);

// ✅ GET players
app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// ✅ POST player
app.post("/players", async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
