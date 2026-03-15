import { Luggage } from "lucide-react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Luggage
          size={48}
          className="text-primary animate-trolley-bounce"
          strokeWidth={1.5}
        />
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          Caricamento...
        </p>
      </div>
    </div>
  );
}
