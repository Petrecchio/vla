import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPinned, Ticket } from "lucide-react";
import { getRegionById } from "../data/regions";
import { getStructuresByRegion } from "../data/structures";
import { useApp } from "../context/AppContext";
import FlashCard from "../components/FlashCard";
import Spinner from "../components/Spinner";

export default function RegionPage() {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const { wallet } = useApp();
  const [fakeLoading, setFakeLoading] = useState(true);

  const region = getRegionById(regionId);

  const regionStructures = useMemo(
    () => (region ? getStructuresByRegion(region.name) : []),
    [region]
  );

  // Vouchers redeemable in this region's structures
  const regionVouchers = useMemo(() => {
    const structureIds = new Set(regionStructures.map((s) => s.id));
    return wallet.vouchers.filter(
      (v) => !v.used && structureIds.has(v.redeemableAt)
    );
  }, [regionStructures, wallet.vouchers]);

  useEffect(() => {
    const t = setTimeout(() => setFakeLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (fakeLoading) return <Spinner />;

  if (!region) {
    return (
      <div className="min-h-svh flex items-center justify-center text-violet-400">
        Regione non trovata
      </div>
    );
  }

  return (
    <div className="pb-safe">
      {/* Hero */}
      <div className="relative h-56 sm:h-72">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-950/30 to-violet-950/20" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full
                     shadow-md transition-transform active:scale-90"
        >
          <ArrowLeft size={20} className="text-violet-900" />
        </button>

        {/* Region title */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPinned size={14} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Rete VLA
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">{region.name}</h1>
          <p className="text-violet-200 text-sm mt-1 font-medium">{region.description}</p>
        </div>
      </div>

      <div className="px-4 py-5 -mt-2">
        {/* Voucher banner */}
        {regionVouchers.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-center gap-3 animate-fade-in-up">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Ticket size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-black text-amber-900">
                Hai {regionVouchers.length} {regionVouchers.length === 1 ? "voucher" : "voucher"} da spendere qui!
              </p>
              <p className="text-xs text-amber-600 font-medium mt-0.5">
                Seleziona una struttura per utilizzarlo
              </p>
            </div>
          </div>
        )}

        {/* Structures grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-violet-950">
            Strutture in {region.name}
          </h2>
          <span className="text-xs text-violet-400 font-semibold bg-violet-100 px-2.5 py-1 rounded-full">
            {regionStructures.length} disponibil{regionStructures.length === 1 ? "e" : "i"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {regionStructures.map((s) => (
            <FlashCard key={s.id} structure={s} />
          ))}
        </div>

        {regionStructures.length === 0 && (
          <div className="text-center py-14 text-violet-300">
            <MapPinned size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">Nessuna struttura in questa regione</p>
          </div>
        )}
      </div>
    </div>
  );
}
