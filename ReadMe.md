# ESPN Fantasy Football League Hub

A Vite and React web application that displays weekly matchups, scores, standings, and rankings for two ESPN Fantasy Football leagues.

The application loads league configuration from `public/config.js`, requests league data from ESPN, converts the ESPN response into a frontend-friendly format, and displays the teams in the browser.

> Important: ESPN's Fantasy API is an undocumented internal API. It may change without notice and is not an officially supported public API. The API commonly uses the league endpoint with views such as `mTeam`, `mMatchup`, `mMatchupScore`, `mStandings`, and `mSettings`.

## Features

- Supports two ESPN Fantasy Football leagues
- Configurable league IDs
- Configurable season
- Configurable league display names
- Weekly matchup navigation
- Team names and owners
- Current records
- Points scored
- League standings
- Power rankings
- Demo data for development
- Browser local storage
- Optional server-side ESPN proxy
- Responsive Tailwind CSS interface
- Clear error messages for failed ESPN requests

## Technology

- React
- Vite
- Tailwind CSS
- Lucide React icons
- ESPN Fantasy API

## Project Structure

```text
FFLeagueJoiner/
├── public/
│   └── config.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js