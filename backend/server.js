require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import models from models.js
const { Team, Player, Captain, Match } = require("./models");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// -------------------- ROUTES --------------------

// 🔹 ROOT
app.get("/", (req, res) => {
  res.send("UGCL Backend is running 🚀");
});

/* ===================== TEAMS ===================== */
app.get("/teams", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

app.post("/teams", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===================== PLAYERS ===================== */
app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

app.post("/players", async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===================== CAPTAINS ===================== */
app.get("/captains", async (req, res) => {
  const captains = await Captain.find();
  res.json(captains);
});

app.post("/captains", async (req, res) => {
  try {
    const captain = new Captain(req.body);
    await captain.save();
    res.status(201).json(captain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===================== MATCHES ===================== */
app.get("/matches", async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

app.post("/matches", async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
