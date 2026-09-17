import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CloudDownload,
  Database,
  Medal,
  RefreshCw,
  Settings,
  Shield,
  TrendingUp,
  Trophy,
  Users,
  X,
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_CONFIG = {
  proxyBaseUrl: "",

  leagues: [
    {
      id: "league-one",
      name: "League One",
      leagueId: "",
      season: CURRENT_YEAR,
    },
    {
      id: "league-two",
      name: "League Two",
      leagueId: "",
      season: CURRENT_YEAR,
    },
  ],
};

const APP_CONFIG = {
  ...DEFAULT_CONFIG,
  ...(window.APP_CONFIG || {}),

  leagues:
      Array.isArray(window.APP_CONFIG?.leagues) &&
      window.APP_CONFIG.leagues.length > 0
          ? window.APP_CONFIG.leagues
          : DEFAULT_CONFIG.leagues,
};

function getLeagueConfiguration(index) {
  const configuredLeague = APP_CONFIG.leagues[index];

  if (configuredLeague) {
    return {
      id: configuredLeague.id || `league-${index + 1}`,
      name: configuredLeague.name || `League ${index + 1}`,
      leagueId: String(configuredLeague.leagueId || ""),
      season: Number(configuredLeague.season || CURRENT_YEAR),
    };
  }

  return {
    id: `league-${index + 1}`,
    name: `League ${index + 1}`,
    leagueId: "",
    season: CURRENT_YEAR,
  };
}

const LEAGUE_ONE = getLeagueConfiguration(0);
const LEAGUE_TWO = getLeagueConfiguration(1);

