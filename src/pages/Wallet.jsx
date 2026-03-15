import { useState, useEffect } from "react";
import {
  Sparkles,
  Ticket,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";
import Spinner from "../components/Spinner";

export default function WalletPage() {
  const { wallet, useVoucher } = useApp();
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all" | "active" | "used"

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
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white px-5 pt-8 pb-10 rounded-b-[2rem]">
        <h1 className="text-xl font-bold mb-1">Il tuo Wallet</h1>
        <p className="text-white/60 text-sm">Premi e crediti accumulati</p>

        {/* Credits card */}
        <div className="mt-5 bg-white/15 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs font-medium">Crediti Totali</p>
              <p className="text-4xl font-bold mt-1">{wallet.credits}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles size={28} className="text-accent-light" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-light rounded-full transition-all duration-500"
                style={{ width: `${Math.min((wallet.credits / 100) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-white/60">
              {wallet.credits}/100
            </span>
          </div>
        </div>
      </div>

      {/* Vouchers */}
      <div className="px-4 py-6 -mt-4">
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
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                filter === f.key
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Voucher list */}
        <div className="space-y-3">
          {filteredVouchers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Ticket size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">Nessun voucher in questa categoria</p>
            </div>
          )}

          {filteredVouchers.map((v) => {
            const earnedStructure = getStructureById(v.earnedAt);
            const redeemStructure = getStructureById(v.redeemableAt);

            return (
              <div
                key={v.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                  v.used
                    ? "opacity-60 border-gray-100"
                    : "border-primary/10 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {v.used ? (
                        <CheckCircle2
                          size={16}
                          className="text-gray-400"
                        />
                      ) : (
                        <Ticket size={16} className="text-primary" />
                      )}
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider ${
                          v.used ? "text-gray-400" : "text-primary"
                        }`}
                      >
                        {v.used ? "Utilizzato" : "Attivo"}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">
                      {v.label}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <MapPin size={10} />
                        Guadagnato da: {earnedStructure?.name || "N/D"}
                      </p>
                      <p className="text-[11px] text-primary font-medium flex items-center gap-1">
                        <ArrowRight size={10} />
                        Utilizzabile presso:{" "}
                        <span
                          className="underline cursor-pointer"
                          onClick={() =>
                            navigate(`/structure/${v.redeemableAt}`)
                          }
                        >
                          {redeemStructure?.name || "N/D"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="bg-gray-50 rounded-lg px-2 py-1">
                      <code className="text-[10px] font-mono text-gray-600 font-bold whitespace-nowrap">
                        {v.code}
                      </code>
                    </div>
                  </div>
                </div>

                {!v.used && (
                  <button
                    onClick={() => useVoucher(v.id)}
                    className="mt-3 w-full text-xs font-semibold text-primary bg-primary/5
                               py-2 rounded-lg hover:bg-primary/10 transition-colors"
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
