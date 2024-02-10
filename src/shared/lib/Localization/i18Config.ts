import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/shared/lib/navigation";
import { Locale } from "@/shared/types/locale";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`@/shared/lib/Localization/${locale}.json`))
      .default,
  };
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية (Arabic)",
};
