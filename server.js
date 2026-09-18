import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API ROUTES
app.get("/api/league/:leagueId", async (req, res) => {
  try {
    const { leagueId } = req.params;

    const response = await fetch(
        `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2026/segments/0/leagues/${leagueId}?view=mTeam&view=mMatchup&view=mStandings&view=mSettings&view=mLiveScoring`,
        {
          headers: {
            Cookie: `SWID=${process.env.ESPN_SWID_1}; espn_s2=${process.env.ESPN_S2_1}`,
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0"
          }
        }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

// SERVE REACT BUILD
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});