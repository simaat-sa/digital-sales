import React from "react";
import Wizard from "../_components/wizard";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const translateSales = await getTranslations("sales");

  return {
    title: translateSales("simaat_digital_sales"),
  };
}

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Wizard />
    </div>
  );
}
