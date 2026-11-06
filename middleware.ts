import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { resolveArticleRoute } from "./app/[locale]/articles/[slug]/article-route";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/(ru|en)\/articles\/([^/]+)\/?$/);
  if (match) {
    try {
      const response = await fetch(
        `https://api.proxy.luxe/api/v1/articles/${encodeURIComponent(decodeURIComponent(match[2]))}`,
        { signal: AbortSignal.timeout(3000) },
      );
      if (response.ok) {
        const article = await response.json();
        const destination = resolveArticleRoute(article, match[1] as "ru" | "en");
        if (destination) return NextResponse.redirect(new URL(destination, request.url), 307);
      }
    } catch {
      // The article page handles API failures and missing articles.
    }
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|go|_next|_vercel|.*\\..*).*)',
  ],
};
