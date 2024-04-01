import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import PricingPlanForm from "../../_components/PricingPlanForm";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "sales" });

  return {
    title: t("quotes_title"),
    description: t("quotes_title"),
  };
}

export default async function Page() {
  const data = cookies().get("data")?.value;

  return <PricingPlanForm state={data ? JSON.parse(data) : null} />;
}
