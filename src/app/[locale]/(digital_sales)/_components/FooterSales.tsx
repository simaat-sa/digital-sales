import { Link, usePathname, useRouter } from "@/shared/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function FooterSales() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sales");

  return (
    <footer className="flex justify-end h-14 items-center container mx-auto px-2 lg:px-0">
      <div>
        <Link
          href={pathname}
          locale={locale === "ar" ? "en" : "ar"}
          className="underline text-blue-600"
        >
          {t(locale !== "ar" ? "ar" : "en")}
        </Link>
      </div>
    </footer>
  );
}
