import { displayPrice } from "@/shared/lib/format-pricing";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";
import { useLocale } from "next-intl";

export default function AddonsList() {
  const { AddonSelected, AddonSelectedPlusMinus, AddonSelectedDropdown } =
    useQuotePricingServiceV2();
  const locale = useLocale();

  return (
    <ul className="w-full text-lg">
      {AddonSelected.map((item, index) => (
        <li
          key={index}
          className="mb-2 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{displayPrice(item.price, true, locale)}</span>
        </li>
      ))}
      {AddonSelectedPlusMinus.map((item, index) => (
        <li
          key={index}
          className="mb-2 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{displayPrice(item.total, true, locale)}</span>
        </li>
      ))}

      {AddonSelectedDropdown.map((item, index) => (
        <li
          key={index}
          className="mb-2 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{displayPrice(item.price_selected, true, locale)}</span>
        </li>
      ))}
    </ul>
  );
}
