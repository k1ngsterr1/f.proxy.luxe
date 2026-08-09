import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IpAuthorizationList } from "./ip-authorization-list";

const { mockUseIpAuthorizations, mockUseDeleteIpAuthorization } = vi.hoisted(
  () => ({
    mockUseIpAuthorizations: vi.fn(),
    mockUseDeleteIpAuthorization: vi.fn(),
  }),
);

vi.mock("@/entities/auth/hooks/queries/use-ip-authorizations.query", () => ({
  useIpAuthorizations: mockUseIpAuthorizations,
}));

vi.mock(
  "@/entities/auth/hooks/mutations/use-delete-ip-authorization.mutation",
  () => ({
    useDeleteIpAuthorization: mockUseDeleteIpAuthorization,
  }),
);

vi.mock("next-intl", () => ({
  useTranslations: () =>
    (key: string, values?: Record<string, string>) => {
      const messages: Record<string, string> = {
        currentAuthorizations: "Current IPs",
        emptyAuthorizations: "No IP authorizations have been added",
        loadError: "Could not load IP authorizations",
        confirmRemove: "Confirm removal",
        cancelRemove: "Cancel",
        removeSuccess: "IP authorization disabled",
        removeError: "Could not disable IP authorization",
        active: "Active",
        inactive: "Inactive",
      };

      return key === "remove" ? `Remove ${values?.ip}` : messages[key];
    },
}));

const deleteMutation = {
  mutate: vi.fn(),
  reset: vi.fn(),
  isPending: false,
  isError: false,
  isSuccess: false,
  error: null,
};

const authorization = {
  id: "auth-1",
  ip: "203.0.113.10",
  active: true,
  orderNumber: "5094738_108303894",
};

describe("IpAuthorizationList", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    Object.assign(deleteMutation, {
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
    });
    mockUseIpAuthorizations.mockReturnValue({
      data: { items: [authorization] },
      isLoading: false,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);
  });

  it("requires confirmation before deleting an IP authorization", async () => {
    const user = userEvent.setup();
    mockUseIpAuthorizations.mockReturnValue({
      data: { items: [authorization] },
      isLoading: false,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    render(createElement(IpAuthorizationList, { orderId: "app-order-1" }));

    await user.click(
      screen.getByRole("button", { name: /remove 203.0.113.10/i }),
    );
    expect(deleteMutation.mutate).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /confirm removal/i }));
    expect(deleteMutation.mutate).toHaveBeenCalledWith({
      orderId: "app-order-1",
      authorizationId: "auth-1",
    });
  });

  it("cancels removal without deleting the authorization", async () => {
    const user = userEvent.setup();
    mockUseIpAuthorizations.mockReturnValue({
      data: { items: [authorization] },
      isLoading: false,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    render(createElement(IpAuthorizationList, { orderId: "app-order-1" }));

    await user.click(
      screen.getByRole("button", { name: /remove 203.0.113.10/i }),
    );
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(deleteMutation.mutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: /remove 203.0.113.10/i }),
    ).toBeInTheDocument();
  });

  it("shows a stable loading state while authorizations are loading", () => {
    mockUseIpAuthorizations.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    render(createElement(IpAuthorizationList, { orderId: "app-order-1" }));

    expect(screen.getByRole("status")).toHaveTextContent("Current IPs");
  });

  it("shows an empty state when the order has no IP authorizations", () => {
    mockUseIpAuthorizations.mockReturnValue({
      data: { items: [] },
      isLoading: false,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    render(createElement(IpAuthorizationList, { orderId: "app-order-1" }));

    expect(
      screen.getByText("No IP authorizations have been added"),
    ).toBeInTheDocument();
  });

  it("shows a query error when authorizations cannot be loaded", () => {
    mockUseIpAuthorizations.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Network error"),
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    render(createElement(IpAuthorizationList, { orderId: "app-order-1" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not load IP authorizations",
    );
  });

  it("shows pending, error, and success feedback for the selected authorization", async () => {
    const user = userEvent.setup();
    mockUseIpAuthorizations.mockReturnValue({
      data: { items: [authorization] },
      isLoading: false,
      error: null,
    });
    mockUseDeleteIpAuthorization.mockReturnValue(deleteMutation);

    const { rerender } = render(
      createElement(IpAuthorizationList, { orderId: "app-order-1" }),
    );
    await user.click(
      screen.getByRole("button", { name: /remove 203.0.113.10/i }),
    );
    await user.click(screen.getByRole("button", { name: /confirm removal/i }));

    Object.assign(deleteMutation, { isPending: true });
    rerender(createElement(IpAuthorizationList, { orderId: "app-order-1" }));
    expect(
      screen.getByRole("button", { name: /confirm removal/i }),
    ).toBeDisabled();

    Object.assign(deleteMutation, { isPending: false, isError: true });
    rerender(createElement(IpAuthorizationList, { orderId: "app-order-1" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not disable IP authorization",
    );

    Object.assign(deleteMutation, { isError: false, isSuccess: true });
    rerender(createElement(IpAuthorizationList, { orderId: "app-order-1" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "IP authorization disabled",
    );
    expect(
      screen.getByRole("button", { name: /confirm removal/i }),
    ).toBeDisabled();
  });
});
