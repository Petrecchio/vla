import { useState } from "react";
import {
  QrCode,
  ScanLine,
  X,
  CheckCircle2,
  XCircle,
  User,
  LogOut,
  PartyPopper,
  ArrowRight,
  MapPin,
  History,
  Ticket,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

// ── QR Scan Modal ──────────────────────────────────────────
function QRScanModal({ structure, onClose }) {
  const { scanQR, assignPrize, loading } = useApp();
  // "input" | "scanning" | "valid" | "invalid" | "assigning" | "success"
  const [step, setStep] = useState("input");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");
  const [scannedGuest, setScannedGuest] = useState(null);
  const [reward, setReward] = useState(null);

  const DEMO_QR = "VLA-USR-001-MARCO-ROSSI";

  const handleScan = async () => {
    if (!qrValue.trim()) return;
    setStep("scanning");
    const result = await scanQR(qrValue, structure.id);
    if (result.valid) {
      setScannedGuest(result.guest);
      setStep("valid");
    } else {
      setError(result.reason);
      setStep("invalid");
    }
  };

  const handleAssign = async () => {
    setStep("assigning");
    const result = await assignPrize(structure.id, scannedGuest.id);
    setReward(result);
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={22} />
        </button>

        {/* ── INPUT ── */}
        {step === "input" && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-3">
                <ScanLine size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Scansiona QR Ospite</h2>
              <p className="text-sm text-gray-500 mt-1">
                Inserisci il codice QR dell'ospite
              </p>
            </div>

            {/* Fake scanner viewfinder */}
            <div className="relative bg-gray-900 rounded-2xl h-44 flex items-center justify-center mb-4 overflow-hidden">
              <div className="absolute inset-4 border-2 border-white/20 rounded-xl" />
              {/* Corner brackets */}
              {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-6 h-6 border-primary border-2 ${
                    i < 2 ? "border-b-0" : "border-t-0"
                  } ${i % 2 === 0 ? "border-r-0" : "border-l-0"}`}
                />
              ))}
              <div className="text-center z-10">
                <QrCode size={40} className="text-white/30 mx-auto mb-2" />
                <p className="text-white/40 text-xs">
                  Inquadra il QR code dell'ospite
                </p>
              </div>
              {/* Animated scan line */}
              <div className="absolute inset-x-8 h-0.5 bg-primary/60 animate-bounce top-1/2" />
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Oppure inserisci il codice manualmente..."
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="w-full pr-4 pl-4 py-3 bg-gray-50 rounded-xl text-sm font-mono
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           border border-transparent transition-all"
              />
            </div>

            {/* Demo shortcut */}
            <button
              onClick={() => setQrValue(DEMO_QR)}
              className="w-full text-xs text-primary bg-primary/5 py-2.5 rounded-xl mb-4
                         hover:bg-primary/10 transition-colors font-medium"
            >
              📲 Simula scansione ospite demo ({DEMO_QR})
            </button>

            <button
              onClick={handleScan}
              disabled={!qrValue.trim()}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Valida QR Code
            </button>
          </>
        )}

        {/* ── SCANNING ── */}
        {step === "scanning" && (
          <div className="py-14 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Validazione in corso...</p>
          </div>
        )}

        {/* ── VALID ── */}
        {step === "valid" && scannedGuest && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-3">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">QR Valido ✓</h2>
            </div>

            {/* Guest card */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <User size={22} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{scannedGuest.name}</p>
                  <p className="text-xs text-gray-500">
                    Membro VLA dal {scannedGuest.memberSince}
                  </p>
                  <p className="text-xs text-gray-400">
                    {scannedGuest.totalNights} notti totali nella rete
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 text-sm text-amber-700">
              <strong>Regola cross-network:</strong> il premio verrà assegnato per
              una struttura <em>diversa</em> dalla tua.
            </div>

            <button
              onClick={handleAssign}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]
                         flex items-center justify-center gap-2"
            >
              <PartyPopper size={18} />
              Assegna Premio
            </button>
          </>
        )}

        {/* ── INVALID ── */}
        {step === "invalid" && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
                <XCircle size={32} className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">QR Non Valido</h2>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
            <button
              onClick={() => { setStep("input"); setQrValue(""); setError(""); }}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl
                         hover:bg-gray-200 transition-colors"
            >
              Riprova
            </button>
          </>
        )}

        {/* ── ASSIGNING ── */}
        {step === "assigning" && (
          <div className="py-14 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Assegnazione premio...</p>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && reward && (
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
              <PartyPopper size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premio Assegnato!</h2>
            <p className="text-sm text-gray-500 mb-5">
              Il premio è stato aggiunto al wallet dell'ospite
            </p>

            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-2xl p-4 mb-5 text-left border border-primary/10">
              <p className="text-xs text-gray-500 mb-1">Premio assegnato:</p>
              <p className="font-bold text-gray-900">{reward.voucher.label}</p>
              <p className="text-xs text-primary mt-1 flex items-center gap-1">
                <ArrowRight size={12} />
                Utilizzabile presso:{" "}
                <span className="font-semibold ml-0.5">{reward.rewardStructure.name}</span>
              </p>
              <div className="mt-2 bg-white rounded-lg px-3 py-1.5 inline-block">
                <code className="text-xs font-mono text-primary-dark font-bold">
                  {reward.voucher.code}
                </code>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mb-5">
              💡 Il premio è spendibile solo in un'altra struttura della rete, non qui
            </p>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]"
            >
              Chiudi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main StructureDashboard ───────────────────────────────
export default function StructureDashboard() {
  const { structureUser, logout, scans, wallet } = useApp();
  const navigate = useNavigate();
  const [showScan, setShowScan] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const myScansCount = (scans[structureUser?.id] || []).length;

  // Vouchers earned AT this structure (visible to the manager as proof)
  const myVouchers = wallet.vouchers.filter(
    (v) => v.earnedAt === structureUser?.id
  );

  return (
    <div className="min-h-svh bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white px-5 pt-8 pb-10 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
              Pannello Struttura
            </p>
            <h1 className="text-xl font-bold mt-0.5">{structureUser?.name}</h1>
            <p className="text-white/60 text-sm flex items-center gap-1 mt-0.5">
              <MapPin size={12} />
              {structureUser?.city}, {structureUser?.region}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/15 p-2 rounded-xl hover:bg-white/25 transition-colors"
          >
            <LogOut size={20} className="text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold">{myScansCount}</p>
            <p className="text-white/60 text-xs mt-0.5">QR scansionati oggi</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold">{myVouchers.length}</p>
            <p className="text-white/60 text-xs mt-0.5">Premi assegnati totali</p>
          </div>
        </div>
      </div>

      {/* Main action */}
      <div className="px-4 py-6 -mt-2">
        <button
          onClick={() => setShowScan(true)}
          className="w-full bg-primary text-white rounded-2xl py-5 flex flex-col items-center gap-2
                     shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.98]"
        >
          <ScanLine size={32} strokeWidth={1.5} />
          <span className="text-lg font-bold">Scansiona QR Ospite</span>
          <span className="text-white/70 text-xs">
            Dopo il check-out, valida il QR e assegna il premio
          </span>
        </button>

        {/* Cross-network reminder */}
        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            🔄 Economia Circolare VLA
          </p>
          <p className="text-xs text-amber-600 leading-relaxed">
            I premi generati qui sono <strong>spendibili solo in altre strutture</strong> della rete.
            Questo garantisce che ogni struttura porti ospiti alle altre.
          </p>
        </div>

        {/* Recent scans */}
        {myVouchers.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <History size={16} className="text-gray-400" />
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Premi assegnati
              </h2>
            </div>
            <div className="space-y-2">
              {myVouchers.map((v) => {
                const redeemAt = getStructureById(v.redeemableAt);
                return (
                  <div
                    key={v.id}
                    className="bg-white rounded-xl p-3.5 border border-gray-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Ticket size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {v.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        → {redeemAt?.name} · {v.earnedDate}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        v.used
                          ? "bg-gray-100 text-gray-400"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {v.used ? "Usato" : "Attivo"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showScan && (
        <QRScanModal structure={structureUser} onClose={() => setShowScan(false)} />
      )}
    </div>
  );
}
