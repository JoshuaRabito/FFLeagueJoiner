import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/api/league/:leagueId", async (req, res) => {
  try {
    const { leagueId } = req.params;

    const response = await fetch(
        `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2026/segments/0/leagues/${leagueId}?view=mTeam&view=mMatchup&view=mStandings&view=mSettings`,
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

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});