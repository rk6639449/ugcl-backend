const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, "db.json");

/* ---------- helpers ---------- */
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return { players: [], teams: [], matches: [], captains: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/* ---------- PLAYERS ---------- */

// GET all players
app.get("/players", (req, res) => {
  const db = readDB();
  res.json(db.players);
});

// ADD new player
app.post("/players", (req, res) => {
  const db = readDB();
  const { id, playerId, name, team, imageUrl } = req.body;

  if (!playerId || !name || !team) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const exists = db.players.find(p => p.playerId == playerId);
  if (exists) {
    return res.status(409).json({ error: "Player already exists" });
  }

  const newPlayer = {
    id: id || Date.now(),
    playerId,
    name,
    team,
    imageUrl
  };

  db.players.push(newPlayer);
  writeDB(db);

  res.status(201).json(newPlayer);
});

/* ---------- TEAMS ---------- */

app.get("/teams", (req, res) => {
  const db = readDB();
  res.json(db.teams);
});

/* ---------- MATCHES ---------- */

app.get("/matches", (req, res) => {
  const db = readDB();
  res.json(db.matches);
});

app.post("/matches", (req, res) => {
  const db = readDB();
  const match = { id: Date.now(), ...req.body };
  db.matches.push(match);
  writeDB(db);
  res.status(201).json(match);
});

/* ---------- CAPTAINS ---------- */

app.get("/captains", (req, res) => {
  const db = readDB();
  res.json(db.captains);
});

app.post("/captains", (req, res) => {
  const db = readDB();
  const captain = { id: Date.now(), ...req.body };
  db.captains.push(captain);
  writeDB(db);
  res.status(201).json(captain);
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("UGCL Backend is running 🚀");
});

/* ---------- START ---------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
