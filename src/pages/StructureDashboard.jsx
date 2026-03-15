import { useState } from "react";
import {
  QrCode, ScanQrCode, X, BadgeCheck, XCircle,
  UserRound, LogOut, Trophy, ArrowRight,
  MapPinned, History, Ticket,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { getStructureById } from "../data/structures";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

// ── QR Scan Modal ──────────────────────────────────────────
function QRScanModal({ structure, onClose }) {
  const { scanQR, assignPrize } = useApp();
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
    if (result.valid) { setScannedGuest(result.guest); setStep("valid"); }
    else { setError(result.reason); setStep("invalid"); }
  };

  const handleAssign = async () => {
    setStep("assigning");
    const result = await assignPrize(structure.id, scannedGuest.id);
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

        {/* ── INPUT ── */}
        {step === "input" && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl mb-3">
                <ScanQrCode size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-black text-violet-950">Scansiona QR Ospite</h2>
              <p className="text-sm text-violet-400 mt-1">Inserisci il codice QR dell'ospite</p>
            </div>

            {/* Fake viewfinder */}
            <div className="relative bg-violet-950 rounded-2xl h-44 flex items-center justify-center mb-4 overflow-hidden">
              <div className="absolute inset-4 border border-white/10 rounded-xl" />
              {/* Corner brackets */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />
              <div className="text-center z-10">
                <QrCode size={40} className="text-white/20 mx-auto mb-2" />
                <p className="text-white/30 text-xs">Inquadra il QR code dell'ospite</p>
              </div>
              {/* Scan line */}
              <div className="absolute inset-x-8 h-0.5 bg-amber-400/70 animate-bounce top-1/2 rounded-full" />
            </div>

            <input
              type="text"
              placeholder="Oppure inserisci il codice manualmente..."
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              className="w-full px-4 py-3 bg-violet-50 rounded-xl text-sm font-mono text-violet-900
                         focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         border border-violet-100 transition-all placeholder:text-violet-300 mb-3"
            />

            <button
              onClick={() => setQrValue(DEMO_QR)}
              className="w-full text-xs font-bold text-primary bg-violet-50 border border-violet-100
                         py-2.5 rounded-xl mb-4 hover:bg-violet-100 transition-colors"
            >
              📲 Simula scansione ospite demo
            </button>

            <button
              onClick={handleScan}
              disabled={!qrValue.trim()}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]
                         shadow-lg shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Valida QR Code
            </button>
          </>
        )}

        {/* ── SCANNING / ASSIGNING ── */}
        {(step === "scanning" || step === "assigning") && (
          <div className="py-14 flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-violet-500 font-bold">
              {step === "scanning" ? "Validazione QR..." : "Assegnazione premio..."}
            </p>
          </div>
        )}

        {/* ── VALID ── */}
        {step === "valid" && scannedGuest && (
          <>
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-3">
                <BadgeCheck size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-black text-violet-950">QR Valido ✓</h2>
            </div>

            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <UserRound size={22} className="text-primary" />
                </div>
                <div>
                  <p className="font-black text-violet-950">{scannedGuest.name}</p>
                  <p className="text-xs text-violet-500">Membro dal {scannedGuest.memberSince}</p>
                  <p className="text-xs text-violet-400">{scannedGuest.totalNights} notti totali nella rete</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-sm text-amber-800">
              <span className="font-black">Regola cross-network:</span> il premio verrà assegnato
              per una struttura <em>diversa</em> dalla tua.
            </div>

            <button
              onClick={handleAssign}
              className="w-full bg-primary text-white font-black py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98]
                         flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <Trophy size={18} />
              Assegna Premio
            </button>
          </>
        )}

        {/* ── INVALID ── */}
        {step === "invalid" && (
          <>
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
                <XCircle size={32} className="text-red-500" />
              </div>
              <h2 className="text-xl font-black text-violet-950">QR Non Valido</h2>
              <p className="text-sm text-violet-500 mt-2">{error}</p>
            </div>
            <button
              onClick={() => { setStep("input"); setQrValue(""); setError(""); }}
              className="w-full bg-violet-100 text-violet-700 font-bold py-3.5 rounded-xl hover:bg-violet-200 transition-colors"
            >
              Riprova
            </button>
          </>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && reward && (
          <div className="text-center animate-scale-in py-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
              <Trophy size={40} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-violet-950 mb-1">Premio Assegnato!</h2>
            <p className="text-sm text-violet-500 mb-5">Il premio è stato aggiunto al wallet dell'ospite</p>

            <div className="bg-gradient-to-br from-violet-50 to-violet-100/60 rounded-2xl p-4 mb-4 text-left border border-violet-200">
              <p className="text-[11px] text-violet-400 font-bold uppercase tracking-wider mb-1">Premio generato</p>
              <p className="font-black text-violet-950">{reward.voucher.label}</p>
              <p className="text-xs text-primary font-bold mt-1 flex items-center gap-1">
                <ArrowRight size={11} />
                Spendibile presso: {reward.rewardStructure.name}
              </p>
              <div className="mt-3 bg-white border border-violet-100 rounded-xl px-3 py-2 inline-block">
                <code className="text-sm font-mono text-primary font-black tracking-wider">
                  {reward.voucher.code}
                </code>
              </div>
            </div>

            <p className="text-[11px] text-violet-400 mb-5 font-medium">
              💡 Il premio è spendibile solo in un'altra struttura della rete VLA
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-black py-3.5 rounded-xl
                         hover:bg-primary-dark transition-colors active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              Chiudi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Dashboard principale ───────────────────────────────────
export default function StructureDashboard() {
  const { structureUser, logout, scans, wallet } = useApp();
  const navigate = useNavigate();
  const [showScan, setShowScan] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const myScansCount = (scans[structureUser?.id] || []).length;
  const myVouchers = wallet.vouchers.filter((v) => v.earnedAt === structureUser?.id);

  return (
    <div className="min-h-svh" style={{ background: "#f5f3ff" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 text-white px-5 pt-8 pb-12 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-amber-400 text-[11px] font-black uppercase tracking-widest mb-1">
              Pannello Struttura
            </p>
            <h1 className="text-xl font-black">{structureUser?.name}</h1>
            <p className="text-violet-300 text-sm flex items-center gap-1 mt-0.5 font-medium">
              <MapPinned size={12} />
              {structureUser?.city}, {structureUser?.region}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 border border-white/20 p-2.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <LogOut size={20} className="text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-amber-400">{myScansCount}</p>
            <p className="text-violet-300 text-xs mt-0.5 font-medium">QR scansionati</p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-amber-400">{myVouchers.length}</p>
            <p className="text-violet-300 text-xs mt-0.5 font-medium">Premi assegnati</p>
          </div>
        </div>
      </div>

      {/* Main action */}
      <div className="px-4 py-5 -mt-2">
        <button
          onClick={() => setShowScan(true)}
          className="w-full bg-primary text-white rounded-2xl py-6 flex flex-col items-center gap-2
                     shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-[0.98]"
        >
          <ScanQrCode size={36} strokeWidth={1.5} />
          <span className="text-lg font-black">Scansiona QR Ospite</span>
          <span className="text-violet-200 text-xs font-medium">
            Valida il QR dopo il check-out e assegna il premio
          </span>
        </button>

        {/* Cross-network info */}
        <div className="mt-4 bg-white border border-amber-200 rounded-2xl p-4">
          <p className="text-sm font-black text-amber-700 mb-1">🔄 Economia Circolare VLA</p>
          <p className="text-xs text-amber-600 leading-relaxed">
            I premi generati qui sono <strong>spendibili solo in altre strutture</strong> della rete —
            così ogni struttura porta ospiti alle altre.
          </p>
        </div>

        {/* Recent */}
        {myVouchers.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <History size={15} className="text-violet-400" />
              <h2 className="text-xs font-black text-violet-400 uppercase tracking-widest">
                Premi assegnati
              </h2>
            </div>
            <div className="space-y-2.5">
              {myVouchers.map((v) => {
                const redeemAt = getStructureById(v.redeemableAt);
                return (
                  <div key={v.id} className="bg-white rounded-xl p-3.5 border border-violet-100 flex items-center gap-3">
                    <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                      <Ticket size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-violet-950 truncate">{v.label}</p>
                      <p className="text-xs text-violet-400 font-medium">→ {redeemAt?.name} · {v.earnedDate}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full shrink-0 ${
                      v.used ? "bg-violet-100 text-violet-400" : "bg-amber-100 text-amber-700"
                    }`}>
                      {v.used ? "Usato" : "Attivo"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showScan && <QRScanModal structure={structureUser} onClose={() => setShowScan(false)} />}
    </div>
  );
}
