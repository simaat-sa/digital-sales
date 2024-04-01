import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import CustomPlanForm from "../../_components/CustomPlanForm";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "v2.sales" });

  return {
    title: t("custom_your_quote_title"),
    description: t("custom_your_quote_title"),
  };
}

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return <CustomPlanForm state={data ? JSON.parse(data) : null} />;
}
