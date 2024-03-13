import BaseImage from "@/shared/components/Images/BaseImage";
import InputPlusMinus from "@/shared/components/Inputs/InputPlusMinus";
import PopoverInfo from "@/shared/components/PopoverInfo";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";
import {
  useCalcTotalAddon,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import { AddonV2, addonsData } from "../../_services/quotesData";

type AddonCardWrapperProps = {
  addon: AddonV2;
};

function AddonCardWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "col-span-12 flex flex-wrap gap-3 rounded bg-slate-50 p-3 shadow md:col-span-4",
      )}
    >
      {children}
    </div>
  );
}

function AddonCardHeader({ addon }: AddonCardWrapperProps) {
  return (
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
    </div>
  );
}

function AddonCardContent({ addon }: AddonCardWrapperProps) {
  const v2t = useTranslations("v2.sales");

  return <p className="text-sm">{addon.description}</p>;
}

function AddonCardFooter({ addon }: AddonCardWrapperProps) {
  const t = useTranslations("sales");
  const { addAddon, removeAddon, customQuotesSelected } =
    useQuotePricingServiceV2();
  const TOTAL = useCalcTotalAddon(addon);

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <span className="text-2xl font-medium">
        {customQuotesSelected.find((item) => item.id === addon.id)
          ? TOTAL
          : addonsData.find((item) => item.id === addon.id)?.data[0]
              ?.price}{" "}
        {t("s_r")}
      </span>
      <Checkbox
        className="h-6 w-6 rounded-sm"
        onCheckedChange={(checked) => {
          checked ? addAddon(addon) : removeAddon(addon.id);
        }}
        checked={
          customQuotesSelected.find((item) => item.id === addon.id)
            ? true
            : false
        }
      />
    </div>
  );
}

function PlusMinus({ addon }: AddonCardWrapperProps) {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const {
    customQuotesSelected,
    setDecrement,
    setIncrement,
    onChangeAddonCounts,
  } = useQuotePricingServiceV2();

  const inputValue = useMemo(() => {
    return (
      customQuotesSelected.find((item) => item.id === addon.id)?.count || 1
    );
  }, [addon.id, customQuotesSelected]);

  const disabledMinus = useMemo(() => {
    return !customQuotesSelected.find((item) => item.id === addon.id) ||
      customQuotesSelected.find((item) => item.id === addon.id)?.count === 1
      ? true
      : false;
  }, [addon.id, customQuotesSelected]);

  const disabledPlus = useMemo(() => {
    return !customQuotesSelected.find((item) => item.id === addon.id) ||
      inputValue >= addon.data[addon.data.length - 1].to
      ? true
      : false;
  }, [addon.data, addon.id, customQuotesSelected, inputValue]);

  return (
    <div className="flex w-full flex-col gap-3">
      <InputPlusMinus
        setDecrement={() => setDecrement(addon.id)}
        setIncrement={() => {
          setIncrement(addon.id);
        }}
        value={inputValue}
        onChange={(e) => onChangeAddonCounts(addon.id, +e.target.value)}
        type="number"
        disabled={
          !customQuotesSelected.find((item) => item.id === addon.id)
            ? true
            : false
        }
        disabledMinus={disabledMinus}
        disabledPlus={disabledPlus}
      />
      <div className="flex w-full gap-2 align-baseline">
        <span className="mt-1 text-sm">
          {v2t("how_the_add-one_is_calculated?")}
        </span>
        <PopoverInfo>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{v2t("from")}</TableHead>
                <TableHead>{v2t("to")}</TableHead>
                <TableHead>{v2t("price")}</TableHead>
                <TableHead>{t("total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addon.data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.to}</TableCell>
                  <TableCell>{Number(item.price).toFixed(2)}</TableCell>
                  <TableCell>
                    {Number(item.price * item.to).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PopoverInfo>
      </div>
    </div>
  );
}


function AddonDropdown(){


  return 
}

export const AddonCard = {
  Card: AddonCardWrapper,
  Header: AddonCardHeader,
  Content: AddonCardContent,
  Footer: AddonCardFooter,
  PlusMinus: PlusMinus,
};
