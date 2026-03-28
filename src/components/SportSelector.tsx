import { type Sport, sportConfigs } from "../data/sportDefaults";

interface SportSelectorProps {
  selected: Sport | null;
  onSelect: (sport: Sport) => void;
}

const sports: Sport[] = ["gaa", "rugby", "soccer"];

export function SportSelector({ selected, onSelect }: SportSelectorProps) {
  return (
    <section className="px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-2xl font-bold text-center text-white mb-6">
        Select Your Sport
      </h2>
      <div className="flex justify-center gap-2 sm:gap-4">
        {sports.map((sport) => {
          const config = sportConfigs[sport];
          const isSelected = selected === sport;
          return (
            <button
              key={sport}
              onClick={() => onSelect(sport)}
              className={`
                rounded-full px-5 py-2.5 sm:rounded-xl sm:px-8 sm:py-5
                text-center transition-all duration-200
                border-2 cursor-pointer flex items-center gap-2 sm:flex-col sm:gap-1
                ${
                  isSelected
                    ? "border-gold bg-navy-light shadow-lg shadow-gold/10"
                    : "border-white/10 bg-navy-card hover:border-white/30"
                }
              `}
            >
              <span className="text-xl sm:text-3xl">{config.icon}</span>
              <h3 className="font-heading font-bold text-sm sm:text-xl text-white">
                {config.label}
              </h3>
              <p className="text-white/50 text-xs mt-0 hidden sm:block">{config.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
