import { describe, expect, it } from "vitest";
import { getOrderStatusPresentation } from "./order-status";

describe("order status in customer history", () => {
  it("labels a paid order as paid rather than expired", () => {
    expect(getOrderStatusPresentation("PAID").label).toBe("paid");
    expect(getOrderStatusPresentation("PAID").color).toBe("#4CAF50");
  });

  it("shows processing and canceled orders with their actual status", () => {
    expect(getOrderStatusPresentation("PROCESSING").label).toBe("processing");
    expect(getOrderStatusPresentation("CANCELED").label).toBe("canceled");
  });
});
