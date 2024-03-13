import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCalcAmountsV2,
  useCalcTotalAddon,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import {
  AddonV2,
  addonsData,
  quotesData,
  quotesDataV2,
} from "../../_services/quotesData";
import { AddonCard } from "./AddonCard";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

function AddonRow({ addon }: { addon: AddonV2 }) {
  const PRICE = useCalcTotalAddon(addon);
  const t = useTranslations("sales");
  const {customQuotesSelected} = useQuotePricingServiceV2();

  return (
    <div className="mb-3 flex w-full items-center justify-between">
      <span>{addon.name} ({customQuotesSelected.find(item=>item.id === addon.id)?.count})</span>
      <div className="flex items-center gap-1">
        <span>{PRICE}</span>
        <span>{t("s_r")}</span>
      </div>
    </div>
  );
}

export default function CustomQuote() {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const { customQuotesSelected, onTakeAction, quoteSelected } =
    useQuotePricingServiceV2();

  const { invoiceTotalWithoutTax } = useCalcAmountsV2();

  return (
    <>
      <div className="flex h-[8rem] w-full items-center justify-between px-4 lg:px-0">
        <h2 className="text-3xl font-medium">{v2t("custom_your_quote")}</h2>
        <Button variant="outline" onClick={() => onTakeAction(true)}>
          {t("back")}
        </Button>
      </div>
      <div
        className={cn("grid w-full grid-cols-12 items-start gap-8", {
          "col-start-3": true,
        })}
      >
        <div
          className={cn(
            "relative col-span-12 mx-auto grid grid-cols-12 gap-6 transition-all delay-200 duration-500 ease-out md:col-span-9",
          )}
        >
          {addonsData.map((addon) => (
            <AddonCard.Card key={addon.id}>
              <AddonCard.Header addon={addon} />
              <AddonCard.Content addon={addon} />
              <AddonCard.Footer addon={addon} />
              {addon.addonType === "PLUS_MINUS" ? (
                <AddonCard.PlusMinus addon={addon} />
              ) : null}
            </AddonCard.Card>
          ))}
        </div>
        <div className="sticky top-4 col-span-12 rounded-md border font-medium shadow md:col-span-3">
          <div className="flex justify-between p-3">
            <span>
              {t("quote")}{" "}
              {t(
                quotesData.find((item) => item.id === quoteSelected)
                  ?.name as any,
              )}
            </span>
            <span className="flex gap-2">
              <span>
                {quotesData.find((item) => item.id === quoteSelected)?.price}
              </span>
              {t("s_r")}
            </span>
          </div>
          <ul className="flex flex-col gap-4 p-3 pt-0 text-sm">
            {quotesDataV2
              .find((item) => item.id === quoteSelected)
              ?.features.map((feat, index) => (
                <li key={index} className="flex items-center gap-1">
                  <Image
                    src={checkedIcon}
                    alt={"checked"}
                    width={18}
                    height={18}
                  />
                  <span>{feat}</span>
                </li>
              ))}
          </ul>
          <HeightMotion>
            {customQuotesSelected.length ? (
              <h2 className="px-3 py-1">
                {t("addons")} ({customQuotesSelected.length})
              </h2>
            ) : null}
            <div className="flex w-full flex-col gap-4 p-3">
              {customQuotesSelected.map((addon, index) => (
                <AddonRow addon={addon} key={index} />
              ))}
            </div>
            <Button
              className="flex h-16 w-full items-center gap-1 rounded-b rounded-t-none text-base"
              size="lg"
              onClick={() => onTakeAction()}
            >
              <span>{t("confirm_and_pay")}</span>
              <span className="text-3xl">{invoiceTotalWithoutTax}</span>
              <span>{t("s_r")}</span>
            </Button>
          </HeightMotion>
        </div>
      </div>
    </>
  );
}
