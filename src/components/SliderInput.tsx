import { useState, useEffect } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  onChange: (value: number) => void;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  onChange,
}: SliderInputProps) {
  const [draft, setDraft] = useState<string>(String(value));
  const [editing, setEditing] = useState(false);

  // Sync draft when value changes externally (e.g. slider)
  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  const commitValue = (raw: string) => {
    const v = parseFloat(raw);
    if (isNaN(v)) {
      setDraft(String(value));
      return;
    }
    const clamped = Math.min(max, Math.max(min, v));
    onChange(clamped);
    setDraft(String(clamped));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-white/80 text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-gold text-sm">{prefix}</span>}
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={editing ? draft : value}
            min={min}
            max={max}
            step={step}
            onFocus={() => {
              setEditing(true);
              setDraft(String(value));
            }}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              setEditing(false);
              commitValue(draft);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="w-20 bg-navy border border-white/20 rounded px-2 py-1 text-right text-gold font-semibold text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
