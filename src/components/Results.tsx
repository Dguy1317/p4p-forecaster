import { type ForecastResult } from "../utils/forecast";

interface ResultsProps {
  result: ForecastResult;
  players: number;
}

function formatEuro(value: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function Results({ result, players }: ResultsProps) {
  return (
    <section className="px-6 max-w-4xl mx-auto mt-12">
      {/* Primary Figure */}
      <div className="text-center py-10">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">
          Estimated Season Total
        </p>
        <p className="font-heading text-5xl md:text-7xl font-bold text-gold">
          {formatEuro(result.seasonTotal)}
        </p>
      </div>

      {/* Comparison Strip */}
      <div className="mt-8 bg-navy-card border border-white/10 rounded-xl p-6">
        <p className="text-white/50 text-sm text-center mb-4">
          See how it scales with more players
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.seasonTotal)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players} players</p>
          </div>
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.atDoubleScale)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players * 2} players</p>
          </div>
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.atTripleScale)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players * 3} players</p>
          </div>
        </div>
      </div>
    </section>
  );
}
