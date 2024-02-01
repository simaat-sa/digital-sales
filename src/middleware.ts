import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { Locales } from "@/shared/types/locale";
import { localePrefix, locales } from "@/shared/lib/navigation";

const LOCALE_HEADER = "LOCALE";

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get(LOCALE_HEADER) || Locales.AR;

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: Locales.AR,
    localeDetection: true,
    localePrefix: localePrefix,
  });

  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set(LOCALE_HEADER, defaultLocale);

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
