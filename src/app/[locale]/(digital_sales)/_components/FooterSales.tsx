import { Link, usePathname } from "@/shared/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useQuotePricingService } from "../_services/QuotePricingService";

export default function FooterSales() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sales");
  const { reset } = useQuotePricingService();

  return (
    <footer className="container mx-auto flex h-14 items-center justify-between">
      <Link
        href={
          !pathname.includes("/v2") ? "/v2/digital-sales" : "/v1/digital-sales"
        }
        className="text-secondary-900 underline"
        onClick={() => reset()}
        prefetch={true}
      >
        {!pathname.includes("/v2") ? t("v2") : t("v1")}
      </Link>

      <Link
        href={pathname}
        locale={locale === "ar" ? "en" : "ar"}
        className="text-secondary-900 underline"
      >
        {t(locale !== "ar" ? "ar" : "en")}
      </Link>
    </footer>
  );
}