const DEMO_LEAGUES = [
  {
    ...LEAGUE_ONE,
    currentWeek: 3,

    teams: [
      {
        id: 1,
        name: "Bayou Blitz",
        owner: "Joshua",
        abbreviation: "BB",
        wins: 3,
        losses: 0,
        ties: 0,
        pointsFor: 402.7,
        pointsAgainst: 331.3,
      },
      {
        id: 2,
        name: "Fourth & Long",
        owner: "Taylor",
        abbreviation: "FL",
        wins: 2,
        losses: 1,
        ties: 0,
        pointsFor: 389.2,
        pointsAgainst: 362.8,
      },
      {
        id: 3,
        name: "Red Zone Rebels",
        owner: "Omar",
        abbreviation: "RZR",
        wins: 2,
        losses: 1,
        ties: 0,
        pointsFor: 370.1,
        pointsAgainst: 355.4,
      },
      {
        id: 4,
        name: "Gridiron Ghosts",
        owner: "Mario",
        abbreviation: "GG",
        wins: 1,
        losses: 2,
        ties: 0,
        pointsFor: 349.8,
        pointsAgainst: 380.2,
      },
      {
        id: 5,
        name: "Crescent City Kings",
        owner: "Michael",
        abbreviation: "CCK",
        wins: 1,
        losses: 2,
        ties: 0,
        pointsFor: 337.4,
        pointsAgainst: 366.0,
      },
      {
        id: 6,
        name: "Monday Miracles",
        owner: "Alex",
        abbreviation: "MM",
        wins: 0,
        losses: 3,
        ties: 0,
        pointsFor: 310.6,
        pointsAgainst: 364.1,
      },
    ],

    matchups: {
      1: [
        {
          homeTeamId: 1,
          awayTeamId: 6,
          homeScore: 128.4,
          awayScore: 104.2,
        },
        {
          homeTeamId: 2,
          awayTeamId: 5,
          homeScore: 122.6,
          awayScore: 111.8,
        },
        {
          homeTeamId: 3,
          awayTeamId: 4,
          homeScore: 119.3,
          awayScore: 116.4,
        },
      ],

      2: [
        {
          homeTeamId: 1,
          awayTeamId: 5,
          homeScore: 139.1,
          awayScore: 108.7,
        },
        {
          homeTeamId: 3,
          awayTeamId: 6,
          homeScore: 126.2,
          awayScore: 101.5,
        },
        {
          homeTeamId: 4,
          awayTeamId: 2,
          homeScore: 117.8,
          awayScore: 131.4,
        },
      ],

      3: [
        {
          homeTeamId: 1,
          awayTeamId: 4,
          homeScore: 135.2,
          awayScore: 115.6,
        },
        {
          homeTeamId: 2,
          awayTeamId: 3,
          homeScore: 135.2,
          awayScore: 124.6,
        },
        {
          homeTeamId: 5,
          awayTeamId: 6,
          homeScore: 116.9,
          awayScore: 104.9,
        },
      ],
    },
  },

  {
    ...LEAGUE_TWO,
    currentWeek: 3,

    teams: [
      {
        id: 11,
        name: "Code Red",
        owner: "Joshua",
        abbreviation: "CR",
        wins: 2,
        losses: 1,
        ties: 0,
        pointsFor: 391.9,
        pointsAgainst: 352.1,
      },
      {
        id: 12,
        name: "Merge Conflicts",
        owner: "Daniel",
        abbreviation: "MC",
        wins: 3,
        losses: 0,
        ties: 0,
        pointsFor: 410.3,
        pointsAgainst: 340.8,
      },
      {
        id: 13,
        name: "Null Pointers",
        owner: "David",
        abbreviation: "NP",
        wins: 2,
        losses: 1,
        ties: 0,
        pointsFor: 376.5,
        pointsAgainst: 361.4,
      },
      {
        id: 14,
        name: "Ship It",
        owner: "Taylor",
        abbreviation: "SI",
        wins: 1,
        losses: 2,
        ties: 0,
        pointsFor: 354.7,
        pointsAgainst: 373.9,
      },
      {
        id: 15,
        name: "Queue Crew",
        owner: "Michael",
        abbreviation: "QC",
        wins: 1,
        losses: 2,
        ties: 0,
        pointsFor: 343.2,
        pointsAgainst: 378.8,
      },
      {
        id: 16,
        name: "Runtime Errors",
        owner: "Sam",
        abbreviation: "RE",
        wins: 0,
        losses: 3,
        ties: 0,
        pointsFor: 306.8,
        pointsAgainst: 375.4,
      },
    ],

    matchups: {
      1: [
        {
          homeTeamId: 12,
          awayTeamId: 16,
          homeScore: 137.2,
          awayScore: 99.1,
        },
        {
          homeTeamId: 11,
          awayTeamId: 15,
          homeScore: 129.8,
          awayScore: 114.4,
        },
        {
          homeTeamId: 13,
          awayTeamId: 14,
          homeScore: 121.9,
          awayScore: 118.3,
        },
      ],

      2: [
        {
          homeTeamId: 12,
          awayTeamId: 14,
          homeScore: 141.4,
          awayScore: 112.1,
        },
        {
          homeTeamId: 13,
          awayTeamId: 16,
          homeScore: 130.8,
          awayScore: 102.4,
        },
        {
          homeTeamId: 15,
          awayTeamId: 11,
          homeScore: 116.9,
          awayScore: 128.7,
        },
      ],

      3: [
        {
          homeTeamId: 16,
          awayTeamId: 14,
          homeScore: 105.3,
          awayScore: 124.3,
        },
        {
          homeTeamId: 15,
          awayTeamId: 13,
          homeScore: 111.9,
          awayScore: 123.8,
        },
        {
          homeTeamId: 11,
          awayTeamId: 12,
          homeScore: 133.4,
          awayScore: 131.7,
        },
      ],
    },
  },
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatScore(value) {
  return Number(value || 0).toFixed(1);
}

function calculateRankingScore(team) {
  const gamesPlayed = team.wins + team.losses + team.ties;

  const winPercentage =
      gamesPlayed === 0
          ? 0
          : (team.wins + team.ties * 0.5) / gamesPlayed;

  return winPercentage * 100000 + team.pointsFor;
}

function normalizeEspnResponse(payload, configuration) {
  const membersById = Object.fromEntries(
      (payload.members || []).map((member) => [
        member.id,
        `${member.firstName || ""} ${member.lastName || ""}`.trim(),
      ])
  );

  const teams = (payload.teams || []).map((team) => {
    const record = team.record?.overall || {};

    return {
      id: team.id,

      name:
          team.name ||
          `${team.location || ""} ${team.nickname || ""}`.trim() ||
          `Team ${team.id}`,

      owner:
          membersById[team.primaryOwner] ||
          membersById[team.owners?.[0]] ||
          "Unknown owner",

      abbreviation: team.abbrev || `T${team.id}`,

      wins: record.wins || 0,
      losses: record.losses || 0,
      ties: record.ties || 0,
      pointsFor: record.pointsFor || 0,
      pointsAgainst: record.pointsAgainst || 0,
    };
  });

  const matchups = {};

  (payload.schedule || []).forEach((game) => {
    const week = game.matchupPeriodId;

    if (!week || !game.home || !game.away) {
      return;
    }

    if (!matchups[week]) {
      matchups[week] = [];
    }

    matchups[week].push({
      homeTeamId: game.home.teamId,
      awayTeamId: game.away.teamId,
      homeScore: game.home.totalPoints || 0,
      awayScore: game.away.totalPoints || 0,
    });
  });

  return {
    id: configuration.id,
    name: payload.settings?.name || configuration.name,
    leagueId: String(configuration.leagueId),
    season: configuration.season,

    currentWeek:
        payload.status?.currentMatchupPeriod ||
        payload.scoringPeriodId ||
        1,

    teams,
    matchups,
  };
}

function createInitialLeagues() {
  try {
    const storedValue = localStorage.getItem(
        "espn-fantasy-football-leagues"
    );

    if (!storedValue) {
      return clone(DEMO_LEAGUES);
    }

    const savedLeagues = JSON.parse(storedValue);

    if (!Array.isArray(savedLeagues)) {
      return clone(DEMO_LEAGUES);
    }

    return APP_CONFIG.leagues.map((configuration, index) => {
      const savedLeague = savedLeagues.find(
          (league) => league.id === configuration.id
      );

      const fallbackLeague = DEMO_LEAGUES[index];

      return {
        ...(savedLeague || fallbackLeague),

        id: configuration.id || fallbackLeague.id,
        name: configuration.name || fallbackLeague.name,
        leagueId: String(configuration.leagueId || ""),
        season: Number(
            configuration.season || fallbackLeague.season
        ),
      };
    });
  } catch (error) {
    console.error("Failed to load saved league data.", error);
    return clone(DEMO_LEAGUES);
  }
}

function IconButton({
  children,
  disabled,
  onClick,
  title,
}) {
  return (
      <button
          type="button"
          title={title}
          disabled={disabled}
          onClick={onClick}
          className="
        inline-flex h-10 w-10 items-center justify-center
        rounded-xl border border-white/10 bg-white/5
        text-white transition hover:bg-white/10
        disabled:cursor-not-allowed disabled:opacity-30
      "
      >
        {children}
      </button>
  );
}

function TeamAvatar({ team, small = false }) {
  const colors = [
    "from-cyan-400 to-blue-600",
    "from-lime-400 to-emerald-600",
    "from-violet-400 to-fuchsia-600",
    "from-amber-400 to-orange-600",
    "from-rose-400 to-red-600",
  ];

  const identifier = Number(team.id) || 0;
  const color = colors[identifier % colors.length];

  return (
      <div
          className={`
        ${small ? "h-10 w-10 text-xs" : "h-12 w-12 text-sm"}
        flex shrink-0 items-center justify-center rounded-2xl
        bg-gradient-to-br ${color}
        font-black text-slate-950 shadow-lg shadow-black/20
      `}
      >
        {(team.abbreviation || "TM").slice(0, 3)}
      </div>
  );
}

function TeamScore({
  team,
  score,
  winner,
  alignRight = false,
}) {
  return (
      <div
          className={`
        flex min-w-0 flex-1 items-center gap-3
        ${alignRight ? "flex-row-reverse text-right" : ""}
      `}
      >
        <TeamAvatar team={team} />

        <div className="min-w-0 flex-1">
          <div
              className={`
            truncate font-bold
            ${winner ? "text-white" : "text-slate-300"}
          `}
          >
            {team.name}
          </div>

          <div className="truncate text-xs text-slate-500">
            {team.owner}
          </div>
        </div>

        <div
            className={`
          text-xl font-black tabular-nums
          ${winner ? "text-lime-300" : "text-slate-300"}
        `}
        >
          {formatScore(score)}
        </div>
      </div>
  );
}

export default function App() {
  const [leagues, setLeagues] = useState(
      createInitialLeagues
  );

  const [activeLeagueId, setActiveLeagueId] = useState(
      () => createInitialLeagues()[0]?.id
  );

  const [week, setWeek] = useState(
      () => createInitialLeagues()[0]?.currentWeek || 1
  );

  const [view, setView] = useState("matchups");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [configurations, setConfigurations] = useState(
      APP_CONFIG.leagues.map((league, index) => ({
        id: league.id || `league-${index + 1}`,
        name: league.name || `League ${index + 1}`,
        leagueId: String(league.leagueId || ""),
        season: Number(league.season || CURRENT_YEAR),
      }))
  );

  const [proxyBaseUrl, setProxyBaseUrl] = useState(
      APP_CONFIG.proxyBaseUrl || ""
  );

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeLeague =
      leagues.find(
          (league) => league.id === activeLeagueId
      ) || leagues[0];

  const maximumWeek = useMemo(() => {
    if (!activeLeague) {
      return 1;
    }

    const matchupWeeks = Object.keys(
        activeLeague.matchups || {}
    ).map(Number);

    return Math.max(
        1,
        activeLeague.currentWeek || 1,
        ...matchupWeeks
    );
  }, [activeLeague]);

  const teamsById = useMemo(() => {
    return Object.fromEntries(
        (activeLeague?.teams || []).map((team) => [
          team.id,
          team,
        ])
    );
  }, [activeLeague]);

  const rankings = useMemo(() => {
    return [...(activeLeague?.teams || [])].sort(
        (firstTeam, secondTeam) =>
            calculateRankingScore(secondTeam) -
            calculateRankingScore(firstTeam)
    );
  }, [activeLeague]);

  const weeklyMatchups =
      activeLeague?.matchups?.[week] || [];

  useEffect(() => {
    try {
      localStorage.setItem(
          "espn-fantasy-football-leagues",
          JSON.stringify(leagues)
      );
    } catch (storageError) {
      console.error(
          "Failed to save league information.",
          storageError
      );
    }
  }, [leagues]);

  useEffect(() => {
    const selectedLeague = leagues.find(
        (league) => league.id === activeLeagueId
    );

    if (selectedLeague) {
      setWeek(selectedLeague.currentWeek || 1);
    }
  }, [activeLeagueId, leagues]);

  async function loadEspnLeague(configuration) {
    const leaguePath =
        `/apis/v3/games/ffl/seasons/` +
        `${configuration.season}/segments/0/leagues/` +
        `${configuration.leagueId}` +
        `?view=mTeam` +
        `&view=mMatchup` +
        `&view=mStandings` +
        `&view=mSettings`;

    const requestUrl = proxyBaseUrl
        ? `${proxyBaseUrl.replace(/\/$/, "")}${leaguePath}`
        : `https://lm-api-reads.fantasy.espn.com${leaguePath}`;

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
          `${configuration.name} returned HTTP ${response.status}`
      );
    }

    let payload;

    try {
      payload = await response.json();
    } catch {
      throw new Error(
          `${configuration.name} returned invalid JSON`
      );
    }

    return normalizeEspnResponse(
        payload,
        configuration
    );
  }

  async function loadBothLeagues() {
    setLoading(true);
    setNotice("");
    setError("");

    try {
      const invalidConfiguration = configurations.find(
          (configuration) =>
              !configuration.leagueId ||
              !configuration.season
      );

      if (invalidConfiguration) {
        throw new Error(
            "Both league IDs and season values are required."
        );
      }

      const results = await Promise.allSettled(
          configurations.map(loadEspnLeague)
      );

      const loadedLeagues = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

      const failedLeagues = results
      .map((result, index) => ({
        result,
        configuration: configurations[index],
      }))
      .filter(
          ({ result }) => result.status === "rejected"
      );

      if (loadedLeagues.length > 0) {
        setLeagues(loadedLeagues);
        setActiveLeagueId(loadedLeagues[0].id);
        setWeek(loadedLeagues[0].currentWeek || 1);
      }

      if (failedLeagues.length > 0) {
        const failureMessages = failedLeagues.map(
            ({ result, configuration }) => {
              const reason =
                  result.reason instanceof Error
                      ? result.reason.message
                      : "Unknown error";

              return `${configuration.name}: ${reason}`;
            }
        );

        setError(
            `Some leagues could not be loaded. ` +
            failureMessages.join(" | ")
        );
      }

      if (loadedLeagues.length > 0) {
        setNotice(
            `${loadedLeagues.length} league` +
            `${loadedLeagues.length === 1 ? "" : "s"} ` +
            `loaded successfully.`
        );
      }

      if (loadedLeagues.length === 0) {
        throw new Error(
            "No ESPN leagues could be loaded."
        );
      }

      setSettingsOpen(false);
    } catch (loadError) {
      console.error(
          "Failed to load ESPN league information.",
          loadError
      );

      setError(
          loadError instanceof Error
              ? loadError.message
              : "An unexpected error occurred while loading ESPN data."
      );
    } finally {
      setLoading(false);
    }
  }

  function restoreDemoData() {
    const restoredLeagues = clone(DEMO_LEAGUES);

    setLeagues(restoredLeagues);
    setActiveLeagueId(restoredLeagues[0].id);
    setWeek(restoredLeagues[0].currentWeek);
    setNotice("Demo league data was restored.");
    setError("");
  }

  function updateConfiguration(
      configurationId,
      propertyName,
      propertyValue
  ) {
    setConfigurations((currentConfigurations) =>
        currentConfigurations.map((configuration) =>
            configuration.id === configurationId
                ? {
                  ...configuration,
                  propertyValue,
                }
                : configuration
        )
    );
  }

  if (!activeLeague) {
    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">
          No league information is available.
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#06101b] text-slate-100">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        </div>

        <header className="relative border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300 text-slate-950 shadow-lg shadow-lime-300/15">
                <Trophy size={23} />
              </div>

              <div>
                <h1 className="text-lg font-black tracking-tight sm:text-xl">
                  Fantasy League Hub
                </h1>

                <p className="text-xs text-slate-500">
                  Two leagues. One scoreboard.
                </p>
              </div>
            </div>

            <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Connect
            </button>
          </div>
        </header>

        <main className="relative mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {leagues.map((league) => (
                    <button
                        key={league.id}
                        type="button"
                        onClick={() =>
                            setActiveLeagueId(league.id)
                        }
                        className={`
                    rounded-full px-4 py-2 text-sm
                    font-bold transition
                    ${
                            league.id === activeLeagueId
                                ? "bg-white text-slate-950"
                                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }
                  `}
                    >
                      {league.name}
                    </button>
                ))}
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
                  <Shield size={14} />
                  League {activeLeague.leagueId}
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                  {activeLeague.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Users size={16} />
                  {activeLeague.teams.length} teams
                </span>

                  <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                    {activeLeague.season} season
                </span>
                </div>
              </div>
            </div>

            <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1.5">
              <button
                  type="button"
                  onClick={() => setView("matchups")}
                  className={`
                flex items-center gap-2 rounded-xl
                px-4 py-2.5 text-sm font-bold transition
                ${
                      view === "matchups"
                          ? "bg-cyan-400 text-slate-950"
                          : "text-slate-400 hover:text-white"
                  }
              `}
              >
                <CalendarDays size={16} />
                Matchups
              </button>

              <button
                  type="button"
                  onClick={() => setView("rankings")}
                  className={`
                flex items-center gap-2 rounded-xl
                px-4 py-2.5 text-sm font-bold transition
                ${
                      view === "rankings"
                          ? "bg-lime-300 text-slate-950"
                          : "text-slate-400 hover:text-white"
                  }
              `}
              >
                <TrendingUp size={16} />
                Rankings
              </button>
            </div>
          </div>

          {notice && (
              <div className="mb-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
                {notice}
              </div>
          )}

          {error && (
              <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                <strong>Unable to load ESPN data:</strong>{" "}
                {error}

                {!proxyBaseUrl && (
                    <div className="mt-2 text-xs text-red-200/75">
                      If the browser console reports a CORS error,
                      configure a server-side proxy URL in
                      public/config.js.
                    </div>
                )}
              </div>
          )}

          {view === "matchups" ? (
              <section>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Weekly scoreboard
                    </p>

                    <h3 className="text-2xl font-black">
                      Week {week}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                        title="Previous week"
                        disabled={week <= 1}
                        onClick={() =>
                            setWeek((currentWeek) =>
                                Math.max(1, currentWeek - 1)
                            )
                        }
                    >
                      <ChevronLeft />
                    </IconButton>

                    <IconButton
                        title="Next week"
                        disabled={week >= maximumWeek}
                        onClick={() =>
                            setWeek((currentWeek) =>
                                Math.min(
                                    maximumWeek,
                                    currentWeek + 1
                                )
                            )
                        }
                    >
                      <ChevronRight />
                    </IconButton>
                  </div>
                </div>

                {weeklyMatchups.length > 0 ? (
                    <div className="grid gap-4 lg:grid-cols-2">
                      {weeklyMatchups.map(
                          (matchup, matchupIndex) => {
                            const homeTeam =
                                teamsById[matchup.homeTeamId];

                            const awayTeam =
                                teamsById[matchup.awayTeamId];

                            if (!homeTeam || !awayTeam) {
                              return null;
                            }

                            return (
                                <div
                                    key={`${matchup.homeTeamId}-${matchup.awayTeamId}`}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] text-white shadow-2xl shadow-black/10"
                                >
                                  <div className="p-5 sm:p-6">
                                    <div className="mb-5 flex items-center justify-between">
                            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-500">
                              Matchup {matchupIndex + 1}
                            </span>

                                      <span className="text-xs font-semibold text-slate-500">
                              {week <
                              activeLeague.currentWeek
                                  ? "Final"
                                  : week ===
                                  activeLeague.currentWeek
                                      ? "This week"
                                      : "Scheduled"}
                            </span>
                                    </div>

                                    <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
                                      <TeamScore
                                          team={homeTeam}
                                          score={matchup.homeScore}
                                          winner={
                                              matchup.homeScore >
                                              matchup.awayScore
                                          }
                                      />

                                      <div className="text-center text-xs font-black text-slate-600">
                                        VS
                                      </div>

                                      <TeamScore
                                          team={awayTeam}
                                          score={matchup.awayScore}
                                          alignRight
                                          winner={
                                              matchup.awayScore >
                                              matchup.homeScore
                                          }
                                      />
                                    </div>
                                  </div>
                                </div>
                            );
                          }
                      )}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-500">
                      No matchups were found for Week {week}.
                    </div>
                )}
              </section>
          ) : (
              <section>
                <div className="mb-5">
                  <p className="text-sm font-bold text-slate-500">
                    Power ranking
                  </p>

                  <h3 className="text-2xl font-black">
                    League standings
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Sorted by record and then total points
                    scored.
                  </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045]">
                  {rankings.map((team, index) => (
                      <div
                          key={team.id}
                          className="grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-white/[0.07] p-4 last:border-0 sm:grid-cols-[56px_1fr_120px_120px] sm:p-5"
                      >
                        <div className="flex items-center justify-center">
                          {index < 3 ? (
                              <Medal
                                  className={
                                    index === 0
                                        ? "text-amber-300"
                                        : index === 1
                                            ? "text-slate-300"
                                            : "text-orange-400"
                                  }
                              />
                          ) : (
                              <span className="font-black text-slate-500">
                        {index + 1}
                      </span>
                          )}
                        </div>

                        <div className="flex min-w-0 items-center gap-3">
                          <TeamAvatar team={team} small />

                          <div className="min-w-0">
                            <div className="truncate font-bold">
                              {team.name}
                            </div>

                            <div className="truncate text-xs text-slate-500">
                              {team.owner}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-black">
                            {team.wins}-{team.losses}
                            {team.ties > 0
                                ? `-${team.ties}`
                                : ""}
                          </div>

                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                            Record
                          </div>
                        </div>

                        <div className="hidden text-right sm:block">
                          <div className="font-black text-lime-300">
                            {formatScore(team.pointsFor)}
                          </div>

                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                            Points for
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </section>
          )}
        </main>

        {settingsOpen && (
            <div
                className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setSettingsOpen(false);
                  }
                }}
            >
              <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0b1724] p-6 shadow-2xl sm:rounded-3xl sm:p-8">
                <div className="mb-7 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black">
                      Connect ESPN leagues
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Enter both league IDs and season values.
                    </p>
                  </div>

                  <IconButton
                      title="Close settings"
                      onClick={() => setSettingsOpen(false)}
                  >
                    <X />
                  </IconButton>
                </div>

                <div className="space-y-5">
                  {configurations.map(
                      (configuration, index) => (
                          <div
                              key={configuration.id}
                              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                          >
                            <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                              League {index + 1}
                            </div>

                            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_110px]">
                              <label className="text-xs font-bold text-slate-400">
                                Display name

                                <input
                                    value={configuration.name}
                                    onChange={(event) =>
                                        updateConfiguration(
                                            configuration.id,
                                            "name",
                                            event.target.value
                                        )
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                                />
                              </label>

                              <label className="text-xs font-bold text-slate-400">
                                ESPN league ID

                                <input
                                    value={configuration.leagueId}
                                    onChange={(event) =>
                                        updateConfiguration(
                                            configuration.id,
                                            "leagueId",
                                            event.target.value
                                        )
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                                />
                              </label>

                              <label className="text-xs font-bold text-slate-400">
                                Season

                                <input
                                    type="number"
                                    value={configuration.season}
                                    onChange={(event) =>
                                        updateConfiguration(
                                            configuration.id,
                                            "season",
                                            Number(event.target.value)
                                        )
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                                />
                              </label>
                            </div>
                          </div>
                      )
                  )}

                  <label className="block text-xs font-bold text-slate-400">
                    Optional proxy base URL

                    <input
                        value={proxyBaseUrl}
                        onChange={(event) =>
                            setProxyBaseUrl(event.target.value)
                        }
                        placeholder="Example: /espn-proxy"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                    />

                    <span className="mt-2 block font-normal leading-relaxed text-slate-500">
                  Leave this blank to attempt a direct
                  browser request to ESPN.
                </span>
                  </label>

                  <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.07] p-4 text-xs leading-relaxed text-amber-100/75">
                    <strong className="text-amber-200">
                      Private league note:
                    </strong>{" "}
                    Keep ESPN authentication cookies on a
                    server-side proxy. Do not place SWID or
                    espn_s2 values in frontend JavaScript.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={loadBothLeagues}
                        disabled={loading}
                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-lime-300 px-4 py-2.5 font-black text-slate-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                          <CloudDownload className="mr-2 h-4 w-4" />
                      )}

                      {loading
                          ? "Loading leagues..."
                          : "Load both leagues"}
                    </button>

                    <button
                        type="button"
                        onClick={restoreDemoData}
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-bold text-white transition hover:bg-white/10"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Restore demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}