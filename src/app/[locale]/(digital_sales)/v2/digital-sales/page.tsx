import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WizardV2 from "../../_components/wizardV2";

export async function generateMetadata(): Promise<Metadata> {
  const translateSales = await getTranslations("sales");

  return {
    title: translateSales("simaat_digital_sales"),
  };
}

export default function Page() {
  return (
    <div className="relative flex w-full flex-col items-center">
      <WizardV2 />
    </div>
  );
}
