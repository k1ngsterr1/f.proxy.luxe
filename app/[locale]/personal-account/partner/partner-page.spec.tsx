import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/messages/en/personal-partner.json";
import ru from "@/messages/ru/personal-partner.json";
import PartnerPage from "./page";

const { get, post } = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }));

// Mock the entire HTTP boundary: these tests must never perform financial writes.
vi.mock("@/shared/config/apiClient", () => ({
  apiClient: { get, post, delete: vi.fn() },
}));

const user = {
  id: "partner-a",
  email: "partner@example.test",
  balance: 0,
  isVerified: true,
  coupon_code: undefined,
};

function details() {
  return {
    referrals: [
      {
        id: "referral-1",
        userId: "buyer-1",
        createdAt: "2026-09-01T00:00:00.000Z",
        purchasesCount: 3,
        purchasesTotal: "12.10",
        commissionAmount: "1.815" as string | null,
        recordedCommission: "1.815",
        commissionComplete: true,
      },
    ],
    transactions: [],
    payout: null,
    earnedLastMonth: "0",
    allTimeEarn: "9007199254740993.10",
    availableBalance: "5.5",
  };
}

const clients: QueryClient[] = [];

function renderPage({ locale = "en", width = 1200, authenticated = true } = {}) {
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  clients.push(client);
  client.setQueryData(["me"], authenticated ? user : null);
  const result = render(
    createElement(QueryClientProvider, { client },
      createElement(NextIntlClientProvider, {
        locale,
        timeZone: "UTC",
        messages: { ...(locale === "ru" ? ru : en), partnerProgramm: { title: "Partner" } },
        children: createElement(PartnerPage),
      }),
    ),
  );
  return { ...result, client };
}

beforeEach(() => {
  get.mockReset();
  post.mockReset();
  get.mockImplementation(async (url: string) => {
    if (url === "/api/v1/user/me") return { data: user };
    if (url === "/api/v1/user/partner/details") return { data: details() };
    throw new Error(`Unexpected GET: ${url}`);
  });
  post.mockRejectedValue(new Error("Unexpected financial write in test"));
});

afterEach(() => {
  cleanup();
  clients.splice(0).forEach((client) => client.clear());
});

