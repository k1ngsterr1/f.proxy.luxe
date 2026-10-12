import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("home page partner banner", () => {
  it("uses the approved campaign link and GIF", () => {
    const component = readFileSync(
      resolve(process.cwd(), "widgets/blocks/home-page/partners-block.tsx"),
      "utf8",
    );
    const gif = readFileSync(resolve(process.cwd(), "public/306_54.gif"));

    expect(component).toContain(
      "https://dolphin-anty.net/?utm_source=media&utm_medium=cpc&utm_campaign=proxy_luxe&utm_content=banner2",
    );
    expect(component).toContain('src="/306_54.gif"');
    expect(createHash("sha256").update(gif).digest("hex")).toBe(
      "02adc858c3d1a60cc1b598494324e828988d00908d8df9d6e888f324408e8c66",
    );
  });
});
