import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { regionNameToId, geoNameToId } from "../data/regions";
import { structureCountByRegion } from "../data/structures";

const GEO_URL =
  "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson";

// Regions NOT yet in VLA network
const comingSoon = new Set([
  "piemonte", "friuli-venezia-giulia", "marche", "umbria",
  "abruzzo", "molise", "basilicata", "calabria",
]);

function ItalyMap({ voucherRegions = [] }) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState(null);
  const [geoLoaded, setGeoLoaded] = useState(false);
  const counts = structureCountByRegion();

  const activeRegionIds = new Set(
    Object.keys(counts).map((name) => regionNameToId[name]).filter(Boolean)
  );

  const voucherSet = new Set(voucherRegions);

  const handleClick = (regionId) => {
    if (activeRegionIds.has(regionId) && !comingSoon.has(regionId)) {
      navigate(`/region/${regionId}`);
    }
  };

  const getRegionStyle = (regionId) => {
    const isActive = activeRegionIds.has(regionId) && !comingSoon.has(regionId);
    const hasVoucher = voucherSet.has(regionId);

    if (hasVoucher) {
      return {
        default: { fill: "#f59e0b", stroke: "#d97706", strokeWidth: 0.6, outline: "none", cursor: "pointer" },
        hover:   { fill: "#fbbf24", stroke: "#d97706", strokeWidth: 0.8, outline: "none", cursor: "pointer" },
        pressed: { fill: "#d97706", stroke: "#b45309", strokeWidth: 0.8, outline: "none", cursor: "pointer" },
      };
    }
    if (isActive) {
      return {
        default: { fill: "#7c3aed", stroke: "#5b21b6", strokeWidth: 0.5, outline: "none", cursor: "pointer" },
        hover:   { fill: "#8b5cf6", stroke: "#6d28d9", strokeWidth: 0.7, outline: "none", cursor: "pointer" },
        pressed: { fill: "#6d28d9", stroke: "#5b21b6", strokeWidth: 0.7, outline: "none", cursor: "pointer" },
      };
    }
    return {
      default: { fill: "#ede9f6", stroke: "#d4d0e0", strokeWidth: 0.3, outline: "none" },
      hover:   { fill: "#e0daf0", stroke: "#c4c0d4", strokeWidth: 0.4, outline: "none" },
      pressed: { fill: "#e0daf0", stroke: "#c4c0d4", strokeWidth: 0.4, outline: "none" },
    };
  };

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Loading skeleton */}
      {!geoLoaded && (
        <div className="flex items-center justify-center h-[360px]">
          <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="w-32 h-48 bg-violet-100 rounded-3xl" />
            <p className="text-[11px] text-violet-300 font-medium">Caricamento mappa…</p>
          </div>
        </div>
      )}

      <div className={geoLoaded ? "animate-fade-in-up" : "opacity-0 absolute"}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [12.5, 42.2], scale: 1900 }}
          width={400}
          height={480}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              // Signal loaded on first render of geographies
              if (geographies.length > 0 && !geoLoaded) {
                setTimeout(() => setGeoLoaded(true), 0);
              }
              return geographies.map((geo) => {
                const geoName = geo.properties.reg_name;
                const regionId = geoNameToId[geoName];
                if (!regionId) return null;

                const isActive = activeRegionIds.has(regionId) && !comingSoon.has(regionId);
                const regionName = Object.entries(regionNameToId).find(([, v]) => v === regionId)?.[0];
                const count = regionName ? counts[regionName] || 0 : 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(regionId)}
                    onMouseEnter={() => setTooltip({ name: geoName.split("/")[0], count, isActive })}
                    onMouseLeave={() => setTooltip(null)}
                    style={getRegionStyle(regionId)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-3 py-1.5 border border-violet-100 pointer-events-none z-10">
          <p className="text-xs font-black text-violet-950">{tooltip.name}</p>
          <p className="text-[10px] text-violet-400 font-medium">
            {tooltip.isActive
              ? `${tooltip.count} struttur${tooltip.count === 1 ? "a" : "e"} VLA`
              : "Prossimamente"}
          </p>
        </div>
      )}

      {/* Legend */}
      {geoLoaded && (
        <div className="flex items-center justify-center gap-3 mt-1 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />
            <span className="text-[10px] text-violet-600 font-bold">Rete attiva</span>
          </div>
          {voucherRegions.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] text-amber-600 font-bold">Hai voucher!</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ede9f6]" />
            <span className="text-[10px] text-violet-400 font-medium">Prossimamente</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ItalyMap);
