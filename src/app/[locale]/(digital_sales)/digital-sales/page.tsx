import React from "react";
import Wizard from "../_components/wizard";
import { Metadata } from "next";
import { RootLayoutProps } from "../../layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const translateSales = await getTranslations("sales");

  return {
    title: translateSales("simaat_digital_sales"),
  };
}

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center">
      <Wizard />
    </div>
  );
}
