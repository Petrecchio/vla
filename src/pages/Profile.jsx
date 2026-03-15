import { useNavigate } from "react-router-dom";
import {
  UserRound, Mail, CalendarDays, Star,
  BedDouble, LogOut, ChevronRight, Luggage,
  ShieldCheck, BellRing, LifeBuoy,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, logout, reviews } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  const stats = [
    { icon: Star, label: "Recensioni", value: user?.totalReviews + reviews.length },
    { icon: BedDouble, label: "Notti", value: user?.totalNights },
    { icon: Luggage, label: "Trolley", value: (user?.totalReviews + reviews.length) * 2 },
  ];

  const menuItems = [
    { icon: BellRing, label: "Notifiche", action: () => {} },
    { icon: ShieldCheck, label: "Privacy e Sicurezza", action: () => {} },
    { icon: LifeBuoy, label: "Assistenza", action: () => {} },
  ];

  return (
    <div className="pb-safe">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 text-white px-5 pt-8 pb-12 rounded-b-[2.5rem]">
        <h1 className="text-xl font-black mb-5">Profilo</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center">
            <UserRound size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{user?.name}</h2>
            <div className="flex items-center gap-1.5 text-violet-300 text-sm mt-0.5">
              <Mail size={13} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-violet-400 text-xs mt-0.5">
              <CalendarDays size={12} />
              <span>Membro dal {user?.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-5">
        <div className="bg-white rounded-2xl shadow-md border border-violet-100 p-4 grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                <Icon size={18} className="text-primary" />
              </div>
              <p className="text-xl font-black text-violet-950">{value}</p>
              <p className="text-[10px] text-violet-400 uppercase tracking-wider font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-5">
        <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">
          {menuItems.map(({ icon: Icon, label, action }, i) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-violet-50 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-violet-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <span className="text-sm font-bold text-violet-900">{label}</span>
              </div>
              <ChevronRight size={16} className="text-violet-200" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
                     bg-red-50 text-red-500 font-bold text-sm border border-red-100
                     hover:bg-red-100 transition-colors active:scale-[0.98]"
        >
          <LogOut size={18} />
          Esci
        </button>
      </div>

      <p className="text-center text-[11px] text-violet-300 mt-6 mb-4 font-medium">VLA v1.0.0 — MVP</p>
    </div>
  );
}
