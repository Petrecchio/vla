import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Luggage, Mail, Lock, ArrowRight, User, Building2, ChevronLeft } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Landing() {
  const { login, loginAsStructure, structures } = useApp();
  const navigate = useNavigate();

  // "role" | "user-auth" | "structure-pick"
  const [screen, setScreen] = useState("role");
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("marco.rossi@email.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("");

  const handleUserSubmit = (e) => {
    e.preventDefault();
    login();
    setTimeout(() => navigate("/home"), 1300);
  };

  const handleStructureLogin = (structure) => {
    loginAsStructure(structure);
    setTimeout(() => navigate("/struttura"), 1000);
  };

  return (
    <div className="min-h-svh bg-gradient-to-br from-primary via-primary-dark to-emerald-900 flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-md rounded-3xl mb-4 shadow-lg">
          <Luggage size={40} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">VLA</h1>
        <p className="text-white/70 text-sm mt-1">Viaggia, Recensisci, Risparmia</p>
      </div>

      {/* ── ROLE SELECTION ── */}
      {screen === "role" && (
        <div className="w-full max-w-sm animate-fade-in-up space-y-3">
          <button
            onClick={() => setScreen("user-auth")}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-xl
                       hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <User size={22} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Sono un Ospite</p>
              <p className="text-xs text-gray-500">Visualizza strutture e i tuoi premi</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-gray-300" />
          </button>

          <button
            onClick={() => setScreen("structure-pick")}
            className="w-full flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-4
                       border border-white/30 hover:bg-white/20 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white">Sono una Struttura</p>
              <p className="text-xs text-white/60">Scansiona QR e assegna premi</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-white/40" />
          </button>
        </div>
      )}

      {/* ── USER AUTH ── */}
      {screen === "user-auth" && (
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-fade-in-up">
          <button
            onClick={() => setScreen("role")}
            className="flex items-center gap-1 text-sm text-gray-400 mb-4 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={16} /> Indietro
          </button>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  tab === t ? "bg-white text-primary shadow-sm" : "text-gray-500"
                }`}
              >
                {t === "login" ? "Accedi" : "Registrati"}
              </button>
            ))}
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-4">
            {tab === "register" && (
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                             border border-transparent focus:border-primary transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                           border border-transparent focus:border-primary transition-all"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                           border border-transparent focus:border-primary transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white
                         font-semibold py-3.5 rounded-xl transition-all hover:bg-primary-dark
                         active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              {tab === "login" ? "Accedi" : "Crea Account"}
              <ArrowRight size={18} />
            </button>
          </form>
          {tab === "login" && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Demo: clicca Accedi per entrare con l'account di prova
            </p>
          )}
        </div>
      )}

      {/* ── STRUCTURE PICK ── */}
      {screen === "structure-pick" && (
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <button
                onClick={() => setScreen("role")}
                className="flex items-center gap-1 text-sm text-gray-400 mb-3 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft size={16} /> Indietro
              </button>
              <h2 className="font-bold text-gray-900">Seleziona la tua struttura</h2>
              <p className="text-xs text-gray-500 mt-0.5">Accedi come gestore</p>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {structures.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStructureLogin(s)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.city} · {s.type}</p>
                  </div>
                  <ArrowRight size={15} className="ml-auto text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-white/40 text-[11px] mt-8">
        © 2026 VLA — Economia Circolare del Turismo
      </p>
    </div>
  );
}
