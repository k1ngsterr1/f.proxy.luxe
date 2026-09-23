import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { createElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { createAuthorization, legacyCreateAuthorization } = vi.hoisted(() => ({
  createAuthorization: vi.fn(),
  legacyCreateAuthorization: vi.fn(),
}));

vi.mock("../../api/ip-authorization.api", () => ({
  ipAuthorizations: { create: createAuthorization },
}));

vi.mock("../../api/post/ip-auth.api", () => ({
  ipAuth: { data: legacyCreateAuthorization },
}));

import { useIpAuth } from "./use-ip-auth.mutation";

describe("useIpAuth", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: { retry: false },
        queries: { retry: false },
      },
    });
    queryClient.setQueryData(
      ["ip-authorizations", "app-order-1", "proxy-2"],
      {
      items: [],
      },
    );
    createAuthorization.mockResolvedValue({ status: "success" });
    legacyCreateAuthorization.mockRejectedValue(
      new Error("legacy endpoint must not be called"),
    );
  });

  it("creates by internal order ID and invalidates that order's list", async () => {
    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(
      () => useIpAuth("app-order-1", "proxy-2"),
      { wrapper },
    );

    await act(async () => {
      await result.current.mutateAsync({ ip: "2001:db8::1" } as never);
    });

    expect(createAuthorization).toHaveBeenCalledWith(
      "app-order-1",
      "2001:db8::1",
      "proxy-2",
    );
    expect(legacyCreateAuthorization).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(
        queryClient.getQueryState([
          "ip-authorizations",
          "app-order-1",
          "proxy-2",
        ])?.isInvalidated,
      ).toBe(true);
    });
  });
});
