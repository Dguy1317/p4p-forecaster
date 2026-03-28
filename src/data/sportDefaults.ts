export type Sport = "gaa" | "rugby" | "soccer";

export interface SportConfig {
  label: string;
  icon: string;
  description: string;
  scoringMetric: string;
  defaults: {
    players: number;
    sponsorsPerPlayer: number;
    gamesPerSeason: number;
    avgScorePerGame: number;
    ratePerUnit: number;
    capPerGame: number;
  };
  ranges: {
    players: { min: number; max: number };
    sponsorsPerPlayer: { min: number; max: number };
    gamesPerSeason: { min: number; max: number };
    avgScorePerGame: { min: number; max: number };
    ratePerUnit: { min: number; max: number; step: number };
    capPerGame: { min: number; max: number; step: number };
  };
}

export const sportConfigs: Record<Sport, SportConfig> = {
  gaa: {
    label: "GAA",
    icon: "🏐",
    description: "Sponsor per point scored",
    scoringMetric: "points",
    defaults: {
      players: 30,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 15,
      avgScorePerGame: 15,
      ratePerUnit: 0.5,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 1, max: 40 },
      ratePerUnit: { min: 0.1, max: 2.0, step: 0.1 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
  rugby: {
    label: "Rugby",
    icon: "🏉",
    description: "Sponsor per point and per match",
    scoringMetric: "points",
    defaults: {
      players: 30,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 15,
      avgScorePerGame: 20,
      ratePerUnit: 0.5,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 1, max: 50 },
      ratePerUnit: { min: 0.1, max: 2.0, step: 0.1 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
  soccer: {
    label: "Soccer",
    icon: "⚽",
    description: "Sponsor per goal scored",
    scoringMetric: "goals",
    defaults: {
      players: 25,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 18,
      avgScorePerGame: 2,
      ratePerUnit: 3,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 0, max: 10 },
      ratePerUnit: { min: 1, max: 5, step: 0.5 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
};
