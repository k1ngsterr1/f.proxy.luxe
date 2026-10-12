import { describe, expect, it } from "vitest";
import { getPurchaseErrorKey, normalizeResidentTariff } from "./purchase-error";

describe("purchase form errors", () => {
  it("only asks for login on unauthorized responses", () => {
    expect(getPurchaseErrorKey({ response: { status: 401 } })).toBe("login-required");
    expect(getPurchaseErrorKey({ response: { status: 400 } })).toBe("purchase-failed");
    expect(getPurchaseErrorKey(new Error("Network error"))).toBe("purchase-failed");
  });

  it("uses the resident tariff format accepted by the order API", () => {
    expect(normalizeResidentTariff("1 GB")).toBe("1 Gb");
  });
});
