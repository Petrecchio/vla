import { NavLink } from "react-router-dom";
import { Home, WalletCards, UserRound } from "lucide-react";

const navItems = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/wallet", icon: WalletCards, label: "Wallet" },
  { to: "/profile", icon: UserRound, label: "Profilo" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-violet-100 shadow-[0_-4px_20px_rgba(124,58,237,0.08)]">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-primary bg-violet-50"
                  : "text-violet-300 hover:text-violet-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} />
                <span className={`text-[10px] font-bold tracking-wide uppercase ${isActive ? "text-primary" : "text-violet-300"}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
