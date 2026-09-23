import { describe, expect, it } from "vitest";
import { canManageIpAuthorization } from "./ip-authorization-eligibility";

describe("canManageIpAuthorization", () => {
  it.each(["ipv6", "isp", "resident"])(
    "allows %s orders with an internal order ID",
    (type) => {
      expect(canManageIpAuthorization(type, "app-order-1")).toBe(true);
    },
  );

  it.each(["ipv4", "mobile", "mix", ""])(
    "rejects unsupported type %s",
    (type) => {
      expect(canManageIpAuthorization(type, "app-order-1")).toBe(false);
    },
  );

  it("rejects a supported type without an internal order ID", () => {
    expect(canManageIpAuthorization("resident", undefined)).toBe(false);
  });
});
