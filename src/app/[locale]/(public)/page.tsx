import WizardV2 from "@/app/[locale]/(public)/_components/wizardV2";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const translateSales = await getTranslations("sales");

  return {
    title: translateSales("simaat_digital_sales"),
  };
}

export default function Page() {
  return <WizardV2 />;
}
