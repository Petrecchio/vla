import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Gift,
  Percent,
  Luggage,
} from "lucide-react";
import { getStructureById } from "../data/structures";
import ReviewModal from "../components/ReviewModal";
import Spinner from "../components/Spinner";

export default function StructureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(true);

  const structure = getStructureById(id);

  useEffect(() => {
    const t = setTimeout(() => setFakeLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (fakeLoading) return <Spinner />;
  if (!structure) {
    return (
      <div className="min-h-svh flex items-center justify-center text-gray-500">
        Struttura non trovata
      </div>
    );
  }

  return (
    <div className="pb-safe">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80">
        <img
          src={structure.image}
          alt={structure.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full
                     shadow-md transition-transform active:scale-90"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>

        {/* Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-dark px-3 py-1 rounded-full mb-2">
            {structure.type}
          </span>
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            {structure.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-white/90">
              <MapPin size={14} />
              <span className="text-sm">{structure.city}, {structure.region}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-300">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-semibold">{structure.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
            Descrizione
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {structure.description}
          </p>
        </div>

        {/* Offers */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
            Offerte Riscattabili
          </h2>
          <div className="space-y-2.5">
            {structure.offers.map((offer) => (
              <div
                key={offer.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                  offer.type === "discount"
                    ? "bg-emerald-50/50 border-emerald-100"
                    : "bg-amber-50/50 border-amber-100"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    offer.type === "discount"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {offer.type === "discount" ? (
                    <Percent size={18} />
                  ) : (
                    <Gift size={18} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {offer.label}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {offer.type === "discount"
                      ? `Risparmia il ${offer.value}%`
                      : "Omaggio incluso"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setShowReview(true)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white
                     font-bold py-4 rounded-xl transition-all hover:bg-primary-dark
                     active:scale-[0.98] shadow-lg shadow-primary/25"
        >
          <Luggage size={20} />
          Lascia una Recensione Trolley
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-3">
          Dopo aver pernottato e fatto scansionare il tuo QR code
        </p>
      </div>

      {/* Review Modal */}
      {showReview && (
        <ReviewModal
          structureId={structure.id}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
}
