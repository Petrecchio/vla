import { useNavigate } from "react-router-dom";
import { MapPin, Gift, Percent } from "lucide-react";

export default function FlashCard({ structure }) {
  const navigate = useNavigate();
  const { id, name, type, city, image, offers } = structure;

  return (
    <div
      onClick={() => navigate(`/structure/${id}`)}
      className="bg-card rounded-2xl shadow-md overflow-hidden cursor-pointer
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
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
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-dark px-2.5 py-1 rounded-full">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base leading-tight">
          {name}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-gray-500">
          <MapPin size={13} />
          <span className="text-xs">{city}</span>
        </div>

        {/* Offers */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {offers.map((offer) => (
            <span
              key={offer.id}
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                offer.type === "discount"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {offer.type === "discount" ? (
                <Percent size={10} />
              ) : (
                <Gift size={10} />
              )}
              {offer.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
