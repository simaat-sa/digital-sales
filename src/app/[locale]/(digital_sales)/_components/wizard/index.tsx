"use client";
import ActionButton from "@/app/[locale]/(digital_sales)/_components/wizard/ActionButton";
import CheckDomain from "@/app/[locale]/(digital_sales)/_components/wizard/Domain";
import Quotes from "@/app/[locale]/(digital_sales)/_components/wizard/Quotes";
import RegisterForm from "@/app/[locale]/(digital_sales)/_components/wizard/Register";
import RequirementForm from "@/app/[locale]/(digital_sales)/_components/wizard/Requirement";
import Success from "@/app/[locale]/(digital_sales)/_components/wizard/Success";
import Summary from "@/app/[locale]/(digital_sales)/_components/wizard/Summary";
import {
  Wizards,
  useQuotePricingService,
} from "@/app/[locale]/(digital_sales)/_services/QuotePricingService";
import { quotesData } from "@/app/[locale]/(digital_sales)/_services/quotesData";
import Image from "next/image";
import { useEffect } from "react";
import FooterSales from "../FooterSales";

const planningPrice = "/assets/images/simaat-summary.png";

export default function Wizard() {
  const { currentWizard, showCode, setAllAddons } = useQuotePricingService();

  useEffect(() => {
    setAllAddons(quotesData);
  }, [setAllAddons]);

  return (
    <main className="relative after:bottom-0 after:left-0 after:top-0 after:z-10 after:w-1/2 after:bg-gray-100 lg:after:absolute lg:after:content-[''] rtl:after:right-0">
      <section className="min-h-layout container relative z-20">
        {(["register", "requirements", "domain"] as Wizards[]).includes(
          currentWizard,
        ) ? (
          <div className="grid h-full w-full grid-cols-2">
            <div className="hidden h-full items-center justify-center lg:flex">
              <Image
                src={planningPrice}
                alt="planning price"
                width={1000}
                height={800}
                className="bg-slate-100 w-full mx-4 shadow-md rounded-3xl"
              />
            </div>
            <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
              <div className="mx-auto flex w-full flex-1 flex-col items-end justify-center gap-12 px-2 md:w-2/4 md:px-3 lg:w-3/5 lg:px-6">
                {currentWizard === "register" ? <RegisterForm /> : null}
                {currentWizard === "requirements" ? <RequirementForm /> : null}
                {currentWizard === "domain" ? <CheckDomain /> : null}
                {(currentWizard === "register" && !showCode) ||
                currentWizard !== "register" ? (
                  <ActionButton />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {currentWizard === "quotes" ? <Quotes /> : null}
        {currentWizard === "summary" ? <Summary /> : null}
      </section>
      <FooterSales />
      {currentWizard === "success" ? <Success /> : null}
    </main>
  );
}
