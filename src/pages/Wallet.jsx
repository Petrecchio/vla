import { useState, useEffect, useMemo } from "react";
import { Gem, Ticket, BadgeCheck, MapPinned, ArrowRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";
import { regionNameToId, getRegionById } from "../data/regions";
import Spinner from "../components/Spinner";

export default function WalletPage() {
  const { wallet, useVoucher } = useApp();
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setFakeLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Memoize both from stable deps (wallet.vouchers + filter)
  const { filteredVouchers, groupedByRegion } = useMemo(() => {
    const filtered = wallet.vouchers.filter((v) => {
      if (filter === "active") return !v.used;
      if (filter === "used") return v.used;
      return true;
    });

    const groups = {};
    filtered.forEach((v) => {
      const structure = getStructureById(v.redeemableAt);
      const regionName = structure?.region || "Altro";
      const regionId = regionNameToId[regionName] || "altro";
      if (!groups[regionId]) {
        groups[regionId] = { regionName, regionId, vouchers: [] };
      }
      groups[regionId].vouchers.push(v);
    });

    return { filteredVouchers: filtered, groupedByRegion: Object.values(groups) };
  }, [wallet.vouchers, filter]);

  if (fakeLoading) return <Spinner />;

  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 text-white px-5 pt-8 pb-12 rounded-b-[2.5rem]">
        <h1 className="text-xl font-black mb-1">Il tuo Wallet</h1>
        <p className="text-violet-300 text-sm font-medium">Premi e crediti accumulati</p>

        {/* Credits card */}
        <div className="mt-5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-300 text-xs font-bold uppercase tracking-wider">Crediti VLA</p>
              <p className="text-5xl font-black text-amber-400 mt-1 leading-none">{wallet.credits}</p>
            </div>
            <div className="w-14 h-14 bg-amber-400/20 border border-amber-400/30 rounded-2xl flex items-center justify-center">
              <Gem size={28} className="text-amber-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.min((wallet.credits / 100) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-violet-400 font-bold">{wallet.credits}/100</span>
          </div>
        </div>

        {/* Cross-region banner */}
        <div className="mt-3 bg-amber-400/15 border border-amber-400/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <Globe size={14} className="text-amber-400 shrink-0" />
          <p className="text-[11px] text-amber-300 font-semibold">
            I tuoi bonus sono utilizzabili in tutta Italia!
          </p>
        </div>
      </div>

      {/* Vouchers */}
      <div className="px-4 py-5 -mt-4">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "all", label: "Tutti" },
            { key: "active", label: "Attivi" },
            { key: "used", label: "Usati" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filter === f.key
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-violet-400 border border-violet-100 hover:border-primary/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredVouchers.length === 0 && (
          <div className="text-center py-14 text-violet-300">
            <Ticket size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">Nessun voucher in questa categoria</p>
          </div>
        )}

        {/* Voucher list grouped by region */}
        <div className="space-y-5">
          {groupedByRegion.map((group) => (
            <div key={group.regionId}>
              {/* Region header */}
              <button
                onClick={() => {
                  const region = getRegionById(group.regionId);
                  if (region) navigate(`/region/${group.regionId}`);
                }}
                className="flex items-center gap-2 mb-2.5 w-full text-left group"
              >
                <MapPinned size={14} className="text-primary shrink-0" />
                <span className="text-sm font-black text-violet-950 group-hover:text-primary transition-colors truncate">
                  Spendibili in {group.regionName}
                </span>
                <span className="text-[10px] bg-violet-100 text-primary font-bold px-2 py-0.5 rounded-full shrink-0">
                  {group.vouchers.length}
                </span>
                <ArrowRight size={12} className="ml-auto text-violet-300 group-hover:text-primary transition-colors shrink-0" />
              </button>

              {/* Vouchers */}
              <div className="space-y-3">
                {group.vouchers.map((v) => {
                  const earnedStructure = getStructureById(v.earnedAt);
                  const redeemStructure = getStructureById(v.redeemableAt);

                  return (
                    <div
                      key={v.id}
                      className={`bg-white rounded-2xl p-4 border transition-all ${
                        v.used
                          ? "opacity-60 border-violet-100"
                          : "border-violet-200 shadow-sm shadow-violet-100 hover:shadow-md"
                      }`}
                    >
                      {/* Status + label */}
                      <div className="flex items-center gap-2 mb-1.5">
                        {v.used
                          ? <BadgeCheck size={14} className="text-violet-300 shrink-0" />
                          : <Ticket size={14} className="text-amber-500 shrink-0" />}
                        <span className={`text-[11px] font-black uppercase tracking-wider ${
                          v.used ? "text-violet-300" : "text-amber-600"
                        }`}>
                          {v.used ? "Utilizzato" : "✦ Attivo"}
                        </span>
                      </div>

                      <p className="font-black text-violet-950 text-sm leading-snug">{v.label}</p>

                      {/* Code */}
                      <div className="mt-2 bg-violet-50 border border-violet-100 rounded-lg px-2.5 py-1.5 inline-block">
                        <code className="text-[10px] font-mono text-primary font-bold break-all">
                          {v.code}
                        </code>
                      </div>

                      {/* Earned / Redeemable info */}
                      <div className="mt-2.5 space-y-1">
                        <p className="text-[11px] text-violet-400 flex items-center gap-1 font-medium leading-tight">
                          <MapPinned size={10} className="shrink-0" />
                          <span className="truncate">Guadagnato da: {earnedStructure?.name || "N/D"}</span>
                        </p>
                        <p className="text-[11px] text-primary font-bold flex items-center gap-1 leading-tight">
                          <ArrowRight size={10} className="shrink-0" />
                          <span className="truncate">
                            Utilizzabile:{" "}
                            <span
                              className="underline underline-offset-2 cursor-pointer"
                              onClick={() => navigate(`/structure/${v.redeemableAt}`)}
                            >
                              {redeemStructure?.name || "N/D"}
                            </span>
                          </span>
                        </p>
                      </div>

                      {!v.used && (
                        <button
                          onClick={() => useVoucher(v.id)}
                          className="mt-3 w-full text-xs font-bold text-primary bg-violet-50
                                     py-2.5 rounded-xl hover:bg-violet-100 active:scale-[0.98]
                                     transition-all border border-violet-100"
                        >
                          Segna come utilizzato
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
