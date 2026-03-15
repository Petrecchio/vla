import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronDown, ChevronUp, Gem } from "lucide-react";
import { useApp } from "../context/AppContext";
import FlashCard from "../components/FlashCard";
import Spinner from "../components/Spinner";

export default function Home() {
  const { user, structures, wallet } = useApp();
  const [qrExpanded, setQrExpanded] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFakeLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (fakeLoading) return <Spinner />;

  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 text-white px-5 pt-8 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-violet-300 text-sm font-medium">Ciao 👋</p>
            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
          </div>
          {/* Credits badge */}
          <div className="flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 px-3 py-2 rounded-2xl">
            <Gem size={16} className="text-amber-400" />
            <span className="text-lg font-black text-amber-300">{wallet.credits}</span>
            <span className="text-xs text-amber-400/80 font-medium">pt</span>
          </div>
        </div>

        {/* QR Card */}
        <div
          onClick={() => setQrExpanded(!qrExpanded)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm">Il tuo QR Code VLA</p>
              <p className="text-violet-300 text-xs mt-0.5">
                Mostralo alla struttura dopo il check-out
              </p>
            </div>
            <div className="bg-white/15 rounded-xl p-1.5">
              {qrExpanded
                ? <ChevronUp size={18} className="text-white" />
                : <ChevronDown size={18} className="text-white" />}
            </div>
          </div>

          {qrExpanded && (
            <div className="flex flex-col items-center mt-4 animate-scale-in">
              <div className="bg-white rounded-2xl p-3">
                <QRCodeSVG
                  value={user?.qrCode || "VLA-USER"}
                  size={160}
                  level="M"
                  fgColor="#5b21b6"
                />
              </div>
              <p className="text-[10px] font-mono text-violet-400 mt-2">{user?.qrCode}</p>
            </div>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-6 -mt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-violet-950">Strutture della Rete</h2>
          <span className="text-xs text-violet-400 font-semibold bg-violet-100 px-2.5 py-1 rounded-full">
            {structures.length} disponibili
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {structures.map((s) => (
            <FlashCard key={s.id} structure={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
