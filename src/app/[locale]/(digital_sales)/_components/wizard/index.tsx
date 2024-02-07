"use client";
import React, { useEffect } from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import ActionButton from "./ActionButton";
import RegisterForm from "./RegisterForm";
import RequirementForm from "./RequirementForm";
import CheckDomain from "./CheckDomain";
import Quotes from "./Quotes";
import Image from "next/image";
import FooterSales from "../FooterSales";
import { quotesData } from "../../_services/quotesData";
const planningPrice = "/assets/flat-quotes.png";

export default function Wizard() {
  const { currentWizard, setAllAddons } = useRequestQuoteService();

  useEffect(() => {
    setAllAddons(quotesData);
  }, [setAllAddons]);

  return (
    <>
      {currentWizard !== "quotes" ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 lg:grid-cols-2 grid-cols-1 z-0 hidden lg:grid">
          <div className="col-span-1 bg-gray-100"></div>
          <div className="col-span-1"></div>
        </div>
      ) : null}
      <div className="w-full lg:container mx-auto z-10 relative">
        {currentWizard !== "quotes" ? (
          <div className="w-full min-h-screen grid grid-cols-2">
            <div className="h-full items-center justify-center hidden lg:flex">
              <Image
                src={planningPrice}
                alt="planning price"
                width={500}
                height={800}
                className="bg-slate-100"
              />
            </div>
            <div className="flex flex-col col-span-2 lg:col-span-1 px-4 md:px-2 lg:px-0">
              <div className="w-full md:w-2/4 lg:w-3/5 px-2 md:px-3 lg:px-6 flex flex-col gap-12 mx-auto flex-1 items-end justify-center">
                {currentWizard === "register" ? <RegisterForm /> : null}
                {currentWizard === "requirements" ? <RequirementForm /> : null}
                {currentWizard === "domain" ? <CheckDomain /> : null}
                <ActionButton />
              </div>
              <FooterSales />
            </div>
          </div>
        ) : null}
        {currentWizard === "quotes" ? <Quotes /> : null}
      </div>
    </>
  );
}
