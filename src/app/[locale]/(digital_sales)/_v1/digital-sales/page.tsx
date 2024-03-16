import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Wizard from "../../_components/wizard";

export async function generateMetadata(): Promise<Metadata> {
  const translateSales = await getTranslations("sales");

  return {
    title: translateSales("simaat_digital_sales"),
  };
}

export default function Page() {
  return <Wizard />;
}
