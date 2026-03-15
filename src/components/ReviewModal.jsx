import { useState } from "react";
import { X, SendHorizonal, Trophy, Luggage } from "lucide-react";
import TrolleyRating from "./TrolleyRating";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";

const MAX_CHARS = 300;

export default function ReviewModal({ structureId, onClose }) {
  const { submitReview } = useApp();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [step, setStep] = useState("review");
  const [reward, setReward] = useState(null);

  const structure = getStructureById(structureId);
  const charCount = text.length;
  const canSubmit = rating > 0 && text.trim().length >= 10;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStep("submitting");
    const result = await submitReview(structureId, rating, text);
    setReward(result);
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-violet-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-violet-300 hover:text-violet-600 transition-colors">
          <X size={22} />
        </button>

        {/* ── FORM ── */}
        {step === "review" && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-100 rounded-2xl mb-3">
                <Luggage size={28} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-violet-950">Recensisci il soggiorno</h2>
              <p className="text-sm text-violet-400 mt-1">{structure?.name}</p>
            </div>

            {/* Trolley Rating */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-violet-800 mb-3">
                Quanti trolley merità questa esperienza?
              </label>
              <div className="flex justify-center">
                <TrolleyRating value={rating} onChange={setRating} />
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-amber-600 font-bold mt-2">
                  {rating === 1 && "Nella norma"}
                  {rating === 2 && "Ottima esperienza!"}
                  {rating === 3 && "Eccezionale! 🎉"}
                </p>
              )}
            </div>

            {/* Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-violet-800 mb-2">
                Racconta la tua esperienza
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                placeholder="Descrivi cosa ti è piaciuto del soggiorno..."
                rows={4}
                className="w-full resize-none rounded-xl border border-violet-200 p-3 text-sm text-violet-900
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           transition-all placeholder:text-violet-300 bg-violet-50/40"
              />
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-[11px] text-violet-400">Minimo 10 caratteri</span>
                <span className={`text-xs font-mono font-bold ${
                  charCount >= MAX_CHARS ? "text-red-500" : charCount > MAX_CHARS * 0.8 ? "text-amber-500" : "text-violet-300"
                }`}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white
                         font-bold py-3.5 rounded-xl transition-all hover:bg-primary-dark
                         active:scale-[0.98] shadow-lg shadow-primary/30
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SendHorizonal size={18} />
              Invia Recensione
            </button>
          </>
        )}

        {/* ── LOADING ── */}
        {step === "submitting" && (
          <div className="py-14 flex flex-col items-center gap-4">
            <Luggage size={48} className="text-primary animate-trolley-bounce" />
            <p className="text-violet-500 font-medium">Invio in corso...</p>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && reward && (
          <div className="py-4 text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
              <Trophy size={40} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-violet-950 mb-1">Premio Sbloccato! 🎉</h2>
            <p className="text-sm text-violet-500 mb-5">
              Hai guadagnato{" "}
              <span className="font-bold text-amber-600">{rating * 5} crediti VLA</span>
            </p>

            {/* Voucher */}
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/60 rounded-2xl p-4 mb-4 text-left border border-violet-200">
              <p className="text-[11px] text-violet-400 font-semibold uppercase tracking-wider mb-1">Il tuo premio</p>
              <p className="font-bold text-violet-900">{reward.voucher.label}</p>
              <p className="text-xs text-primary font-semibold mt-1">
                📍 Utilizzabile presso: {reward.rewardStructure.name}
              </p>
              <div className="mt-3 bg-white rounded-lg px-3 py-2 inline-block border border-violet-100">
                <code className="text-sm font-mono text-primary font-bold tracking-wider">
                  {reward.voucher.code}
                </code>
              </div>
            </div>

            <p className="text-[11px] text-violet-400 mb-5">
              💡 I premi VLA sono utilizzabili solo in altre strutture della rete
            </p>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]
                         shadow-lg shadow-primary/30"
            >
              Fantastico!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
