import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config/apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

import { apiClient } from "@/shared/config/apiClient";
import { ipAuthorizations } from "./ip-authorization.api";

describe("ipAuthorizations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads authorizations for an application order", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { items: [{ id: "auth-1", ip: "203.0.113.10", active: true }] },
    } as never);

    await expect(ipAuthorizations.list("app-order-1")).resolves.toEqual({
      items: [{ id: "auth-1", ip: "203.0.113.10", active: true }],
    });
    expect(apiClient.get).toHaveBeenCalledWith(
      "/api/v1/user/orders/app-order-1/ip-authorizations",
    );
  });

  it("URL-encodes an order ID when loading authorizations", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: { items: [] } } as never);

    await ipAuthorizations.list("app/order 1");

    expect(apiClient.get).toHaveBeenCalledWith(
      "/api/v1/user/orders/app%2Forder%201/ip-authorizations",
    );
  });

  it("deletes one exact authorization", async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      data: { success: true },
    } as never);

    await ipAuthorizations.delete("app-order-1", "auth-1");
    expect(apiClient.delete).toHaveBeenCalledWith(
      "/api/v1/user/orders/app-order-1/ip-authorizations/auth-1",
    );
  });

  it("URL-encodes order and authorization IDs when deleting", async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      data: { success: true },
    } as never);

    await ipAuthorizations.delete("app/order 1", "auth/id 1");

    expect(apiClient.delete).toHaveBeenCalledWith(
      "/api/v1/user/orders/app%2Forder%201/ip-authorizations/auth%2Fid%201",
    );
  });
});
