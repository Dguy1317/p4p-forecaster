export interface ForecastInput {
  players: number;
  sponsorsPerPlayer: number;
  gamesPerSeason: number;
  avgScorePerGame: number;
  ratePerUnit: number;
  capPerGame: number;
  isAdvanced: boolean;
}

export interface ForecastResult {
  seasonTotal: number;
  perGame: number;
  perMonth: number;
  perPlayer: number;
  perSponsorPerGame: number;
  atDoubleScale: number;
  atTripleScale: number;
}

const SIMPLE_MODE_RATE = 5;
const SEASON_MONTHS = 10;

export function calculateForecast(input: ForecastInput): ForecastResult {
  const perSponsorPerGame = input.isAdvanced
    ? Math.min(input.avgScorePerGame * input.ratePerUnit, input.capPerGame)
    : SIMPLE_MODE_RATE;

  const seasonTotal =
    input.players *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  const perGame = input.players * input.sponsorsPerPlayer * perSponsorPerGame;
  const perMonth = seasonTotal / SEASON_MONTHS;
  const perPlayer = input.players > 0 ? seasonTotal / input.players : 0;

  const atDoubleScale =
    input.players * 2 *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  const atTripleScale =
    input.players * 3 *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  return {
    seasonTotal,
    perGame,
    perMonth,
    perPlayer,
    perSponsorPerGame,
    atDoubleScale,
    atTripleScale,
  };
}
