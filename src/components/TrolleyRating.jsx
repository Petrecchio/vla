import { Luggage } from "lucide-react";

export default function TrolleyRating({ value, onChange, max = 3 }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        const isActive = idx <= value;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(idx)}
            className={`transition-all duration-200 p-2 rounded-xl ${
              isActive
                ? "text-primary bg-primary/10 scale-110"
                : "text-gray-300 hover:text-gray-400 hover:bg-gray-50"
            }`}
            aria-label={`${idx} trolley`}
          >
            <Luggage
              size={36}
              strokeWidth={isActive ? 2 : 1.2}
              fill={isActive ? "currentColor" : "none"}
              className={isActive ? "drop-shadow-md" : ""}
            />
          </button>
        );
      })}
    </div>
  );
}
