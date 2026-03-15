import { useState, useEffect } from "react";
import { Gem, Ticket, BadgeCheck, MapPinned, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";
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

  if (fakeLoading) return <Spinner />;

  const filteredVouchers = wallet.vouchers.filter((v) => {
    if (filter === "active") return !v.used;
    if (filter === "used") return v.used;
    return true;
  });

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

        {/* Voucher list */}
        <div className="space-y-3">
          {filteredVouchers.length === 0 && (
            <div className="text-center py-14 text-violet-300">
              <Ticket size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Nessun voucher in questa categoria</p>
            </div>
          )}

          {filteredVouchers.map((v) => {
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
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {v.used
                        ? <BadgeCheck size={15} className="text-violet-300" />
                        : <Ticket size={15} className="text-amber-500" />}
                      <span className={`text-[11px] font-black uppercase tracking-wider ${
                        v.used ? "text-violet-300" : "text-amber-600"
                      }`}>
                        {v.used ? "Utilizzato" : "✦ Attivo"}
                      </span>
                    </div>
                    <p className="font-black text-violet-950 text-sm">{v.label}</p>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-[11px] text-violet-400 flex items-center gap-1 font-medium">
                        <MapPinned size={10} />
                        Guadagnato da: {earnedStructure?.name || "N/D"}
                      </p>
                      <p className="text-[11px] text-primary font-bold flex items-center gap-1">
                        <ArrowRight size={10} />
                        Utilizzabile:{" "}
                        <span
                          className="underline underline-offset-2 cursor-pointer"
                          onClick={() => navigate(`/structure/${v.redeemableAt}`)}
                        >
                          {redeemStructure?.name || "N/D"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div className="bg-violet-50 border border-violet-100 rounded-xl px-2 py-1.5">
                      <code className="text-[10px] font-mono text-primary font-black whitespace-nowrap">
                        {v.code}
                      </code>
                    </div>
                  </div>
                </div>

                {!v.used && (
                  <button
                    onClick={() => useVoucher(v.id)}
                    className="mt-3 w-full text-xs font-bold text-primary bg-violet-50
                               py-2 rounded-xl hover:bg-violet-100 transition-colors border border-violet-100"
                  >
                    Segna come utilizzato
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
