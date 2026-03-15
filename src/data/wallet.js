// Initial wallet state for mock user
export const initialWallet = {
  credits: 45,
  vouchers: [
    {
      id: "v1",
      code: "VLA-AMF-2024-X7K9",
      earnedAt: 2,           // structure ID where review was left
      redeemableAt: 8,       // structure ID where it can be spent
      label: "Sconto 15% sul soggiorno",
      type: "discount",
      value: 15,
      used: false,
      earnedDate: "2026-02-10",
    },
    {
      id: "v2",
      code: "VLA-BLG-2024-M3P1",
      earnedAt: 9,
      redeemableAt: 3,
      label: "Bottiglia d'olio EVO in omaggio",
      type: "gift",
      value: null,
      used: true,
      earnedDate: "2026-01-28",
    },
  ],
};

// Generate a random voucher code
export const generateVoucherCode = (structureId) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `VLA-${String(structureId).padStart(3, "0")}-${new Date().getFullYear()}-${random}`;
};
