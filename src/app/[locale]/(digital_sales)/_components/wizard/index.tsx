"use client";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";
import ActionButton from "./ActionButton";
import RegisterForm from "./RegisterForm";
import RequirementForm from "./RequirementForm";
import CheckDomain from "./CheckDomain";
import Quotes from "./Quotes";
import Image from "next/image";

const planningPrice = "/assets/svg/planning_price.jpg";

export default function Wizard() {
  const { currentWizard } = useRequestQuoteService();
  return (
    <>
      {currentWizard !== "quotes" ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 grid lg:grid-cols-2 grid-cols-1 z-0 m-0">
          <div className="col-span-1 bg-slate-400"></div>
          <div className="col-span-1"></div>
        </div>
      ) : null}
      <div className="lg:container mx-auto z-10 relative">
        {currentWizard !== "quotes" ? (
          <div className="w-full min-h-screen grid grid-cols-2">
            <div className="border-l h-full flex items-center justify-center">
              <Image
                src={planningPrice}
                alt="planning price"
                width={500}
                height={800}
                className="bg-slate-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/2 px-2 md:px-3 lg:px-6 flex flex-col gap-12">
                {currentWizard === "register" ? <RegisterForm /> : null}
                {currentWizard === "requirements" ? <RequirementForm /> : null}
                {currentWizard === "domain" ? <CheckDomain /> : null}
                <ActionButton />
              </div>
            </div>
          </div>
        ) : null}
        {currentWizard === "quotes" ? <Quotes /> : null}
      </div>
    </>
  );
}
