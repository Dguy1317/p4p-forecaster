import { type Sport, sportConfigs } from "../data/sportDefaults";

interface SportSelectorProps {
  selected: Sport | null;
  onSelect: (sport: Sport) => void;
}

const sports: Sport[] = ["gaa", "rugby", "soccer"];

export function SportSelector({ selected, onSelect }: SportSelectorProps) {
  return (
    <section className="px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-2xl font-bold text-center text-white mb-8">
        Select Your Sport
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sports.map((sport) => {
          const config = sportConfigs[sport];
          const isSelected = selected === sport;
          return (
            <button
              key={sport}
              onClick={() => onSelect(sport)}
              className={`
                rounded-xl p-6 text-center transition-all duration-200
                border-2 cursor-pointer
                ${
                  isSelected
                    ? "border-gold bg-navy-light shadow-lg shadow-gold/10"
                    : "border-white/10 bg-navy-card hover:border-white/30"
                }
              `}
            >
              <span className="text-4xl block mb-3">{config.icon}</span>
              <h3 className="font-heading font-bold text-xl text-white">
                {config.label}
              </h3>
              <p className="text-white/50 text-sm mt-1">{config.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
