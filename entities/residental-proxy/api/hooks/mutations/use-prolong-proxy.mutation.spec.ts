import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/shared/config/apiClient";
import { prolongProxyRequest } from "./use-prolong-proxy.mutatuion";

vi.mock("@/shared/config/apiClient", () => ({ apiClient: { post: vi.fn() } }));

describe("proxy renewal response contract", () => {
  beforeEach(() => vi.mocked(apiClient.post).mockReset());

  it("rejects a provider error returned with HTTP 200", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: { status: "error" } });
    await expect(prolongProxyRequest({
      orderId: "local-order", type: "ipv6", id: "proxy-id", periodId: "1m",
    })).rejects.toThrow("Proxy renewal was not confirmed");
  });
});
