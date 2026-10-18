import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProxyList from "./proxy-list";

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
      prolongProxy: vi.fn(),
      isProlonging: false,
      reset: vi.fn(),
    }),
  }),
);

vi.mock("@/entities/user/api/hooks/use-get-user.query", () => ({
  useGetUser: () => ({ data: { balance: 100 } }),
}));

describe("ProxyList action layout", () => {
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
