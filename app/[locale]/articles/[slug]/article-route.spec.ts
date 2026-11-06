import { describe, expect, it } from "vitest";
import { resolveArticleRoute } from "./article-route";

describe("resolveArticleRoute", () => {
  const english = { lang: "en" as const, slug: "english", translation: { id: "ru-id", lang: "ru" as const, slug: "russian" } };

  it("redirects a mismatched locale URL to the translated slug", () => {
    expect(resolveArticleRoute(english, "ru")).toBe("/ru/articles/russian");
  });

  it("redirects an unpaired wrong-locale URL to the actual locale", () => {
    expect(resolveArticleRoute({ ...english, translation: null }, "ru")).toBe("/en/articles/english");
  });

  it("keeps a correctly localized URL", () => {
    expect(resolveArticleRoute(english, "en")).toBeNull();
  });
});
