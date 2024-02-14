import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import FooterSales from "../FooterSales";
import ActionButton from "./ActionButton";
import { Separator } from "@/shared/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { paymentWay } from "../../_services/paymentWay";
import { cn } from "@/shared/lib/utils";
import { quotesData } from "../../_services/quotesData";
import Image from "next/image";
import { Label } from "@/shared/components/ui/label";
import InputBase from "@/shared/components/Inputs/InputBase";
import { Button } from "@/shared/components/ui/button";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

export default function Summary() {
  const { quoteSelected, paymentMonths, promoCode, onChange } =
    useRequestQuoteService();
  const t = useTranslations("sales");
  const locale = useLocale();

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 lg:grid-cols-2 grid-cols-1 z-0 hidden lg:grid">
        <div className="col-span-1 bg-gray-100"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="w-full lg:container mx-auto z-10 relative">
        <div className="w-full min-h-screen grid grid-cols-2 gap-y-6 lg:gap-2">
          <div className="lg:h-full flex flex-col justify-center col-span-2 lg:col-span-1 px-4 md:px-2 lg:px-0 gap-4">
            <h2 className="text-lg font-semibold">{t("summary_order")}</h2>

            <ul>
              {quotesData[0].features.map((feat, i) => (
                <li
                  key={feat}
                  className={cn("mb-4", {
                    "mb-0": quotesData[0].features.length - 1 === i,
                  })}
                >
                  <div className="flex flex-nowrap items-center gap-x-3">
                    <Image
                      src={checkedIcon}
                      alt={"checked"}
                      width={24}
                      height={24}
                    />
                    <Label className="text-base font-medium">{feat}</Label>
                  </div>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold">{t("payment")}</h4>
            <div className="w-full md:w-3/5 lg:w-full sm:w-4/5 grid grid-cols-4 gap-6 lg:pl-6">
              {paymentWay.map((payment, index) => {
                const price = quotesData.find((quote) => quote.id === 1);
                return (
                  <div
                    key={payment.type}
                    className={cn(
                      "border border-slate-50 rounded-xl shadow bg-white p-3 cursor-pointer col-span-2 lg:col-span-1 flex flex-col gap-6 justify-center items-center",
                      {
                        "border-primary-600": payment.months === paymentMonths,
                      }
                    )}
                  >
                    <span className="font-semibold text-sm">
                      {payment.label[locale as "ar" | "en"]}
                    </span>
                    <div className="flex flex-nowrap items-center align-baseline justify-center gap-2">
                      <span className="text-3xl">
                        {price?.price * payment.months}
                      </span>
                      {t("s_r")}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full md:w-4/5 lg:w-full flex items-end gap-4">
              <InputBase
                label={t("promo_code")}
                placeholder={t("promo_code")}
                value={promoCode}
                onChange={(e) => {
                  onChange("promoCode", e.target.value);
                }}
              />
              <Button variant="outline">Enter</Button>
            </div>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 px-4 md:px-2 lg:px-0">
            <div className="w-full md:w-2/4 lg:w-3/5 px-2 md:px-3 lg:px-6 flex flex-col gap-3 mx-auto flex-1 justify-center">
              <h2 className="text-lg font-semibold">{t("summary_order")}</h2>

              <h4>
                {t(
                  quotesData.find((quote) => quote.id === quoteSelected)
                    ?.name as any
                )}
              </h4>

              <ul className="list-none w-full flex flex-col gap-4 font-medium">
                <li className="flex justify-between">
                  <span>
                    {
                      paymentWay.find(
                        (payment) => payment.months === paymentMonths
                      )?.label[locale as "ar" | "en"]
                    }
                  </span>
                  <span className="flex gap-2">
                    <span>
                      {quotesData.filter((quote) => {
                        if (quote.id === 1) {
                          return quote;
                        } else {
                          return "";
                        }
                      })[0].price * paymentMonths}
                    </span>
                    {t("s_r")}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span>tax.</span>
                  <span className="flex gap-2">12 {t("s_r")}</span>
                </li>
              </ul>
              <div className="flex gap-3 items-center align-baseline mt-4">
                <h4 className="text-lg font-serif">{t("addons")}</h4>
                <p className="text-xs text-gray-500">({t("addons_hint")})</p>
              </div>
              <ul className="list-none w-full flex flex-col gap-4 font-medium">
                <li className="flex justify-between">
                  <span>Addon 1</span>
                  <span className="flex gap-2">12 {t("s_r")}</span>
                </li>

                <li className="flex justify-between">
                  <span>Addon 2</span>
                  <span className="flex gap-2">12 {t("s_r")}</span>
                </li>
              </ul>
              <Separator />
              <div className="flex flex-nowrap justify-between mb-8">
                <span>{t("total")}</span>
                <span>1000 {t("s_r")}</span>
              </div>

              <ActionButton />
            </div>
            <FooterSales />
          </div>
        </div>
      </div>
    </>
  );
}