describe.each([1200, 375])("partner statistics at %ipx", (width) => {
  it.each(["en", "ru"])("renders API purchases and exact commission in %s", async (locale) => {
    renderPage({ width, locale });

    expect(await screen.findByText("3 / 12.10 $")).toBeInTheDocument();
    expect(screen.getByText("1.815 $")).toBeInTheDocument();
    expect(screen.getByText("9007199254740993.10 $")).toBeInTheDocument();
    expect(screen.getByText("5.50 $")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(Boolean(screen.queryByRole("table"))).toBe(width >= 768);
  });

  it("renders complete zeroes without confusing them with missing data", async () => {
    const data = details();
    Object.assign(data.referrals[0], {
      purchasesCount: 0, purchasesTotal: "0", commissionAmount: "0",
      recordedCommission: "0",
    });
    Object.assign(data, { allTimeEarn: "0", availableBalance: "0.00" });
    get.mockResolvedValue({ data });
    renderPage({ width });

    expect(await screen.findByText("0 / 0.00 $")).toBeInTheDocument();
    expect(screen.getAllByText("0.00 $")).toHaveLength(3);
    expect(screen.queryByText("No breakdown available")).not.toBeInTheDocument();
  });

  it.each([
    ["en", "No breakdown available", "partial"],
    ["ru", "Нет детализации", "неполные данные"],
  ])("distinguishes unknown historical totals and recorded commission in %s", async (locale, missing, partial) => {
    const data = details();
    Object.assign(data.referrals[0], {
      commissionAmount: null, recordedCommission: "0", commissionComplete: false,
    });
    data.referrals.push({
      ...data.referrals[0], id: "referral-2", userId: "buyer-2",
      recordedCommission: "2.345",
    });
    get.mockResolvedValue({ data });
    renderPage({ width, locale });

    expect(await screen.findByText(missing)).toBeInTheDocument();
    expect(screen.getByText(`2.345 $ (${partial})`)).toHaveAttribute("title");
    expect(screen.queryByText("0.00 $")).not.toBeInTheDocument();
  });

  it("shows loading instead of empty referrals or invented summary zeroes", () => {
    get.mockReturnValue(new Promise(() => {}));
    renderPage({ width });

    expect(screen.getByRole("status")).toHaveTextContent("Loading statistics...");
    expect(screen.queryByText("No referrals found...")).not.toBeInTheDocument();
    expect(screen.queryByText("0.00 $")).not.toBeInTheDocument();
  });

  it.each([
    ["en", "Could not load statistics. Please try again.", "Retry"],
    ["ru", "Не удалось загрузить статистику. Попробуйте ещё раз.", "Повторить"],
  ])("retries failed responses in %s without displaying fake zeroes", async (locale, message, retry) => {
    get.mockRejectedValueOnce(new Error("Offline"));
    renderPage({ width, locale });

    expect(await screen.findByRole("alert")).toHaveTextContent(message);
    expect(screen.queryByText("0.00 $")).not.toBeInTheDocument();
    expect(screen.queryByText("No referrals found...")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: retry }));
    expect(await screen.findByText("3 / 12.10 $")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

it("does not fetch statistics or construct a referral URL without an authenticated user ID", async () => {
  renderPage({ authenticated: false });

  expect(screen.getByRole("button", { name: "COPY LINK" })).toBeDisabled();
  expect(screen.getAllByRole("textbox")[0]).toHaveValue("");
  expect(screen.queryByText("0.00 $")).not.toBeInTheDocument();
  expect(get).not.toHaveBeenCalled();
});

it("waits for user hydration and isolates cached statistics when the user changes", async () => {
  const { client } = renderPage({ authenticated: false });
  expect(get).not.toHaveBeenCalled();

  await act(async () => { client.setQueryData(["me"], user); });
  expect(await screen.findByText("3 / 12.10 $")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox")[0]).toHaveValue(`${window.location.origin}/register?ref=partner-a`);

  const next = details();
  Object.assign(next.referrals[0], { purchasesCount: 7, purchasesTotal: "40" });
  get.mockResolvedValue({ data: next });
  await act(async () => { client.setQueryData(["me"], { ...user, id: "partner-b" }); });

  expect(await screen.findByText("7 / 40.00 $")).toBeInTheDocument();
  expect(screen.queryByText("3 / 12.10 $")).not.toBeInTheDocument();
  expect(client.getQueryData(["partner-details", "partner-a"])).toEqual(details());
  expect(client.getQueryData(["partner-details", "partner-b"])).toEqual(next);
});

it.each([
  {},
  { ...details(), availableBalance: null },
  { ...details(), allTimeEarn: "not-a-decimal" },
  { ...details(), referrals: [{ ...details().referrals[0], purchasesTotal: undefined }] },
  { ...details(), referrals: [{ ...details().referrals[0], commissionAmount: null }] },
])("shows a retryable error for malformed statistics (%j)", async (data) => {
  get.mockResolvedValue({ data });
  renderPage();

  expect(await screen.findByRole("alert")).toHaveTextContent("Could not load statistics.");
  expect(screen.getByRole("button", { name: "Retry" })).toBeEnabled();
  expect(screen.queryByText("0.00 $")).not.toBeInTheDocument();
});

it("shows empty referrals only after a successful response", async () => {
  get.mockResolvedValue({ data: { ...details(), referrals: [] } });
  renderPage();

  expect(await screen.findByText("No referrals found...")).toBeInTheDocument();
  expect(screen.getByText("9007199254740993.10 $")).toBeInTheDocument();
});

it("rounds summary decimals to two places without floating-point loss", async () => {
  get.mockResolvedValue({ data: { ...details(), allTimeEarn: "1.005", availableBalance: "9.999" } });
  renderPage();

  expect(await screen.findByText("1.01 $")).toBeInTheDocument();
  expect(screen.getByText("10.00 $")).toBeInTheDocument();
});

it("refreshes statistics after a successful mocked payout without changing its payload", async () => {
  post.mockResolvedValue({ data: {} });
  const { client } = renderPage();
  await screen.findByText("5.50 $");
  await userEvent.click(screen.getByRole("button", { name: "REQUEST WITHDRAWAL" }));
  await userEvent.type(screen.getByPlaceholderText("Enter payment address"), "test-wallet");
  const updated = { ...details(), availableBalance: "0" };
  get.mockResolvedValue({ data: updated });
  const submit = screen.getAllByRole("button", { name: "REQUEST WITHDRAWAL" });
  await userEvent.click(submit[1]);

  expect(post).toHaveBeenCalledExactlyOnceWith("/api/v1/user/partner/payout", { wallet: "test-wallet" });
  await waitFor(() => expect(client.getQueryData(["partner-details", user.id])).toEqual(updated));
  expect(await screen.findByText("0.00 $")).toBeInTheDocument();
});
