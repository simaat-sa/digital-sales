"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Quotes from "../_components/wizard/Quotes";
import { useRequestQuoteService } from "../_services/requestQuote";
import RegisterForm from "../_components/wizard/RegisterForm";
import RequirementForm from "../_components/wizard/RequirementForm";
import ActionButton from "../_components/wizard/ActionButton";

export default function Page() {
  const c = useTranslations("common");
  const { currentWizard } = useRequestQuoteService();
  console.log("🚀 ~ Page ~ currentWizard:", currentWizard);

  return (
    <div className="w-full flex flex-col items-center">
      {currentWizard === "register" || currentWizard === "requirements" ? (
        <div className="w-full h-screen shadow rounded-md  mx-auto grid grid-cols-2">
          <div className="border bg-slate-100">left</div>
          <div className="border flex items-center justify-center">
            <div className="w-1/2 px-2 md:px-3 lg:px-6 flex flex-col gap-12">
              {currentWizard === "register" ? <RegisterForm /> : null}
              {currentWizard === "requirements" ? <RequirementForm /> : null}
              <ActionButton />
            </div>
          </div>
        </div>
      ) : null}
      {currentWizard === "quotes" ? <Quotes /> : null}
    </div>
  );
}
