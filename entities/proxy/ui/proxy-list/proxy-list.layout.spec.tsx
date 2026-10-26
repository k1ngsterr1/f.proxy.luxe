import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProxyList from "./proxy-list";
import { apiClient } from "@/shared/config/apiClient";
const prolongMutation = vi.hoisted(() => vi.fn());

vi.mock("@/shared/config/apiClient", () => ({
  apiClient: { post: vi.fn() },
}));

vi.mock("next-intl", () => ({
  useLocale: () => "ru",
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/store/use-popup.store", () => ({
  usePopupStore: () => ({ openPopup: vi.fn() }),
}));

vi.mock(
  "@/entities/residental-proxy/api/hooks/mutations/use-delete-resident-proxy.mutation",
  () => ({
    useDeleteProxy: () => ({ deleteProxy: vi.fn() }),
  }),
);

vi.mock(
  "@/entities/residental-proxy/api/hooks/mutations/use-prolong-proxy.mutatuion",
  () => ({
    useProlongProxy: () => ({
      prolongProxy: prolongMutation,
      isProlonging: false,
      reset: vi.fn(),
    }),
  }),
);

vi.mock("@/entities/user/api/hooks/use-get-user.query", () => ({
  useGetUser: () => ({ data: { balance: 100 } }),
}));

describe("ProxyList action layout", () => {
  beforeEach(() => {
    vi.mocked(apiClient.post).mockReset();
    prolongMutation.mockReset();
  });
  afterEach(cleanup);

  it("sends selected ISP IDs as an array and reports a failed renewal honestly", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      data: { status: "error", message: "Provider rejected renewal" },
    });
    render(
      <ProxyList
        type="isp"
        selectedProxies={["ip-1", "ip-2"]}
        proxies={[
          { id: "ip-1", orderId: "local-order", order_id: "provider-order", ip: "192.0.2.1", type: "isp", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
          { id: "ip-2", orderId: "local-order", order_id: "provider-order", ip: "192.0.2.2", type: "isp", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
        ]}
      />,
    );
    fireEvent.click(await screen.findByRole("button", { name: /prolongBatchTitle/ }));
    fireEvent.click(screen.getByRole("button", { name: "prolongConfirm" }));
    await waitFor(() => expect(apiClient.post).toHaveBeenCalledWith(
      "/api/v1/products/prolong",
      { orderId: "local-order", type: "isp", id: ["ip-1", "ip-2"], periodId: "1m" },
    ));
    expect(await screen.findByText("prolongBatchFailed")).toBeInTheDocument();
  });

  it("asks for expiry verification when a renewal may already be complete", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      status: 409, data: { status: "error" },
    });
    render(<ProxyList type="isp" selectedProxies={["ip-1"]} proxies={[
      { id: "ip-1", orderId: "local-order", order_id: "provider-order", ip: "192.0.2.1", type: "isp", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
    ]} />);
    fireEvent.click(await screen.findByRole("button", { name: /prolongBatchTitle/ }));
    fireEvent.click(screen.getByRole("button", { name: "prolongConfirm" }));
    expect(await screen.findByText("prolongBatchVerify")).toBeInTheDocument();
  });

  it("uses the individual IPv6 proxy ID for a single renewal", async () => {
    render(<ProxyList type="ipv6" proxies={[
      { id: "proxy-id", orderId: "local-order", order_id: "provider-order", ip: "2001:db8::1", type: "ipv6", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
    ]} />);
    fireEvent.click(await screen.findByRole("button", { name: "table.buttons.prolong" }));
    fireEvent.click(screen.getByRole("button", { name: "prolongConfirm" }));
    expect(prolongMutation).toHaveBeenCalledWith(
      expect.objectContaining({ orderId: "local-order", id: "proxy-id", type: "ipv6" }),
      expect.any(Object),
    );
  });

  it("reports only renewed IDs to the parent after partial batch success", async () => {
    const onRenewalSuccess = vi.fn();
    vi.mocked(apiClient.post)
      .mockResolvedValueOnce({ data: { status: "success" } })
      .mockResolvedValueOnce({ data: { status: "error" } });
    render(<ProxyList type="isp" selectedProxies={["ip-1", "ip-2"]} onRenewalSuccess={onRenewalSuccess} proxies={[
      { id: "ip-1", orderId: "order-1", order_id: "provider-1", ip: "192.0.2.1", type: "isp", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
      { id: "ip-2", orderId: "order-2", order_id: "provider-2", ip: "192.0.2.2", type: "isp", protocol: "http", country: "US", login: "u", password: "p", package_list: [] },
    ]} />);
    fireEvent.click(await screen.findByRole("button", { name: /prolongBatchTitle/ }));
    fireEvent.click(screen.getByRole("button", { name: "prolongConfirm" }));
    await waitFor(() => expect(onRenewalSuccess).toHaveBeenCalledWith(["ip-1"]));
    expect(await screen.findByText("prolongBatchPartial")).toBeInTheDocument();
  });
  it("keeps resident package renewal available when the package has no proxy lists", async () => {
    const residentPackage = {
      id: "resident-package-1",
      orderId: "app-order-1",
      order_id: "provider-order-1",
      ip: "",
      type: "resident",
      protocol: "",
      country: "",
      login: "",
      password: "",
      package_list: [],
      package_key: "resident-package-key",
      tariff: "10 Gb",
      prolong_price: 21,
      date_end: "2026-11-18",
    };

    render(
      <ProxyList
        type="resident"
        proxies={[]}
        residentPackage={residentPackage}
      />,
    );

    expect(
      await screen.findByLabelText("residentTariff"),
    ).toHaveValue("10 Gb");
    const prolongButton = screen.getByRole("button", {
      name: "prolongConfirm ($21.00)",
    });
    expect(prolongButton).toBeInTheDocument();
    expect(screen.getByText("emptyTitle")).toBeInTheDocument();

    fireEvent.click(prolongButton);
    expect(screen.getByText("prolongTitle")).toBeInTheDocument();
    expect(screen.getByText("$21.00")).toBeInTheDocument();
  });

  it("keeps every row action in one stable icon-button group", async () => {
    render(
      <ProxyList
        type="ipv6"
        proxies={[
          {
            id: "provider-proxy-1",
            orderId: "app-order-1",
            ip: "2001:db8::1",
            type: "ipv6",
            protocol: "https",
            port_http: 8080,
            port_socks: 1080,
            country: "US",
            login: "user",
            password: "password",
            package_list: [],
            date_end: "2026-10-24",
          },
        ]}
      />,
    );

    const copyButton = await screen.findByTitle("table.buttons.copy");
    const actions = copyButton.parentElement;
    expect(actions).not.toBeNull();
    expect(actions?.style.flexWrap).toBe("nowrap");

    await waitFor(() => {
      const buttons = actions?.querySelectorAll("button") ?? [];
      expect(buttons).toHaveLength(5);
      buttons.forEach((button) => {
        expect(button.style.width).toBe("32px");
        expect(button.style.height).toBe("32px");
        expect(button.style.flex).toBe("0 0 32px");
      });
    });
  });
});
