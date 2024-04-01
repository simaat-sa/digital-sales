import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import DomainForm from "../../_components/DomainForm";
import LayoutGrid from "../../_components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "sales" });

  return {
    title: t("confirm_domain_title"),
    description: t("confirm_domain_title"),
  };
}

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return (
    <LayoutGrid hasBg isGrid>
      <DomainForm state={data ? JSON.parse(data) : null} />
    </LayoutGrid>
  );
}
