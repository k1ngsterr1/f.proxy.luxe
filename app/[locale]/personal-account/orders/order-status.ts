type StatusPresentation = {
  label: "paid" | "pending" | "processing" | "canceled" | "active" | "expired" | "unknown";
  color: string;
  backgroundColor: string;
};

const green = { color: "#4CAF50", backgroundColor: "rgba(76, 175, 80, 0.1)" };
const yellow = { color: "#FFC107", backgroundColor: "rgba(255, 193, 7, 0.1)" };
const red = { color: "#FF5252", backgroundColor: "rgba(255, 82, 82, 0.1)" };

const presentations: Record<string, StatusPresentation> = {
  PAID: { label: "paid", ...green },
  PENDING: { label: "pending", ...yellow },
  PROCESSING: { label: "processing", ...yellow },
  CANCELED: { label: "canceled", ...red },
  ACTIVE: { label: "active", ...green },
  EXPIRED: { label: "expired", ...red },
};

export function getOrderStatusPresentation(status: string): StatusPresentation {
  return presentations[status] ?? { label: "unknown", ...red };
}
