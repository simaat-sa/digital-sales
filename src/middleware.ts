import { defaultLocale, locales } from "@/shared/lib/navigation";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const LOCALE_HEADER = "SIMAAT_LOCALE";

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  // Step 1: Use the incoming request (example)
  const localeHeader = request.headers.get(LOCALE_HEADER) || defaultLocale;

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localePrefix: "always",
  });

  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set(LOCALE_HEADER, localeHeader);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
