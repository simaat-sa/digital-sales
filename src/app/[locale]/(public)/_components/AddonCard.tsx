import BaseImage from "@/shared/components/Images/BaseImage";
import InputPlusMinus from "@/shared/components/Inputs/InputPlusMinus";
import PopoverInfo from "@/shared/components/PopoverInfo";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { displayPrice } from "@/shared/lib/format-pricing";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";
import {
  ADDON_STEPS,
  useQuotePricingServiceV2,
} from "../_services/QuotePricingServiceV2";
import { AddonV2 } from "../_services/quotesData";

type AddonCardWrapperProps = {
  addon: AddonV2;
};

function AddonCardWrapper({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "col-span-12 flex flex-wrap gap-3 rounded bg-slate-50 p-3 text-foreground/70 shadow md:col-span-4",
        {
          "border text-foreground/100": active,
        },
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
              width={60}
              height={60}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AddonCardDescription({ addon }: AddonCardWrapperProps) {
  return <p className="text-lg">{addon.description}</p>;
}

function PRICE(addon: AddonV2) {
  const { AddonSelected, AddonSelectedPlusMinus, AddonSelectedDropdown } =
    useQuotePricingServiceV2();

  return useMemo(() => {
    switch (addon.addonType) {
      case "PLUS_MINUS":
        const result1 = AddonSelectedPlusMinus.find(
          (item) => item.id === addon.id,
        );
        return result1 ? result1.total : addon.data[0].price;

      case "DROPDOWN":
        const result2 = AddonSelectedDropdown.find(
          (item) => item.id === addon.id,
        );

        return result2 ? result2.price_selected : addon.data[0].price;

      default:
        const result3 = AddonSelected.find((item) => item.id === addon.id);
        return result3 ? result3.price : addon.price;
    }
  }, [
    AddonSelected,
    AddonSelectedDropdown,
    AddonSelectedPlusMinus,
    addon.addonType,
    addon.data,
    addon.id,
    addon.price,
  ]);
}

function AddonCardCheckbox({ addon }: AddonCardWrapperProps) {
  const t = useTranslations("sales");
  const {
    AddonSelected,
    AddonSelectedPlusMinus,
    AddonSelectedDropdown,
    addAddon,
    removeAddon,
    onSelectAddonPlusMinus,
    onSelectAddonDropDown,
  } = useQuotePricingServiceV2();
  const price = PRICE(addon);
  const locale = useLocale();

  const checked = useMemo(() => {
    switch (addon.addonType) {
      case "PLUS_MINUS":
        return AddonSelectedPlusMinus.find((item) => item.id === addon.id)
          ? true
          : false;

      case "DROPDOWN":
        return AddonSelectedDropdown.find((item) => item.id === addon.id)
          ? true
          : false;

      default:
        return AddonSelected.find((item) => item.id === addon.id)
          ? true
          : false;
    }
  }, [
    AddonSelected,
    AddonSelectedDropdown,
    AddonSelectedPlusMinus,
    addon.addonType,
    addon.id,
  ]);

  const handleChange = (addon: AddonV2, checked: boolean) => {
    switch (addon.addonType) {
      case "PLUS_MINUS":
        onSelectAddonPlusMinus(addon);
        break;
      case "DROPDOWN":
        onSelectAddonDropDown(addon);
        break;

      default:
        checked ? addAddon(addon) : removeAddon(addon.id);
        break;
    }
  };

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <span className="text-2xl font-medium">
        {displayPrice(price, true, locale)}
      </span>
      <Checkbox
        className="h-6 w-6 rounded-sm"
        onCheckedChange={(checked) => {
          handleChange(addon, checked as boolean);
        }}
        checked={checked}
      />
    </div>
  );
}

function PlusMinus({ addon }: AddonCardWrapperProps) {
  const v2t = useTranslations("v2.sales");
  const t = useTranslations("sales");
  const {
    AddonSelectedPlusMinus,
    setDecrement,
    setIncrement,
    onChangePlusMinus,
  } = useQuotePricingServiceV2();

  const inputValue = useMemo(() => {
    return (
      AddonSelectedPlusMinus.find((item) => item.id === addon.id)?.count || 1
    );
  }, [addon.id, AddonSelectedPlusMinus]);

  const disabledMinus = useMemo(() => {
    return !AddonSelectedPlusMinus.find((item) => item.id === addon.id) ||
      inputValue <= addon.data[0].from
      ? true
      : false;
  }, [AddonSelectedPlusMinus, addon.data, addon.id, inputValue]);

  const disabledPlus = useMemo(() => {
    return !AddonSelectedPlusMinus.find((item) => item.id === addon.id) ||
      inputValue >= addon.data[addon.data.length - 1].to
      ? true
      : false;
  }, [addon.data, addon.id, AddonSelectedPlusMinus, inputValue]);

  return (
    <div className="flex w-full flex-col gap-3">
      <InputPlusMinus
        setDecrement={() => setDecrement(addon.id, addon?.steps || ADDON_STEPS)}
        setIncrement={() => {
          setIncrement(addon.id, addon?.steps || ADDON_STEPS);
        }}
        value={inputValue}
        onChange={(e) => onChangePlusMinus(+e.target.value, addon)}
        type="number"
        disabled={
          !AddonSelectedPlusMinus.find((item) => item.id === addon.id)
            ? true
            : false
        }
        disabledMinus={disabledMinus}
        disabledPlus={disabledPlus}
      />
      <div className="flex w-full gap-2 align-baseline">
        <span className="mt-1 text-base">
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
                  <TableCell>{displayPrice(item.price, true)}</TableCell>
                  <TableCell>
                    {displayPrice(item.price * item.to, true)}
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

function AddonDropdown({ addon }: { addon: AddonV2 }) {
  const tv2 = useTranslations("v2.sales");
  const { AddonSelectedDropdown, onChangeAddonDropdown } =
    useQuotePricingServiceV2();

  const inputValue = useMemo(() => {
    return (
      AddonSelectedDropdown.find((item) => item.id === addon.id)
        ?.price_selected || 0
    );
  }, [AddonSelectedDropdown, addon.id]);

  return (
    <div className="w-full">
      <Select
        value={String(inputValue)}
        onValueChange={(value) => {
          onChangeAddonDropdown(addon.id, +value);
        }}
        disabled={!inputValue ? true : false}
      >
        <SelectTrigger>
          <SelectValue placeholder="select" />
        </SelectTrigger>
        <SelectContent>
          {addon.data.map((item, index) => (
            <SelectItem key={index} value={String(item.price)}>
              {tv2("from_to", {
                from: item.from,
                to: item.to,
                total: item.price,
              })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function AddonDefault({ addon }: { addon: AddonV2 }) {
  const t = useTranslations("sales");
  const { addAddon, removeAddon, AddonSelected } = useQuotePricingServiceV2();

  return (
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
          AddonSelected.find((item) => item.id === addon.id) ? true : false
        }
      />
    </div>
  );
}

export const AddonCard = {
  Card: AddonCardWrapper,
  Header: AddonCardHeader,
  Description: AddonCardDescription,
  Checkbox: AddonCardCheckbox,
  Default: AddonDefault,
  PlusMinus: PlusMinus,
  Dropdown: AddonDropdown,
};
