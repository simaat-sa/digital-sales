import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import SummaryInvoiceForm from "../../_components/SummaryInvoiceForm";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "sales" });

  return {
    title: t("summary_order"),
    description: t("summary_order"),
  };
}

export default async function Page() {
  const data = cookies().get("data")?.value;

  return <SummaryInvoiceForm state={data ? JSON.parse(data) : null} />;
}
