import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProxyPage from "./page";

const mocks = vi.hoisted(() => ({
  prolongProxy: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "ru",
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/shared/utils/use-is-mobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("@/entities/user/api/hooks/use-get-user.query", () => ({
  useGetUser: () => ({ data: { balance: 100, isVerified: true } }),
}));

vi.mock("@/entities/proxy/hooks/queries/use-get-all-proxies.queries", () => {
  const emptyResponse = {
    status: "success",
    data: { items: [] },
  };
  const residentResponse = {
    status: "success",
    data: {
      items: [
        {
          id: "resident-package-1",
          ip: "",
          type: "resident",
          ports: [],
          protocol: "",
          port_socks: 0,
          port_http: 0,
          geo: [],
          login: "",
          password: "",
          package_items: [],
          package_list: [],
          package_info: {
            package_key: "resident-package-key",
            traffic_limit: 10 * 1073741824,
            traffic_usage: 0,
            rotation: 60,
            expired_at: { date: "2026-11-18" },
          },
          order_number: "NS_resident-order",
          order_id: "provider-order-1",
          orderId: "app-order-1",
          date_end: "2026-11-18",
          tariff: "10 Gb",
          prolong_price: 21,
        },
      ],
    },
  };

  return {
    useProxyList: (type: string) => ({
      data: type === "resident" ? residentResponse : emptyResponse,
      isLoading: false,
      isError: false,
      error: null,
    }),
  };
});

vi.mock(
  "@/entities/residental-proxy/api/hooks/mutations/use-update-list-resident.mutation",
  () => ({
    useUpdateProxy: () => ({ updateProxy: vi.fn(), isUpdating: false }),
  }),
);

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
      prolongProxy: mocks.prolongProxy,
      isProlonging: false,
      reset: vi.fn(),
    }),
  }),
);

vi.mock("@/shared/store/use-popup.store", () => ({
  usePopupStore: () => ({ openPopup: vi.fn() }),
}));

vi.mock("@/features/traffic-bar/traffic-bar", () => ({
  TrafficBar: () => <div data-testid="traffic-bar" />,
}));

vi.mock(
  "@/features/residental-proxy-constructor/residental-proxy-constructor",
  () => ({
    ResidentProxyConstructor: () => <div data-testid="resident-constructor" />,
  }),
);

describe("ProxyPage resident renewal", () => {
  it("keeps package renewal functional when the provider returns no proxy lists", async () => {
    render(<ProxyPage />);

    fireEvent.click(screen.getByRole("button", { name: "RESIDENT" }));

    expect(
      await screen.findByLabelText("residentTariff"),
    ).toHaveValue("10 Gb");
    expect(screen.getByText("emptyTitle")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "prolongConfirm ($21.00)" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "prolongConfirm" }));

    await waitFor(() => {
      expect(mocks.prolongProxy).toHaveBeenCalledWith(
        {
          orderId: "app-order-1",
          type: "resident",
          id: "resident-package-key",
          periodId: "1m",
          tariff: "10 Gb",
        },
        expect.any(Object),
      );
    });
  });
});
