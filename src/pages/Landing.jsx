import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Luggage, Mail, LockKeyhole, ArrowRight, UserRound, Building2, ChevronLeft } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Landing() {
  const { login, loginAsStructure, structures } = useApp();
  const navigate = useNavigate();
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
    <div className="min-h-svh bg-gradient-to-br from-violet-700 via-violet-900 to-indigo-950 flex flex-col items-center justify-center px-6 py-10">

      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl mb-4 border border-white/20 shadow-xl">
          <Luggage size={40} className="text-amber-400" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">VLA</h1>
        <p className="text-amber-400/80 text-sm mt-1 font-medium">Viaggia · Recensisci · Risparmia</p>
      </div>

      {/* ── ROLE SELECTION ── */}
      {screen === "role" && (
        <div className="w-full max-w-sm animate-fade-in-up space-y-3">
          {/* Ospite */}
          <button
            onClick={() => setScreen("user-auth")}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-xl
                       hover:bg-violet-50 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors">
              <UserRound size={22} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-black text-violet-950">Sono un Ospite</p>
              <p className="text-xs text-violet-400 font-medium">Visualizza strutture e i tuoi premi</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-violet-300 group-hover:text-primary transition-colors" />
          </button>

          {/* Struttura */}
          <button
            onClick={() => setScreen("structure-pick")}
            className="w-full flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4
                       border border-white/25 hover:bg-white/20 transition-all active:scale-[0.98] group"
          >
            <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center shrink-0">
              <Building2 size={22} className="text-amber-400" />
            </div>
            <div className="text-left">
              <p className="font-black text-white">Sono una Struttura</p>
              <p className="text-xs text-violet-300 font-medium">Scansiona QR e assegna premi</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-violet-400" />
          </button>
        </div>
      )}

      {/* ── USER AUTH ── */}
      {screen === "user-auth" && (
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-fade-in-up">
          <button
            onClick={() => setScreen("role")}
            className="flex items-center gap-1 text-sm text-violet-400 mb-4 hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft size={16} /> Indietro
          </button>

          <div className="flex bg-violet-50 rounded-xl p-1 mb-6">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  tab === t ? "bg-white text-primary shadow-sm" : "text-violet-400"
                }`}
              >
                {t === "login" ? "Accedi" : "Registrati"}
              </button>
            ))}
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-3">
            {tab === "register" && (
              <div className="relative">
                <UserRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="text" placeholder="Nome completo" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-sm text-violet-900
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                             border border-transparent focus:border-primary transition-all placeholder:text-violet-300"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
              <input
                type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-sm text-violet-900
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                           border border-transparent focus:border-primary transition-all placeholder:text-violet-300"
              />
            </div>
            <div className="relative">
              <LockKeyhole size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
              <input
                type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-sm text-violet-900
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                           border border-transparent focus:border-primary transition-all placeholder:text-violet-300"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white
                         font-bold py-3.5 rounded-xl transition-all hover:bg-primary-dark
                         active:scale-[0.98] shadow-lg shadow-primary/30 mt-2"
            >
              {tab === "login" ? "Accedi" : "Crea Account"}
              <ArrowRight size={18} />
            </button>
          </form>
          {tab === "login" && (
            <p className="text-center text-xs text-violet-400 mt-4">
              Demo: clicca Accedi per entrare con l'account di prova
            </p>
          )}
        </div>
      )}

      {/* ── STRUCTURE PICK ── */}
      {screen === "structure-pick" && (
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-violet-50">
              <button
                onClick={() => setScreen("role")}
                className="flex items-center gap-1 text-sm text-violet-400 mb-3 hover:text-primary transition-colors font-medium"
              >
                <ChevronLeft size={16} /> Indietro
              </button>
              <h2 className="font-black text-violet-950">Seleziona la tua struttura</h2>
              <p className="text-xs text-violet-400 mt-0.5 font-medium">Accedi come gestore</p>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-violet-50">
              {structures.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStructureLogin(s)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-violet-50 transition-colors text-left group"
                >
                  <img src={s.image} alt={s.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-violet-950 leading-tight truncate">{s.name}</p>
                    <p className="text-xs text-violet-400 font-medium">{s.city} · {s.type}</p>
                  </div>
                  <ArrowRight size={15} className="text-violet-200 group-hover:text-primary transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-violet-500/60 text-[11px] mt-8 font-medium">
        © 2026 VLA — Economia Circolare del Turismo
      </p>
    </div>
  );
}
