import { useState } from "react";
import { X, Send, PartyPopper, Luggage } from "lucide-react";
import TrolleyRating from "./TrolleyRating";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";

const MAX_CHARS = 300;

export default function ReviewModal({ structureId, onClose }) {
  const { submitReview } = useApp();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [step, setStep] = useState("review"); // "review" | "submitting" | "success"
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={22} />
        </button>

        {step === "review" && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-3">
                <Luggage size={28} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Recensisci il tuo soggiorno
              </h2>
              <p className="text-sm text-gray-500 mt-1">{structure?.name}</p>
            </div>

            {/* Trolley Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quanti trolley merità questa esperienza?
              </label>
              <div className="flex justify-center">
                <TrolleyRating value={rating} onChange={setRating} />
              </div>
              {rating > 0 && (
                <p className="text-center text-xs text-primary mt-2 font-medium">
                  {rating === 1 && "Nella norma"}
                  {rating === 2 && "Ottima esperienza!"}
                  {rating === 3 && "Eccezionale! 🎉"}
                </p>
              )}
            </div>

            {/* Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Racconta la tua esperienza
              </label>
              <textarea
                value={text}
                onChange={(e) =>
                  setText(e.target.value.slice(0, MAX_CHARS))
                }
                placeholder="Descrivi cosa ti è piaciuto del soggiorno..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           transition-all placeholder:text-gray-400"
              />
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-[11px] text-gray-400">
                  Minimo 10 caratteri
                </span>
                <span
                  className={`text-xs font-mono ${
                    charCount >= MAX_CHARS
                      ? "text-red-500 font-semibold"
                      : charCount > MAX_CHARS * 0.8
                        ? "text-amber-500"
                        : "text-gray-400"
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white
                         font-semibold py-3.5 rounded-xl transition-all duration-200
                         hover:bg-primary-dark active:scale-[0.98]
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              <Send size={18} />
              Invia Recensione
            </button>
          </>
        )}

        {step === "submitting" && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Luggage
              size={48}
              className="text-primary animate-trolley-bounce"
            />
            <p className="text-gray-500 font-medium">
              Invio in corso...
            </p>
          </div>
        )}

        {step === "success" && reward && (
          <div className="py-6 text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
              <PartyPopper size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Premio Sbloccato! 🎉
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Grazie per la tua recensione! Hai guadagnato{" "}
              <span className="font-bold text-primary">{rating * 5} crediti</span>
            </p>

            {/* Voucher card */}
            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-2xl p-4 mb-4 text-left border border-primary/10">
              <p className="text-xs text-gray-500 mb-1">Il tuo nuovo premio:</p>
              <p className="font-bold text-gray-900">{reward.voucher.label}</p>
              <p className="text-xs text-primary mt-1">
                Utilizzabile presso:{" "}
                <span className="font-semibold">
                  {reward.rewardStructure.name}
                </span>
              </p>
              <div className="mt-2 bg-white rounded-lg px-3 py-1.5 inline-block">
                <code className="text-xs font-mono text-primary-dark font-bold">
                  {reward.voucher.code}
                </code>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mb-4">
              💡 Ricorda: i premi sono utilizzabili solo in altre strutture della rete VLA
            </p>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]"
            >
              Fantastico!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
