import { Luggage } from "lucide-react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 bg-white rounded-3xl px-8 py-8 shadow-2xl border border-violet-100">
        <Luggage size={44} className="text-primary animate-trolley-bounce" strokeWidth={1.5} />
        <p className="text-sm text-violet-500 font-bold tracking-wide">Caricamento...</p>
      </div>
    </div>
  );
}
