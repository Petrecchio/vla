import { useNavigate } from "react-router-dom";
import { MapPinned, Gift, Percent } from "lucide-react";

export default function FlashCard({ structure }) {
  const navigate = useNavigate();
  const { id, name, type, city, image, offers } = structure;

  return (
    <div
      onClick={() => navigate(`/structure/${id}`)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer
                 border border-violet-100 transition-all duration-300
                 hover:shadow-md hover:shadow-violet-100 hover:-translate-y-0.5
                 active:scale-[0.98] animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-[11px] font-bold text-primary uppercase tracking-wide px-2.5 py-1 rounded-full">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-violet-950 text-base leading-tight">{name}</h3>
        <div className="flex items-center gap-1 mt-1 text-violet-400">
          <MapPinned size={13} />
          <span className="text-xs font-medium">{city}</span>
        </div>

        {/* Offers */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {offers.map((offer) => (
            <span
              key={offer.id}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                offer.type === "discount"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {offer.type === "discount" ? <Percent size={10} /> : <Gift size={10} />}
              {offer.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
