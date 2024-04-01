"use client";

import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { displayPrice } from "@/shared/lib/format-pricing";
import { useRouter } from "@/shared/lib/navigation";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import {
  useInvoiceCustomAddons,
  useQuotePricingServiceV2,
} from "../_services/QuotePricingServiceV2";
import { addonsData, quotesDataV2 } from "../_services/quotesData";
import { AddonCard } from "./AddonCard";
import AddonsList from "./AddonsList";
import FeatList from "./FeatList";

export default function CustomPlanForm({
  state,
}: {
  state: QuoteRequestModel;
}) {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const {
    quoteSelected,
    AddonSelected,
    AddonSelectedDropdown,
    AddonSelectedPlusMinus,
    setState,
    handleSubmitCustomPlan,
  } = useQuotePricingServiceV2();
  const router = useRouter();

  const TOTAL = useInvoiceCustomAddons();

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [setState, state]);

  return (
    <div className="container">
      <div className="flex h-[6rem] w-full items-center justify-between lg:h-[8rem]">
        <h2 className="text-2xl font-medium lg:text-3xl">
          {v2t("custom_your_quote_title")}
        </h2>
        <div className="flex md:flex-row flex-col-reverse flex-wrap items-center justify-end gap-3 md:flex-nowrap">
          <span className="mx-3 block md:inline-flex">
            {v2t("steps_number", { pageNumber: 3 })}
          </span>
          <Button variant="outline" type="button" onClick={() => router.back()}>
            {t("back")}
          </Button>
        </div>
      </div>
      <div
        className={cn("grid w-full grid-cols-12 items-start gap-6", {
          "col-start-3": true,
        })}
      >
        <div
          className={cn(
            "relative col-span-12 mx-auto bg-white pb-6 md:col-span-8",
          )}
        >
          {addonsData.map((group, i) => (
            <div
              key={group.group_name}
              className={cn("mb-12 w-full", {
                "mb-4": addonsData.length - 1 === i,
              })}
            >
              <h2 className="mb-4 text-2xl font-medium">{group.group_name}</h2>
              <div className="col-span-12 grid w-full grid-cols-12 gap-6 md:col-span-8">
                {group.list.map((addon) => (
                  <AddonCard.Card
                    key={addon.id}
                    addon={addon}
                    active={
                      AddonSelected.find((item) => item.id === addon.id) ||
                      AddonSelectedDropdown.find(
                        (item) => item.id === addon.id,
                      ) ||
                      AddonSelectedPlusMinus.find(
                        (item) => item.id === addon.id,
                      )
                        ? true
                        : false
                    }
                  >
                    <div className="flex flex-col gap-3">
                      <AddonCard.Header addon={addon} />
                      <AddonCard.Description addon={addon} />

                      {addon.addonType === "DROPDOWN" ? (
                        <AddonCard.Dropdown addon={addon} />
                      ) : null}

                      {addon.addonType === "PLUS_MINUS" ? (
                        <AddonCard.PlusMinus addon={addon} />
                      ) : null}
                    </div>

                    <AddonCard.Footer addon={addon} />
                  </AddonCard.Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky top-4 col-span-12 overflow-hidden rounded-md bg-secondaryblue-100 px-6 pb-6 font-medium  md:col-span-4">
          <div className="flex flex-col p-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="pt-3 text-xl font-medium">
                {t("quote")}{" "}
                {t(
                  quotesDataV2.find((item) => item.id === quoteSelected)
                    ?.name as any,
                )}
              </span>
              <span className="flex gap-2 pt-3 text-xl font-medium">
                <span>
                  {displayPrice(
                    quotesDataV2.find((item) => item.id === quoteSelected)
                      ?.price!,
                    true,
                  )}
                </span>
                {t("s_r")}
              </span>
            </div>

            <div>
              <h2 className="my-3 text-lg font-medium">
                {v2t("basic_addons")}
              </h2>
              <FeatList
                quote={quotesDataV2.find((item) => item.id === quoteSelected)}
                isSpeared={false}
                isGradient
              />
            </div>
          </div>

          <HeightMotion>
            <div className="mb-3 px-3">
              {AddonSelected.length ||
              AddonSelectedDropdown.length ||
              AddonSelectedPlusMinus.length ? (
                <h2 className="mb-4 text-xl">
                  {t("addons")} (
                  {AddonSelected.length +
                    AddonSelectedDropdown.length +
                    AddonSelectedPlusMinus.length}
                  )
                </h2>
              ) : null}
              <AddonsList />
            </div>
            <Button
              className="flex h-16 w-full items-center gap-1 rounded-b rounded-t-none text-lg"
              size="lg"
              type="button"
              onClick={() =>
                handleSubmitCustomPlan().then(() =>
                  router.push("/get-started/domain", { scroll: true }),
                )
              }
            >
              <span className="text-xl">{t("confirm_and_pay")}</span>
              <span className="pr-3 text-3xl">
                {displayPrice(TOTAL || 0, true)}
              </span>
              <span>{t("s_r")}</span>
            </Button>
          </HeightMotion>
        </div>
      </div>
    </div>
  );
}
