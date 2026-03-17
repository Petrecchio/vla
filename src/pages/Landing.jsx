import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Luggage, Mail, LockKeyhole, ArrowRight, UserRound, Building2, ChevronLeft, MapPinned } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Landing() {
  const { login, loginAsStructure, structures } = useApp();
  const navigate = useNavigate();

  // "role" | "user-auth" | "structure-pick" | "structure-auth"
  const [screen, setScreen] = useState("role");
  const [tab, setTab] = useState("login");

  // User form
  const [email, setEmail] = useState("marco.rossi@email.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("");

  // Structure auth
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [structEmail, setStructEmail] = useState("");
  const [structPassword, setStructPassword] = useState("");

  const handleUserSubmit = (e) => {
    e.preventDefault();
    login();
    setTimeout(() => navigate("/home"), 1300);
  };

  const handleSelectStructure = (structure) => {
    setSelectedStructure(structure);
    // Pre-fill mock credentials
    setStructEmail(`gestore@${structure.name.toLowerCase().replace(/\s+/g, "")}.it`);
    setStructPassword("••••••••");
    setScreen("structure-auth");
  };

  const handleStructureSubmit = (e) => {
    e.preventDefault();
    loginAsStructure(selectedStructure);
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
                  onClick={() => handleSelectStructure(s)}
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

      {/* ── STRUCTURE AUTH ── */}
      {screen === "structure-auth" && selectedStructure && (
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Structure hero */}
          <div className="relative h-28 overflow-hidden">
            <img
              src={selectedStructure.image}
              alt={selectedStructure.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-950/30 to-transparent" />
            <button
              onClick={() => setScreen("structure-pick")}
              className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-xl
                         hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest">Accesso Gestore</p>
              <p className="text-white font-black text-base leading-tight">{selectedStructure.name}</p>
              <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                <MapPinned size={10} />
                {selectedStructure.city} · {selectedStructure.type}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleStructureSubmit} className="space-y-3">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="email"
                  placeholder="Email gestore"
                  value={structEmail}
                  onChange={(e) => setStructEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-sm text-violet-900
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                             border border-transparent focus:border-primary transition-all placeholder:text-violet-300"
                />
              </div>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="password"
                  placeholder="Password"
                  value={structPassword}
                  onChange={(e) => setStructPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl text-sm text-violet-900
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                             border border-transparent focus:border-primary transition-all placeholder:text-violet-300"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white
                           font-bold py-3.5 rounded-xl transition-all hover:bg-primary-dark
                           active:scale-[0.98] shadow-lg shadow-primary/30 mt-1"
              >
                <Building2 size={18} />
                Accedi al Pannello
              </button>
            </form>

            <p className="text-center text-xs text-violet-400 mt-4">
              Demo: clicca Accedi per entrare come gestore
            </p>
          </div>
        </div>
      )}

      <p className="text-violet-500/60 text-[11px] mt-8 font-medium">
        © 2026 VLA — Economia Circolare del Turismo
      </p>
    </div>
  );
}
