import { cleanup, fireEvent, render } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PopupLayout } from "./popup-layout";

const { closePopup } = vi.hoisted(() => ({ closePopup: vi.fn() }));

vi.mock("../store/use-popup.store", () => ({
  usePopupStore: () => ({
    closePopup,
    openPopups: { "popup-test": true },
  }),
}));

describe("PopupLayout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("keeps the popup shell viewport-safe and scrollable on narrow screens", () => {
    const { container } = render(
      createElement(
        PopupLayout,
        {
          id: "popup-test",
          text: "Popup title",
          children: createElement(
            "div",
            { style: { height: "2000px" } },
            "Long content",
          ),
        },
      ),
    );
    const overlay = container.firstElementChild as HTMLElement;
    const content = overlay.firstElementChild as HTMLElement;

    expect(overlay).toHaveStyle({
      boxSizing: "border-box",
      height: "100dvh",
      overflowY: "auto",
      padding: "16px",
    });
    expect(content).toHaveStyle({
      borderRadius: "8px",
      boxSizing: "border-box",
      maxHeight: "calc(100dvh - 32px)",
      maxWidth: "100%",
      overflowY: "auto",
      width: "400px",
    });
  });

  it("closes only for clicks on the overlay", () => {
    const { container } = render(
      createElement(
        PopupLayout,
        {
          id: "popup-test",
          text: "Popup title",
          children: createElement("span", null, "Content"),
        },
      ),
    );
    const overlay = container.firstElementChild as HTMLElement;
    const content = overlay.firstElementChild as HTMLElement;

    fireEvent.click(content);
    expect(closePopup).not.toHaveBeenCalled();

    fireEvent.click(overlay);
    expect(closePopup).toHaveBeenCalledWith("popup-test");
  });
});
