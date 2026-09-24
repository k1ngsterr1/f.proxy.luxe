import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(
  resolve(process.cwd(), "assets/styles/style.css"),
  "utf8"
);

describe("payment method layout", () => {
  it("stretches each card to the full height of its flex item", () => {
    const selector = [
      ".personal_account",
      ".mw",
      ".cont",
      ".main_cont",
      ".payment_method",
      ".methods",
      ".method",
      ".method_cont",
    ].join("\\s+");
    const rule = styles.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1];

    expect(rule).toBeDefined();
    expect(rule).toMatch(/(?:^|;)\s*height:\s*100%\s*;/);
  });
});
