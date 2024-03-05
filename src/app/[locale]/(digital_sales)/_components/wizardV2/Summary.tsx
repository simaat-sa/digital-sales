import InputBase from "@/shared/components/Inputs/InputBase";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCalcAmountsV2,
  useGetQuoteSelectedV2,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import { paymentWay } from "../../_services/paymentWay";
import { quotesData } from "../../_services/quotesData";
import FooterSales from "../FooterSales";
import ActionButtonV2 from "./ActionButtonV2";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";
const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function Summary() {
  const {
    quoteSelected,
    paymentMonths,
    promoCode,
    promoCodeValid,
    promoCodeValue,
    onCheckPromoCode,
    onChange,
    onSelectPaymentWay,
    customQuotesSelected,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");
  const locale = useLocale();
  const { totalInvoice, totalTax } = useCalcAmountsV2();
  const getQuoteSelected = useGetQuoteSelectedV2(quoteSelected!)!;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0 hidden grid-cols-1 lg:grid lg:grid-cols-2">
        <div className="col-span-1 bg-gray-100"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="relative z-10 mx-auto w-full lg:container">
        <div className="grid min-h-screen w-full grid-cols-2 gap-y-6 lg:gap-2">
          <div className="col-span-2 flex flex-col justify-center gap-4 px-4 md:px-2 lg:col-span-1 lg:h-full lg:px-0">
            <h2 className="mt-3 text-lg font-medium">
              {t("quote")} {t(getQuoteSelected.name as any)}
            </h2>
            <ul>
              {getQuoteSelected.features.map((feat, i) => (
                <li
                  key={feat}
                  className={cn("mb-4", {
                    "mb-0": getQuoteSelected.features.length - 1 === i,
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
            <h2 className="mt-3 text-lg font-medium">{t("addons")}</h2>
            <ul>
              {getQuoteSelected.addons.map((addon, i) => (
                <li
                  key={addon.id}
                  className={cn("mb-4", {
                    "mb-0": getQuoteSelected.features.length - 1 === i,
                  })}
                >
                  <div className="flex flex-nowrap items-center gap-x-3">
                    <Image
                      src={checkedIcon}
                      alt={"checked"}
                      width={24}
                      height={24}
                    />
                    <Label className="text-base font-medium">
                      {addon.name}
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <div className="flex flex-1 flex-col justify-center gap-4">
                <h2 className="text-xl font-medium">{t("guarantee_title")}</h2>
                <p className="text-lg font-medium text-neutral-600">
                  {t("guarantee_subtitle")}
                </p>
              </div>
              <Image
                src="https://simaat.app/wp-content/uploads/elementor/thumbs/Money_back_guarantee-pze0w29nbaesrsrmlyr5tg8eetudlbtnrueu8eeq4w.png"
                alt={t("guarantee_title")}
                width={170}
                height={170}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
            <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-4 px-2 md:px-3 lg:px-6">
              <label className="text-lg font-medium">
                {t("summary_order")}
              </label>
              <h4 className="text-lg font-medium">{t("payment")}</h4>
              <div className="grid w-full grid-cols-4 gap-6">
                {paymentWay.map((payment) => {
                  const quote = quotesData.find(
                    (quote) => quote.id === getQuoteSelected.id,
                  )!;
                  return (
                    <div
                      key={payment.type}
                      className={cn(
                        "col-span-2 flex cursor-pointer flex-col items-center justify-center gap-6 rounded-xl border border-slate-50 bg-white p-3 shadow transition-colors duration-75 ease-in lg:col-span-1",
                        {
                          "border-primary-600":
                            payment.months === paymentMonths,
                        },
                      )}
                      onClick={() => {
                        onSelectPaymentWay(payment.months);
                      }}
                    >
                      <span className="text-sm font-medium">
                        {payment.label[locale as "ar" | "en"]}
                      </span>
                      <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                        <span className="text-3xl">
                          {+quote.price * +payment.months || 0}
                        </span>
                        {t("s_r")}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full items-end gap-3 md:w-4/5 lg:w-full">
                <InputBase
                  label={t("promo_code")}
                  placeholder={t("promo_code")}
                  value={promoCode}
                  onChange={(e) => {
                    onChange("promoCode", e.target.value);
                  }}
                  disabled={promoCodeValid}
                />
                {!promoCodeValid ? (
                  <Button variant="outline" onClick={() => onCheckPromoCode()}>
                    {t("apply")}
                  </Button>
                ) : (
                  <Image
                    src={checkedDecagramIcon}
                    width={24}
                    height={24}
                    alt="verified"
                    className="mb-3"
                    loading="lazy"
                  />
                )}
              </div>

              <label className="text-lg font-medium">
                {t("quote")} {t(getQuoteSelected.name as any)}
              </label>

              <ul className="flex w-full list-none flex-col gap-4 font-medium">
                <li className="flex justify-between">
                  <span>
                    {
                      paymentWay.find(
                        (payment) => payment.months === paymentMonths,
                      )?.label[locale as "ar" | "en"]
                    }
                  </span>
                  <span className="flex gap-2">
                    <span>{getQuoteSelected.price * paymentMonths}</span>
                    {t("s_r")}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span>
                    {t("tax", {
                      amount: 15,
                    })}
                  </span>
                  <span className="flex gap-2">
                    {totalTax} {t("s_r")}
                  </span>
                </li>

                {promoCodeValid ? (
                  <li className="flex justify-between">
                    <span>{t("promo_value")}</span>
                    <span className="flex gap-2 text-red-600">
                      {promoCodeValue} - {t("s_r")}
                    </span>
                  </li>
                ) : null}
              </ul>

              {customQuotesSelected.length ? (
                <>
                  <label className="text-lg font-medium">{t("addons")}</label>
                  <ul>
                    {customQuotesSelected.map((quote) => (
                      <li
                        className="flex justify-between font-medium"
                        key={quote.id}
                      >
                        <span>{quote.name}</span>
                        <span className="flex gap-2">
                          {quote.price} {t("s_r")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <Separator />
              <div className="mb-8 flex flex-nowrap justify-between">
                <span>{t("total")}</span>

                <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                  <span className="text-4xl font-medium">{totalInvoice}</span>
                  {t("s_r")}
                </div>
              </div>

              <ActionButtonV2 />
            </div>
            <FooterSales />
          </div>
        </div>
      </div>
    </>
  );
}
