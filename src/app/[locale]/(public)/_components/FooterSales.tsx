"use client";
import { Link, usePathname } from "@/shared/lib/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function FooterSales() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sales");

  return (
    <footer className="h-footer relative z-20 border-t bg-transparent">
      <div className="container grid h-16 w-full grid-cols-2 items-center">
        <div className="col-span-2 flex items-center lg:col-span-1">{`منصة سمات Simaat © ${new Date(Date.now()).getFullYear()}. جميع الحقوق محفوظة.`}</div>
        <div className="ccol-span-2 flex items-center justify-end lg:col-span-1">
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
