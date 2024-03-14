import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

export default function AddonsList() {
  const { AddonSelected, AddonSelectedPlusMinus, AddonSelectedDropdown } =
    useQuotePricingServiceV2();

  return (
    <ul className="w-full">
      {AddonSelected.map((item, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{item.price}</span>
        </li>
      ))}
      {AddonSelectedPlusMinus.map((item, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{item.total}</span>
        </li>
      ))}

      {AddonSelectedDropdown.map((item, index) => (
        <li
          key={index}
          className="mb-1 flex w-full items-center justify-between"
        >
          <span>{item.name}</span>
          <span>{item.price_selected}</span>
        </li>
      ))}
    </ul>
  );
}
