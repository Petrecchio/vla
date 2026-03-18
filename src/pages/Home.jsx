import { useState, useEffect, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronDown, ChevronUp, Gem, MapPinned, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { regions, regionNameToId } from "../data/regions";
import { structureCountByRegion, getStructureById } from "../data/structures";
import ItalyMap from "../components/ItalyMap";
import RegionCard from "../components/RegionCard";
import Spinner from "../components/Spinner";

export default function Home() {
  const { user, wallet } = useApp();
  const [qrExpanded, setQrExpanded] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFakeLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const counts = useMemo(() => structureCountByRegion(), []);

  // Regions that have at least 1 structure (active in VLA network)
  const activeRegions = useMemo(
    () => regions.filter((r) => {
      const regionName = Object.entries(regionNameToId).find(([, v]) => v === r.id)?.[0];
      return regionName && (counts[regionName] || 0) > 0;
    }),
    [counts]
  );

  // Region IDs where user has active vouchers
  const vouchersByRegion = useMemo(() => {
    const map = {};
    wallet.vouchers
      .filter((v) => !v.used)
      .forEach((v) => {
        const structure = getStructureById(v.redeemableAt);
        if (structure) {
          const rId = regionNameToId[structure.region];
          if (rId) map[rId] = (map[rId] || 0) + 1;
        }
      });
    return map;
  }, [wallet.vouchers]);

  const voucherRegionIds = useMemo(
    () => Object.keys(vouchersByRegion),
    [vouchersByRegion]
  );

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

      {/* Map section */}
      <div className="px-4 py-6 -mt-2">
        <div className="text-center mb-5">
          <h2 className="text-lg font-black text-violet-950">La Rete VLA in Italia</h2>
          <p className="text-xs text-violet-400 font-medium mt-1">
            Tocca una regione per scoprire le strutture
          </p>
        </div>

        <ItalyMap voucherRegions={voucherRegionIds} />

        {/* Network stat */}
        <div className="mt-5 bg-violet-50 border border-violet-100 rounded-2xl p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-black text-primary">{activeRegions.length}</p>
            <p className="text-[11px] text-violet-400 font-bold">Regioni</p>
          </div>
          <div className="w-px h-8 bg-violet-200" />
          <div className="text-center">
            <p className="text-2xl font-black text-primary">
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-[11px] text-violet-400 font-bold">Strutture</p>
          </div>
          <div className="w-px h-8 bg-violet-200" />
          <div className="text-center">
            <p className="text-2xl font-black text-amber-500">
              {wallet.vouchers.filter((v) => !v.used).length}
            </p>
            <p className="text-[11px] text-violet-400 font-bold">Voucher attivi</p>
          </div>
        </div>
      </div>

      {/* Region cards horizontal scroll */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-black text-violet-950 flex items-center gap-2">
            <MapPinned size={16} className="text-primary" />
            Esplora le Regioni
          </h2>
          <ArrowRight size={16} className="text-violet-300" />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          {activeRegions.map((region) => {
            const regionName = Object.entries(regionNameToId).find(([, v]) => v === region.id)?.[0];
            return (
              <RegionCard
                key={region.id}
                region={region}
                structureCount={counts[regionName] || 0}
                voucherCount={vouchersByRegion[region.id] || 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
