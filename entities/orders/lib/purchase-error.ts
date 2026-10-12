export const getPurchaseErrorKey = (error: unknown) =>
  (error as { response?: { status?: number } })?.response?.status === 401
    ? "login-required"
    : "purchase-failed";

export const normalizeResidentTariff = (name: string) =>
  name.replace(/\bGB\b/g, "Gb");
