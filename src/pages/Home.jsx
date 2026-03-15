import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white px-5 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm">Ciao 👋</p>
            <h1 className="text-xl font-bold">{user?.name}</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Sparkles size={14} className="text-accent-light" />
            <span className="text-sm font-bold">{wallet.credits}</span>
            <span className="text-xs text-white/70">crediti</span>
          </div>
        </div>

        {/* QR Code */}
        <div
          onClick={() => setQrExpanded(!qrExpanded)}
          className="bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Il tuo QR Code</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Mostralo alla struttura dopo il check-out
              </p>
            </div>
            {qrExpanded ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </div>

          {qrExpanded && (
            <div className="flex flex-col items-center mt-4 animate-scale-in">
              <QRCodeSVG
                value={user?.qrCode || "VLA-USER"}
                size={180}
                level="M"
                fgColor="#0f766e"
                includeMargin
              />
              <p className="text-[10px] font-mono text-gray-400 mt-2">
                {user?.qrCode}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Strutture della Rete
          </h2>
          <span className="text-xs text-gray-400 font-medium">
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
