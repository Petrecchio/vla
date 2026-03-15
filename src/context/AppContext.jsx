import { createContext, useContext, useState, useCallback } from "react";
import { structures, getOtherStructures } from "../data/structures";
import { initialWallet, generateVoucherCode } from "../data/wallet";
import { mockUser } from "../data/user";

const AppContext = createContext();

// Mock "scanned guest" for the structure QR flow
const mockScannedGuest = {
  id: "USR-001",
  name: "Marco Rossi",
  qrCode: "VLA-USR-001-MARCO-ROSSI",
  totalNights: 12,
  memberSince: "2025-09-15",
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);           // utente loggato
  const [structureUser, setStructureUser] = useState(null); // struttura loggata
  const [wallet, setWallet] = useState(initialWallet);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  // scans: { [structureId]: [guestId, ...] } — tracks which guests were scanned where
  const [scans, setScans] = useState({});

  // --- Auth ---
  const login = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1200);
  }, []);

  const loginAsStructure = useCallback((structure) => {
    setLoading(true);
    setTimeout(() => {
      setStructureUser(structure);
      setLoading(false);
    }, 900);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setStructureUser(null);
  }, []);

  // --- QR Scan by structure ---
  // Returns { valid, guest, alreadyScanned, voucher, rewardStructure } or { valid: false, reason }
  const scanQR = useCallback((qrCodeValue, structureId) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Mock: only our one demo user exists
        if (qrCodeValue.trim() !== mockScannedGuest.qrCode) {
          resolve({ valid: false, reason: "QR code non riconosciuto nella rete VLA." });
          return;
        }
        const alreadyScanned = (scans[structureId] || []).includes(mockScannedGuest.id);
        if (alreadyScanned) {
          resolve({
            valid: false,
            reason: "Questo ospite ha già ricevuto un premio per questa struttura.",
          });
          return;
        }
        resolve({ valid: true, guest: mockScannedGuest, alreadyScanned: false });
      }, 1200);
    });
  }, [scans]);

  // Called when structure confirms prize assignment after QR scan
  const assignPrize = useCallback((structureId, guestId) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        // Register scan so it can't be reused
        setScans((prev) => ({
          ...prev,
          [structureId]: [...(prev[structureId] || []), guestId],
        }));

        // Cross-network: pick a random OTHER structure for the reward
        const others = getOtherStructures(structureId);
        const rewardStructure = others[Math.floor(Math.random() * others.length)];
        const rewardOffer =
          rewardStructure.offers[Math.floor(Math.random() * rewardStructure.offers.length)];

        const newVoucher = {
          id: `v${Date.now()}`,
          code: generateVoucherCode(rewardStructure.id),
          earnedAt: structureId,
          redeemableAt: rewardStructure.id,
          label: rewardOffer.label,
          type: rewardOffer.type,
          value: rewardOffer.value,
          used: false,
          earnedDate: new Date().toISOString().split("T")[0],
        };

        // Add to the (shared mock) wallet
        setWallet((prev) => ({
          credits: prev.credits + 10,
          vouchers: [newVoucher, ...prev.vouchers],
        }));

        setLoading(false);
        resolve({ voucher: newVoucher, rewardStructure });
      }, 1400);
    });
  }, []);

  // --- Review (from user side) ---
  const submitReview = useCallback((structureId, rating, text) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const review = {
          id: `r${Date.now()}`,
          structureId,
          rating,
          text,
          date: new Date().toISOString().split("T")[0],
        };
        setReviews((prev) => [...prev, review]);

        const others = getOtherStructures(structureId);
        const rewardStructure = others[Math.floor(Math.random() * others.length)];
        const rewardOffer =
          rewardStructure.offers[Math.floor(Math.random() * rewardStructure.offers.length)];

        const newVoucher = {
          id: `v${Date.now()}`,
          code: generateVoucherCode(rewardStructure.id),
          earnedAt: structureId,
          redeemableAt: rewardStructure.id,
          label: rewardOffer.label,
          type: rewardOffer.type,
          value: rewardOffer.value,
          used: false,
          earnedDate: new Date().toISOString().split("T")[0],
        };

        setWallet((prev) => ({
          credits: prev.credits + rating * 5,
          vouchers: [newVoucher, ...prev.vouchers],
        }));

        setLoading(false);
        resolve({ voucher: newVoucher, rewardStructure });
      }, 1500);
    });
  }, []);

  const useVoucher = useCallback((voucherId) => {
    setWallet((prev) => ({
      ...prev,
      vouchers: prev.vouchers.map((v) =>
        v.id === voucherId ? { ...v, used: true } : v
      ),
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        structureUser,
        wallet,
        reviews,
        loading,
        structures,
        scans,
        login,
        loginAsStructure,
        logout,
        submitReview,
        scanQR,
        assignPrize,
        useVoucher,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
