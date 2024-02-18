import InputDomain from "@/shared/components/Inputs/InputDomain";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQuotePricingService } from "../../_services/QuotePricingService";

const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function CheckDomain() {
  const { domain, verifiedDomain, disable, onChange, onVerifyDomain } =
    useQuotePricingService();
  const t = useTranslations("sales");

  return (
    <HeightMotion>
      <div className="flex flex-nowrap gap-4 items-end">
        <div className="flex-1 flex flex-col gap-4">
          <InputDomain
            value={domain}
            onChange={(e) => onChange("domain", e.target.value)}
            domain=".simaat.sa"
            disabled={disable.domain}
          />
        </div>
        {!verifiedDomain ? (
          <Button
            variant="outline"
            onClick={() => onVerifyDomain()}
            disabled={disable.domain}
          >
            {t("check")}
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
    </HeightMotion>
  );
}
