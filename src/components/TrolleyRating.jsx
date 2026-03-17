import { Luggage } from "lucide-react";

export default function TrolleyRating({ value, onChange, max = 3 }) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        const isActive = idx <= value;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(idx)}
            className={`transition-all duration-200 p-2.5 rounded-2xl ${
              isActive
                ? "scale-110 bg-amber-100 shadow-md shadow-amber-200"
                : "hover:bg-violet-50"
            }`}
            aria-label={`${idx} trolley`}
          >
            <Luggage
              size={38}
              strokeWidth={isActive ? 2.2 : 1.4}
              className={isActive ? "text-amber-500" : "text-violet-200"}
            />
          </button>
        );
      })}
    </div>
  );
}
