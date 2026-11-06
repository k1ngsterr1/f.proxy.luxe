import { describe, expect, it } from "vitest";
import { articleLanguagePath } from "./article-language-path";

describe("articleLanguagePath", () => {
  const article = {
    lang: "en" as const,
    slug: "english-story",
    translation: { lang: "ru" as const, slug: "russian-story" },
  };

  it("uses the matching translated slug", () => {
    expect(articleLanguagePath(article, "ru")).toBe("/articles/russian-story");
  });

  it("falls back to the article listing when no translation exists", () => {
    expect(articleLanguagePath({ ...article, translation: null }, "ru")).toBe("/articles");
  });
});
