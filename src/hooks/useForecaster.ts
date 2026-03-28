import { useState, useMemo, useCallback } from "react";
import { type Sport, sportConfigs } from "../data/sportDefaults";
import { calculateForecast, type ForecastResult } from "../utils/forecast";

export interface ForecasterState {
  sport: Sport | null;
  players: number;
  sponsorsPerPlayer: number;
  gamesPerSeason: number;
  avgScorePerGame: number;
  ratePerUnit: number;
  capPerGame: number;
  isAdvanced: boolean;
}

export function useForecaster() {
  const [state, setState] = useState<ForecasterState>({
    sport: null,
    players: 30,
    sponsorsPerPlayer: 3,
    gamesPerSeason: 15,
    avgScorePerGame: 15,
    ratePerUnit: 0.5,
    capPerGame: 5,
    isAdvanced: false,
  });

  const selectSport = useCallback((sport: Sport) => {
    const config = sportConfigs[sport];
    setState({
      sport,
      ...config.defaults,
      isAdvanced: false,
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof ForecasterState>(field: K, value: ForecasterState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleAdvanced = useCallback(() => {
    setState((prev) => ({ ...prev, isAdvanced: !prev.isAdvanced }));
  }, []);

  const result: ForecastResult | null = useMemo(() => {
    if (!state.sport) return null;
    return calculateForecast({
      players: state.players,
      sponsorsPerPlayer: state.sponsorsPerPlayer,
      gamesPerSeason: state.gamesPerSeason,
      avgScorePerGame: state.avgScorePerGame,
      ratePerUnit: state.ratePerUnit,
      capPerGame: state.capPerGame,
      isAdvanced: state.isAdvanced,
    });
  }, [state]);

  const sportConfig = state.sport ? sportConfigs[state.sport] : null;

  return {
    state,
    result,
    sportConfig,
    selectSport,
    updateField,
    toggleAdvanced,
  };
}
