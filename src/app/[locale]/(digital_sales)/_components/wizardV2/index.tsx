"use client";
import { cn } from "@/shared/lib/utils";
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
const digital = "/public/assets/brand/digital-sales-bg.png";

export default function Wizard() {
  const { showCode } = useQuotePricingServiceV2();
  const { currentWizard, actionButton } = useQuotePricingServiceV2();

  return (
    <>
      <main
        className={cn("relative pb-6", {
          "bg-slate-50 after:bottom-0 after:left-0 after:top-0 after:z-10 after:w-1/2 after:bg-contain after:bg-center after:bg-no-repeat lg:after:absolute lg:after:content-[''] rtl:after:right-0":
            (
              ["register", "requirements", "domain", "summary"] as Wizards[]
            ).find((item) => item === currentWizard)
              ? true
              : false,
          "after:bg-[url('/assets/brand/digital-sales-bg.png')]": (
            ["register", "requirements", "domain"] as Wizards[]
          ).find((item) => item === currentWizard)
            ? true
            : false,
          "after:left-unset z-10 after:bottom-0 after:right-0 after:top-0  after:z-10 after:w-1/2 after:bg-white lg:after:absolute lg:after:content-[''] rtl:after:left-0 rtl:after:right-[unset]":
            currentWizard === "summary",
        })}
      >
        <section className="container relative z-20">
          {(["register", "requirements", "domain"] as Wizards[]).includes(
            currentWizard,
          ) ? (
            <div className="min-h-layout grid w-full grid-cols-2">
              <div className="hidden h-full items-center justify-center lg:flex">
                {/* <Image
                  src={planningPrice}
                  alt="planning price"
                  width={500}
                  height={800}
                  className="bg-slate-100"
                /> */}
              </div>
              <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
                <div className="mx-auto flex w-full flex-1 flex-col items-end justify-center gap-12 px-2 md:w-2/4 md:px-3 lg:w-3/5 lg:px-6">
                  {currentWizard === "register" ? <RegisterForm /> : null}
                  {currentWizard === "requirements" ? (
                    <RequirementForm />
                  ) : null}
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
        </section>
      </main>
      {currentWizard === "success" ? <Success /> : null}
    </>
  );
}
