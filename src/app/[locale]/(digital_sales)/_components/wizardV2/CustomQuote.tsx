import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import {
  useCalcTotalAddon,
  useInvoiceCustomAddons,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import {
  AddonV2,
  addonsData,
  quotesData,
  quotesDataV2,
} from "../../_services/quotesData";
import { AddonCard } from "./AddonCard";
import AddonsList from "./AddonsList";
import FeatList from "./FeatList";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

function AddonRow({ addon }: { addon: AddonV2 }) {
  const PRICE = useCalcTotalAddon(addon);
  const t = useTranslations("sales");
  const { AddonSelected, AddonSelectedDropdown, AddonSelectedPlusMinus } =
    useQuotePricingServiceV2();

  switch (addon.addonType) {
    case "PLUS_MINUS":
      return (
        <div className="flex w-full items-center justify-between">
          <span>
            {addon.name} (
            {AddonSelected.find((item) => item.id === addon.id)?.count})
          </span>
          <div className="flex items-center gap-1">
            <span>{PRICE}</span>
            <span>{t("s_r")}</span>
          </div>
        </div>
      );

    case "DEFAULT":
      return (
        <div className="flex w-full items-center justify-between">
          <span>{addon.name}</span>
          <div className="flex items-center gap-1">
            <span>{addon.price}</span>
            <span>{t("s_r")}</span>
          </div>
        </div>
      );

    default:
      break;
  }
}

export default function CustomQuote() {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const {
    AddonSelected,
    onTakeAction,
    quoteSelected,
    AddonSelectedDropdown,
    AddonSelectedPlusMinus,
  } = useQuotePricingServiceV2();

  const TOTAL = useInvoiceCustomAddons();

  return (
    <>
      <div className="flex h-[8rem] w-full items-center justify-between px-4 lg:px-0">
        <h2 className="text-3xl font-medium">{v2t("custom_your_quote")}</h2>
        <Button variant="outline" onClick={() => onTakeAction(true)}>
          {t("back")}
        </Button>
      </div>
      <div
        className={cn("grid w-full grid-cols-12 items-start gap-8 mb-8", {
          "col-start-3": true,
        })}
      >
        <div
          className={cn(
            "relative col-span-12 mx-auto grid grid-cols-12 gap-6 transition-all delay-200 duration-500 ease-out md:col-span-8",
          )}
        >
          {addonsData.map((addon) => (
            <AddonCard.Card key={addon.id} active={false}>
              <AddonCard.Header addon={addon} />
              <AddonCard.Description addon={addon} />
              <AddonCard.Checkbox addon={addon} />

              {addon.addonType === "DROPDOWN" ? (
                <AddonCard.Dropdown addon={addon} />
              ) : null}

              {addon.addonType === "PLUS_MINUS" ? (
                <AddonCard.PlusMinus addon={addon} />
              ) : null}
            </AddonCard.Card>
          ))}
        </div>
        <div className="sticky top-4 col-span-12 rounded-md border font-medium shadow md:col-span-4">
          <div className="flex flex-col p-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xl font-medium">
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

            <FeatList
              quote={quotesDataV2.find((item) => item.id === quoteSelected)}
              isSpeared={false}
            />
          </div>

          <HeightMotion>
            <div className="p-3">
              {AddonSelected.length ||
              AddonSelectedDropdown.length ||
              AddonSelectedPlusMinus.length ? (
                <h2>
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
              className="flex h-16 w-full items-center gap-1 rounded-b rounded-t-none text-base"
              size="lg"
              onClick={() => onTakeAction()}
            >
              <span>{t("confirm_and_pay")}</span>
              <span className="text-3xl">{TOTAL}</span>
              <span>{t("s_r")}</span>
            </Button>
          </HeightMotion>
        </div>
      </div>
    </>
  );
}
