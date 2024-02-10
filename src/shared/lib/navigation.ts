import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Locale } from "../types/locale";

export const locales = ["ar", "en"] as const;
export const localePrefix = "always"; // Default
export const defaultLocale: Locale = "ar";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
