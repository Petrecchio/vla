import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import BottomNav from "./components/BottomNav";
import Spinner from "./components/Spinner";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import StructureDetail from "./pages/StructureDetail";
import WalletPage from "./pages/Wallet";
import Profile from "./pages/Profile";
import StructureDashboard from "./pages/StructureDashboard";

function ProtectedUserLayout() {
  const { user, loading } = useApp();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/" replace />;
  return (
    <div className="max-w-lg mx-auto min-h-svh bg-surface relative">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/structure/:id" element={<StructureDetail />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

function ProtectedStructureLayout() {
  const { structureUser, loading } = useApp();
  if (loading) return <Spinner />;
  if (!structureUser) return <Navigate to="/" replace />;
  return (
    <div className="max-w-lg mx-auto min-h-svh bg-surface">
      <StructureDashboard />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/struttura" element={<ProtectedStructureLayout />} />
          <Route path="/*" element={<ProtectedUserLayout />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
