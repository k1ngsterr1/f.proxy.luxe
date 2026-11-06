import { describe, expect, it } from "vitest";
import { articleSitemapEntries } from "./sitemap-articles";

describe("articleSitemapEntries", () => {
  it("emits each article under its own language and slug", () => {
    expect(articleSitemapEntries([
      { lang: "ru", slug: "russian", updatedAt: "2026-09-18T12:40:00Z" },
      { lang: "en", slug: "english", updatedAt: "2026-09-18T12:43:00Z" },
    ]).map((entry) => entry.url)).toEqual([
      "https://proxy.luxe/ru/articles/russian",
      "https://proxy.luxe/en/articles/english",
    ]);
  });
});
