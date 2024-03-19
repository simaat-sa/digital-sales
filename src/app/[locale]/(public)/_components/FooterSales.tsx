"use client";
import { Link, usePathname } from "@/shared/lib/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function FooterSales() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sales");

  return (
    <footer className="h-footer border-t">
      <div className="container grid h-full w-full grid-cols-2 items-center py-1 lg:py-0">
        <div className="col-span-2 flex items-center justify-center lg:col-span-1 lg:justify-start">{`منصة سمات Simaat © ${new Date(Date.now()).getFullYear()}. جميع الحقوق محفوظة.`}</div>
        <div className="col-span-2 flex items-center justify-center lg:col-span-1 lg:justify-end">
          <Link
            href={pathname}
            locale={locale === "ar" ? "en" : "ar"}
            className="text-secondary-900 underline"
          >
            {t(locale !== "ar" ? "ar" : "en")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
