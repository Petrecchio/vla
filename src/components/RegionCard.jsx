import { useNavigate } from "react-router-dom";
import { MapPinned, Ticket } from "lucide-react";

export default function RegionCard({ region, structureCount = 0, voucherCount = 0 }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/region/${region.id}`)}
      className="shrink-0 w-44 bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer
                 border border-violet-100 transition-all duration-300
                 hover:shadow-md hover:shadow-violet-100 hover:-translate-y-0.5
                 active:scale-[0.97] snap-start"
    >
      {/* Image */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-transparent to-transparent" />
        {voucherCount > 0 && (
          <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
            <Ticket size={9} />
            {voucherCount}
          </div>
        )}
        <p className="absolute bottom-2 left-2.5 text-white font-black text-sm leading-tight drop-shadow-md">
          {region.name}
        </p>
      </div>

      {/* Info */}
      <div className="p-2.5">
        <div className="flex items-center gap-1 text-violet-400">
          <MapPinned size={11} />
          <span className="text-[11px] font-semibold">
            {structureCount} {structureCount === 1 ? "struttura" : "strutture"}
          </span>
        </div>
      </div>
    </div>
  );
}
