import { Link, usePathname, useRouter } from "@/shared/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function FooterSales() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sales");

  return (
    <footer className="flex justify-end h-14 items-center container mx-auto">
      <Link
        href={pathname}
        locale={locale === "ar" ? "en" : "ar"}
        className="underline text-secondary-900"
      >
        {t(locale !== "ar" ? "ar" : "en")}
      </Link>
    </footer>
  );
}
