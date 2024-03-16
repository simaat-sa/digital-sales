"use client";
// import FooterSales from "@/app/[locale]/(digital_sales)/_components/FooterSales";
import Image from "next/image";
import {
  Wizards,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import ActionButtonV2 from "./ActionButtonV2";
import CustomQuote from "./CustomQuote";
import CheckDomain from "./Domain";
import Quotes from "./Quotes";
import RegisterForm from "./RegisterForm";
import RequirementForm from "./Requirement";
import Success from "./Success";
import Summary from "./Summary";

const planningPrice = "/assets/images/simaat-summary.png";

export default function Wizard() {
  const { showCode } = useQuotePricingServiceV2();
  const { currentWizard, actionButton } = useQuotePricingServiceV2();

  return (
    <>
      {(
        ["register", "requirements", "summary", "domain"] as Wizards[]
      ).includes(currentWizard) ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 hidden grid-cols-1 lg:grid lg:grid-cols-2">
          <div className="col-span-1 bg-gray-100"></div>
          <div className="col-span-1"></div>
        </div>
      ) : null}

      <div className="container relative z-10">
        {(["register", "requirements", "domain"] as Wizards[]).includes(
          currentWizard,
        ) ? (
          <div className="grid h-screen min-h-screen w-full grid-cols-2">
            <div className="hidden h-full items-center justify-center lg:flex">
              <Image
                src={planningPrice}
                alt="planning price"
                width={500}
                height={800}
                className="bg-slate-100"
              />
            </div>
            <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
              <div className="mx-auto flex w-full flex-1 flex-col items-end justify-center gap-12 px-2 md:w-2/4 md:px-3 lg:w-3/5 lg:px-6">
                {currentWizard === "register" ? <RegisterForm /> : null}
                {currentWizard === "requirements" ? <RequirementForm /> : null}
                {currentWizard === "domain" ? <CheckDomain /> : null}

                {currentWizard === "register" && !showCode ? (
                  <ActionButtonV2 />
                ) : null}

                {currentWizard === "requirements" &&
                actionButton !== "check_code" ? (
                  <ActionButtonV2 />
                ) : null}

                {currentWizard === "domain" ||
                currentWizard === "summary" ||
                currentWizard === "custom_quote" ? (
                  <ActionButtonV2 />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {currentWizard === "custom_quote" ? <CustomQuote /> : null}
        {currentWizard === "quotes" ? <Quotes /> : null}
        {currentWizard === "summary" ? <Summary /> : null}
      </div>
      {currentWizard === "success" ? <Success /> : null}
    </>
  );
}
