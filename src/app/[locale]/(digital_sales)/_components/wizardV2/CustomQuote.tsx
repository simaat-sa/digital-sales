import BaseImage from "@/shared/components/Images/BaseImage";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCalcAmountsV2,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import { addonsData, quotesData } from "../../_services/quotesData";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

export default function CustomQuote() {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const {
    customQuotesSelected,
    onSelectCustomAddon,
    onTakeAction,
    quoteSelected,
    addAddon,
    removeAddon,
  } = useQuotePricingServiceV2();

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
            { "md:col-span-12": !customQuotesSelected.length },
          )}
        >
          {addonsData.map((addon, index) => (
            <div
              key={index}
              className={cn(
                "col-span-12 flex cursor-pointer flex-wrap rounded bg-slate-50 p-3 shadow md:col-span-4",
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCustomAddon(addon);
              }}
            >
              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-nowrap items-center justify-between gap-3">
                  <span className="text-xl font-medium">{addon.name}</span>
                  {addon.logo ? (
                    <div className="w-12">
                      <BaseImage
                        src={addon.logo}
                        alt={addon.name}
                        width={48}
                        height={48}
                      />
                    </div>
                  ) : null}
                </div>
                <p className="text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Distinctio, consectetur?
                </p>
              </div>
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-2xl font-medium">
                  {addon.price} {t("s_r")}
                </span>
                <Checkbox
                  className="h-6 w-6 rounded-sm"
                  onCheckedChange={(checked) => {
                    !checked ? addAddon(addon) : removeAddon(addon.id);
                  }}
                  checked={
                    customQuotesSelected.find((item) => item.id === addon.id)
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {customQuotesSelected.length ? (
          <div className="sticky top-4 col-span-12 rounded-md border font-medium shadow md:col-span-3 ">
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
              {quotesData
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
              <h2 className="px-3 py-1">
                {t("addons")} ({customQuotesSelected.length})
              </h2>
              <ScrollArea className="flex max-h-80 w-full flex-col gap-4 p-3">
                {customQuotesSelected.map((addon, index) => (
                  <div
                    key={index}
                    className="mb-3 flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-1">
                      <span>{t("s_r")}</span>
                      <span>{addon.price}</span>
                    </div>
                    <span>{addon.name}</span>
                  </div>
                ))}
              </ScrollArea>
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
        ) : null}
      </div>
    </>
  );
}
