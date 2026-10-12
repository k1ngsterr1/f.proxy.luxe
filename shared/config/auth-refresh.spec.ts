import axios from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";
import { requestRefreshedTokens } from "./auth-refresh";

afterEach(() => vi.restoreAllMocks());

describe("requestRefreshedTokens", () => {
  it("calls the backend refresh endpoint with the stored refresh token", async () => {
    const tokens = { accessToken: "new-access", refreshToken: "new-refresh" };
    const post = vi.spyOn(axios, "post").mockResolvedValue({ data: tokens });

    await expect(requestRefreshedTokens("https://api.proxy.luxe", "old-refresh"))
      .resolves.toEqual(tokens);
    expect(post).toHaveBeenCalledWith(
      "https://api.proxy.luxe/api/v1/auth/refresh",
      { refreshToken: "old-refresh" },
      { withCredentials: true }
    );
  });
});
