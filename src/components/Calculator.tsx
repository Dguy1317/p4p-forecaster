import { type SportConfig } from "../data/sportDefaults";
import { type ForecasterState } from "../hooks/useForecaster";
import { SliderInput } from "./SliderInput";

interface CalculatorProps {
  state: ForecasterState;
  sportConfig: SportConfig;
  onUpdate: <K extends keyof ForecasterState>(
    field: K,
    value: ForecasterState[K]
  ) => void;
  onToggleAdvanced: () => void;
}

export function Calculator({
  state,
  sportConfig,
  onUpdate,
  onToggleAdvanced,
}: CalculatorProps) {
  const { ranges } = sportConfig;

  return (
    <section className="px-6 max-w-2xl mx-auto mt-12">
      <div className="bg-navy-card border border-white/10 rounded-2xl p-8 space-y-6">
        <h2 className="font-heading text-xl font-bold text-white">
          Your Club Details
        </h2>

        <SliderInput
          label="Number of Players"
          value={state.players}
          min={ranges.players.min}
          max={ranges.players.max}
          onChange={(v) => onUpdate("players", v)}
        />

        <SliderInput
          label="Sponsors per Player"
          value={state.sponsorsPerPlayer}
          min={ranges.sponsorsPerPlayer.min}
          max={ranges.sponsorsPerPlayer.max}
          onChange={(v) => onUpdate("sponsorsPerPlayer", v)}
        />

        <SliderInput
          label="Games per Season"
          value={state.gamesPerSeason}
          min={ranges.gamesPerSeason.min}
          max={ranges.gamesPerSeason.max}
          onChange={(v) => onUpdate("gamesPerSeason", v)}
        />

        <div className="border-t border-white/10 pt-4">
          <button
            onClick={onToggleAdvanced}
            className="text-gold/70 hover:text-gold text-sm font-medium transition-colors cursor-pointer"
          >
            {state.isAdvanced ? "← Simple Mode" : "Advanced Mode →"}
          </button>
        </div>

        {state.isAdvanced && (
          <div className="space-y-6 pt-2">
            <p className="text-white/40 text-xs">
              Adjust performance-based scoring. Defaults match a typical{" "}
              {sportConfig.label} season.
            </p>

            <SliderInput
              label={`Avg ${sportConfig.scoringMetric} per game`}
              value={state.avgScorePerGame}
              min={ranges.avgScorePerGame.min}
              max={ranges.avgScorePerGame.max}
              onChange={(v) => onUpdate("avgScorePerGame", v)}
            />

            <SliderInput
              label={`Amount per ${sportConfig.scoringMetric === "points" ? "point" : "goal"}`}
              value={state.ratePerUnit}
              min={ranges.ratePerUnit.min}
              max={ranges.ratePerUnit.max}
              step={ranges.ratePerUnit.step}
              prefix="€"
              onChange={(v) => onUpdate("ratePerUnit", v)}
            />

            <SliderInput
              label="Cap per sponsor per game"
              value={state.capPerGame}
              min={ranges.capPerGame.min}
              max={ranges.capPerGame.max}
              step={ranges.capPerGame.step}
              prefix="€"
              onChange={(v) => onUpdate("capPerGame", v)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
