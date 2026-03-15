import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Star,
  Moon,
  LogOut,
  ChevronRight,
  Luggage,
  Shield,
  Bell,
  CircleHelp,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, logout, reviews } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = [
    { icon: Star, label: "Recensioni", value: user?.totalReviews + reviews.length },
    { icon: Moon, label: "Notti", value: user?.totalNights },
    { icon: Luggage, label: "Trolley dati", value: (user?.totalReviews + reviews.length) * 2 },
  ];

  const menuItems = [
    { icon: Bell, label: "Notifiche", action: () => {} },
    { icon: Shield, label: "Privacy e Sicurezza", action: () => {} },
    { icon: CircleHelp, label: "Assistenza", action: () => {} },
  ];

  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white px-5 pt-8 pb-10 rounded-b-[2rem]">
        <h1 className="text-xl font-bold mb-6">Profilo</h1>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <div className="flex items-center gap-1.5 text-white/60 text-sm">
              <Mail size={13} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs mt-0.5">
              <Calendar size={12} />
              <span>Membro dal {user?.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-5">
        <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon size={20} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-gray-900">{value}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map(({ icon: Icon, label, action }, i) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                     bg-red-50 text-red-600 font-semibold text-sm
                     hover:bg-red-100 transition-colors active:scale-[0.98]"
        >
          <LogOut size={18} />
          Esci
        </button>
      </div>

      <p className="text-center text-[11px] text-gray-300 mt-6 mb-4">
        VLA v1.0.0 — MVP
      </p>
    </div>
  );
}
